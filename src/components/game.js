import { useEffect, useState } from "react"
import { GameMap } from "./game-map"
import Card from "react-bootstrap/Card"
import ProgressBar from "react-bootstrap/ProgressBar"
import Spinner from "react-bootstrap/Spinner"
import Badge from "react-bootstrap/Badge"
import styled from "styled-components"
import useWebSocket from "react-use-websocket"

const CenteredCard = styled(Card)`
    align-self: center;
`

const getBarProps = game => {
    if (game.me.reachable.length == 0) {
        return {
            label: "You lost!",
            variant: "danger",
            now: 100,
            animated: true,
        }
    }
    if (game.opponent.reachable.length == 0) {
        return {
            label: "You won!",
            variant: "success",
            now: 100,
            animated: true,
        }
    }
    if (game.myTurn) {
        return {
            label: "Your turn",
            variant: "primary",
            min: 0,
            max: 3,
            now: game.turnsLeft,
        }
    }
    return {
        label: "Opponent's turn",
        variant: "danger",
        min: 0,
        max: 3,
        now: game.turnsLeft,
    }
}


export const Game = ({apiUrl}) => {
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
        <CenteredCard>
            <Card.Header>
                <ProgressBar {...getBarProps(game)} />
            </Card.Header>
            <Card.Body>
                <GameMap game={game} onTurnMade={onTurnMade} />
            </Card.Body>
            <Card.Footer>
                <Badge bg="secondary">
                    Game ID: {game.id}
                </Badge>
            </Card.Footer>
        </CenteredCard>
    ) : (
        <CenteredCard>
            <Card.Header>
                <ProgressBar variant="success" animated now={100} />
            </Card.Header>
            <Card.Body>
                Waiting for someone else to connect…
            </Card.Body>
        </CenteredCard>
    )
}
