import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import Badge from "react-bootstrap/Badge"
import { GameMap } from "./game-map"
import { GameMapCell } from "./game-map-cell"

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"

export const App = () => {
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(apiUrl)
    const [ game, setGame ] = useState()

    useEffect(() => setGame(lastJsonMessage), [lastJsonMessage])

    let gameView = <Badge bg="warning" text="dark">No current game</Badge>

    if (game) {
        const cellProps = Array(10).fill().map(() => {
            return Array(10).fill().map(() => ({}))
        })

        const setPropsForEach = (array, props, propsFactory) => {
            array.forEach(([x, y]) => {
                Object.assign(cellProps[y - 1][x - 1], props)
                if (propsFactory) {
                    Object.assign(cellProps[y - 1][x - 1], propsFactory(x, y))
                }
            })
        }

        setPropsForEach(game.opponent.units, { unit: true, opponent: true })
        setPropsForEach(game.opponent.walls, { wall: true, opponent: true })
        setPropsForEach(game.opponent.reachable, { reachableByOpponent: true })
        setPropsForEach(game.me.units, { unit: true, mine: true })
        setPropsForEach(game.me.walls, { wall: true, mine: true })
        setPropsForEach(game.me.reachable, { reachableByMe: true }, (x, y) => ({
            onClick: () => {
                sendJsonMessage({action: "make-turn", gameId: game.gameId, cell: [x, y]})
            }
        }))

        const renderedRows = cellProps.map((row, y) => {
            const renderedRow = row.map((props, x) => {
                return <GameMapCell {...props} key={x} />
            })

            return <tr key={y}>{renderedRow}</tr>
        })

        gameView = <>
            <Badge bg="success">Game ID: {game.gameId}</Badge>
            <GameMap bordered>
                <tbody>{renderedRows}</tbody>
            </GameMap>
        </>
    }

    return (
        <Stack style={{padding: "1em"}} gap={3}>
            <Button onClick={() => sendJsonMessage({action: "create-game"})}>
                Create Game
            </Button>
            {gameView}
        </Stack>
    )
}
