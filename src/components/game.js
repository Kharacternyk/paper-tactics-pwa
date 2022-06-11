import {useEffect, useState} from "react"
import {GameMap} from "./game-map"
import {GameHeader} from "./game-header"
import {GameFooter} from "./game-footer"
import {BadgeAlert} from "./badge-alert"
import {Section} from "./section"
import Button from "@mui/material/Button"
import WaitIcon from "@mui/icons-material/ConnectWithoutContact"
import useWebSocket from "react-use-websocket"
import Bowser from "bowser"
import match from "babel-plugin-proposal-pattern-matching/match"
import camelcaseKeys from "camelcase-keys"

export const Game = ({apiUrl, gamePreferences, iconIndex, icons, onQuit}) => {
    const [game, setGame] = useState()

    const concede = () => sendJsonMessage({
        action: "concede",
        gameId: game.id
    })

    // It is important to have this cleanup fired before the web socket is closed
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

    useEffect(() => setGame(camelcaseKeys(lastJsonMessage, {deep: true})), [lastJsonMessage])
    useEffect(() => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const os = Bowser.getParser(window.navigator.userAgent).getOSName()

        sendJsonMessage({
            action: "create-game",
            viewData: {iconIndex: String(iconIndex), timeZone, os},
            preferences: gamePreferences
        })
    }, [])

    const onTurnMade = (x, y) => {
        sendJsonMessage({action: "make-turn", gameId: game.id, cell: [x, y]})
    }

    const gameIcons = game && {
        me: icons[iconIndex],
        opponent: match({opponentIndex: Number(game.opponent.viewData.iconIndex), iconIndex})(
            ({opponentIndex = 0, iconIndex = 0}) => icons[1],
            ({opponentIndex = iconIndex}) => icons[0],
            ({opponentIndex}) => icons[opponentIndex],
        )
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
            <GameFooter game={game} />
        </>
    ) : (
        <>
            <Section>
                <Button onClick={onQuit}>
                    Cancel
                </Button>
            </Section>
            <BadgeAlert icon={<WaitIcon color="primary" />} color="primary">
                Waiting for someone else to connect…
            </BadgeAlert>
        </>
    )
}
