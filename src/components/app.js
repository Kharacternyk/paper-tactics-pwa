import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import { Game } from "./game"

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"

export const App = () => {
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(apiUrl)
    const [ game, setGame ] = useState()

    useEffect(() => setGame(lastJsonMessage), [lastJsonMessage])

    const onTurnMade = (x, y) => {
        sendJsonMessage({action: "make-turn", gameId: game.id, cell: [x, y]})
    }

    return (
        <Stack style={{padding: "1em"}} gap={3}>
            <Button
                variant="success"
                onClick={() => sendJsonMessage({action: "create-game"})}
            >
                Create Game
            </Button>
            {game && <Game game={game} onTurnMade={onTurnMade} />}
        </Stack>
    )
}
