import { useEffect, useState } from "react"
import { GameMap } from "./game-map"
import { TurnIndicator } from "./turn-indicator"
import { Section } from "./section"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Chip from "@mui/material/Chip"
import LinearProgress from "@mui/material/LinearProgress"
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
            <Section>
                <TurnIndicator game={game} />
            </Section>
            <Section>
                <GameMap game={game} onTurnMade={onTurnMade} icon={icon} />
            </Section>
        </>
    ) : (
        <Section>
            <Alert severity="info">
                Waiting for someone else to connect…
                <LinearProgress variant="query"/>
            </Alert>
        </Section>
    )
}
