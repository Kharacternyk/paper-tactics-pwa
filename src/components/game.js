import { GameMap } from "./game-map"
import Card from "react-bootstrap/Card"
import ProgressBar from "react-bootstrap/ProgressBar"
import styled from "styled-components"

const StyledCard = styled(Card)`
    align-self: center;
`

const getBarProps = game => {
    if (game.me.reachable.length == 0) {
        return {
            label: "You lost!",
            variant: "danger",
            now: 100,
            striped: true,
            animated: true,
        }
    }
    if (game.opponent.reachable.length == 0) {
        return {
            label: "You won!",
            variant: "success",
            now: 100,
            striped: true,
            animated: true,
        }
    }
    if (game.myTurn) {
        return {
            label: "Your turn",
            variant: "primary",
            now: game.turnsLeft * 100 / 3,
        }
    }
    return {
        label: "Opponent's turn",
        variant: "danger",
        now: game.turnsLeft * 100 / 3,
    }
}


export const Game = ({game, onTurnMade}) => {
    return (
        <StyledCard>
            <Card.Header>
                <ProgressBar {...getBarProps(game)} />
            </Card.Header>
            <Card.Body><GameMap game={game} onTurnMade={onTurnMade} /></Card.Body>
            <Card.Footer>Game ID: {game.id}</Card.Footer>
        </StyledCard>
    )
}
