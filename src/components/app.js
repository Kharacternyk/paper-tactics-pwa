import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import Alert from "react-bootstrap/Alert"
import { GameMap } from "./game-map"
import {
    BsFillLightningFill, BsFillExclamationOctagonFill, BsForwardFill
} from "react-icons/bs"

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
            <Button onClick={() => sendJsonMessage({action: "create-game"})}>
                <BsFillLightningFill />Create Game
            </Button>
            {game && <>
                <Alert variant={game.myTurn ? "primary" : "danger"}>
                    {game.myTurn ? <BsForwardFill /> : <BsFillExclamationOctagonFill />}
                    {game.myTurn ? " Your turn " : " Opponent's turn "}
                    ({game.turnsLeft})
                </Alert>
                <GameMap game={game} onTurnMade={onTurnMade} />
            </>}
        </Stack>
    )
}
