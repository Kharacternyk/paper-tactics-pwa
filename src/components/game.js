import PeopleIcon from "@mui/icons-material/ConnectWithoutContact"
import RobotIcon from "@mui/icons-material/SmartToyOutlined"
import Button from "@mui/material/Button"
import match from "babel-plugin-proposal-pattern-matching/match"
import Bowser from "bowser"
import camelcaseKeys from "camelcase-keys"
import {useEffect, useState} from "react"
import useWebSocket from "react-use-websocket"
import {BadgeAlert} from "./badge-alert"
import {GameFooter} from "./game-footer"
import {GameHeader} from "./game-header"
import {GameMap} from "./game-map"
import {Section} from "./section"

export const Game = ({apiUrl, gamePreferences, iconIndex, icons, onQuit}) => {
    const [game, setGame] = useState()

    const concede = () =>
        sendJsonMessage({
            action: "concede",
            gameId: game.id,
        })

    // It is important to have this cleanup fired before the websocket is closed
    useEffect(() => {
        if (game) {
            window.addEventListener("beforeunload", concede)
            return () => {
                window.removeEventListener("beforeunload", concede)
                concede()
            }
        }
    }, [game?.id])

    const {sendJsonMessage, lastJsonMessage} = useWebSocket(apiUrl)

    useEffect(
        () => setGame(camelcaseKeys(lastJsonMessage, {deep: true})),
        [lastJsonMessage]
    )
    useEffect(() => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const os = Bowser.getParser(window.navigator.userAgent).getOSName()

        sendJsonMessage({
            action: "create-game",
            viewData: {iconIndex: String(iconIndex), timeZone, os},
            preferences: gamePreferences,
        })
    }, [])

    const onTurnMade = (x, y) => {
        sendJsonMessage({action: "make-turn", gameId: game.id, cell: [x, y]})
    }

    const gameIcons = game && {
        me: icons[iconIndex],
        opponent: match({
            opponentIndex: Number(game.opponent.viewData.iconIndex ?? 0),
            iconIndex,
        })(
            ({opponentIndex = 0, iconIndex = 0}) => icons[1],
            ({opponentIndex = iconIndex}) => icons[0],
            ({opponentIndex}) => icons[opponentIndex]
        ),
    }

    return game ? (
        <>
            <GameHeader
                game={game}
                gamePreferences={gamePreferences}
                onQuit={onQuit}
                concede={concede}
            />
            <Section>
                <GameMap
                    game={game}
                    onTurnMade={onTurnMade}
                    icons={gameIcons}
                    gamePreferences={gamePreferences}
                />
            </Section>
            <GameFooter game={game} gamePreferences={gamePreferences} />
        </>
    ) : (
        <>
            <Section>
                <Button onClick={onQuit}>Cancel</Button>
            </Section>
            <BadgeAlert
                color="primary"
                icon={
                    gamePreferences.is_against_bot ? (
                        <RobotIcon color="primary" />
                    ) : (
                        <PeopleIcon color="primary" />
                    )
                }
            >
                {gamePreferences.is_against_bot
                    ? "Powering up the bot…"
                    : "Waiting for someone else to connect…"}
            </BadgeAlert>
        </>
    )
}
