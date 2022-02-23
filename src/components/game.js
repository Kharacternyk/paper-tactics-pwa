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

export const Game = ({apiUrl, iconIndex, icons, onQuit}) => {
    const [game, setGame] = useState()

    // It is important to have this cleanup fired before the web socket is closed
    useEffect(() => {
        const concede = () => sendJsonMessage({
            action: "concede",
            gameId: game.id
        })

        if (game) {
            window.addEventListener("beforeunload", concede)
            return () => {
                window.removeEventListener("beforeunload", concede)
                concede()
            }
        }
    }, [game?.id])

    const {sendJsonMessage, lastJsonMessage} = useWebSocket(apiUrl)

    useEffect(() => setGame(lastJsonMessage), [lastJsonMessage])
    useEffect(() => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const os = Bowser.getParser(window.navigator.userAgent).getOSName()

        sendJsonMessage({
            action: "create-game",
            viewData: {iconIndex: String(iconIndex), timeZone, os}
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
            <GameHeader game={game} onQuit={onQuit}/>
            <Section>
                <GameMap game={game} onTurnMade={onTurnMade} icons={gameIcons} />
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
