import { useEffect, useState } from "react"
import { GameMap } from "./game-map"
import { TurnIndicator } from "./turn-indicator"
import { Section } from "./section"
import { BadgeAlert } from "./badge-alert"
import WaitIcon from "@mui/icons-material/ConnectWithoutContact"
import useWebSocket from "react-use-websocket"

export const Game = ({apiUrl, icon}) => {
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(apiUrl)
    const [ game, setGame ] = useState()

    useEffect(() => {
        sendJsonMessage({action: "create-game"})
    }, [])

    useEffect(() => {
        setGame(lastJsonMessage)
    }, [lastJsonMessage])

    const onTurnMade = (x, y) => {
        sendJsonMessage({action: "make-turn", gameId: game.id, cell: [x, y]})
    }

    return game ? (
        <>
            <TurnIndicator game={game} />
            <GameMap game={game} onTurnMade={onTurnMade} icon={icon} />
        </>
    ) : (
        <BadgeAlert icon={<WaitIcon color="primary" />} color="primary">
            Waiting for someone else to connect…
        </BadgeAlert>
    )
}
