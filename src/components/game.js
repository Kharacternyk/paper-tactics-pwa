import {useEffect, useState} from "react"
import {icons} from "./settings"
import {GameMap} from "./game-map"
import {TurnIndicator} from "./turn-indicator"
import {GameFooter} from "./game-footer"
import {BadgeAlert} from "./badge-alert"
import WaitIcon from "@mui/icons-material/ConnectWithoutContact"
import useWebSocket from "react-use-websocket"
import Bowser from "bowser"

export const Game = ({apiUrl, iconIndex}) => {
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
        opponent: icons[game.opponent.viewData.iconIndex] || icons[0]
    }

    return game ? (
        <>
            <TurnIndicator game={game} />
            <GameMap game={game} onTurnMade={onTurnMade} icons={gameIcons} />
            <GameFooter game={game} />
        </>
    ) : (
        <BadgeAlert icon={<WaitIcon color="primary" />} color="primary">
            Waiting for someone else to connect…
        </BadgeAlert>
    )
}
