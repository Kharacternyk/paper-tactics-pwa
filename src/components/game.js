import { GameMap } from "./game-map"
import Card from "react-bootstrap/Card"
import ProgressBar from "react-bootstrap/ProgressBar"
import styled from "styled-components"

const StyledCard = styled(Card)`
    align-self: center;
`

export const Game = ({game, onTurnMade}) => {
    return (
        <StyledCard>
            <Card.Header>
                <ProgressBar
                    now={game.turnsLeft * 100 / 3} 
                    label={game.myTurn ? "Your Turn" : "Opponent's Turn"}
                    variant={game.myTurn ? "primary" : "danger"}
                />
            </Card.Header>
            <Card.Body><GameMap game={game} onTurnMade={onTurnMade} /></Card.Body>
            <Card.Footer>Game ID: {game.id}</Card.Footer>
        </StyledCard>
    )
}
