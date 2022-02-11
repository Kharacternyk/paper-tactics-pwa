import { BadgeAlert } from "./badge-alert";
import Badge from "@mui/material/Badge"
import MyTurnIcon from "@mui/icons-material/Edit"
import OpponentsTurnIcon from "@mui/icons-material/EditOff"
import WonIcon from "@mui/icons-material/Mood"
import LostIcon from "@mui/icons-material/MoodBad"
import match from 'babel-plugin-proposal-pattern-matching/match'

export const TurnIndicator = ({
    game: {me: {hasLost: iLost}, opponent: {hasLost: iWon}, myTurn, turnsLeft}
}) => {
    const [color, message] = match({iLost, iWon, myTurn})(
        ({iLost = true}) => ["secondary", "Opponent won!"],
        ({iWon = true}) => ["primary", "You won!"],
        ({myTurn = true}) => ["primary", "Your turn"],
        _ => ["secondary", "Opponent's turn"]
    )

    const iconProps = {color, sx: {transform: "scale(-1, 1)"}}

    const icon = match({iLost, iWon, myTurn})(
        ({iLost = true}) => <LostIcon {...iconProps} />,
        ({iWon = true}) => <WonIcon {...iconProps} />,
        ({myTurn = true}) => <MyTurnIcon {...iconProps} />,
        _ => <OpponentsTurnIcon {...iconProps} />,
    )

    const [decoratedIcon, progress] = match({iLost, iWon})(
        ({iLost = false, iWon = false}) => [
            <Badge badgeContent={turnsLeft} color={color}>
                {icon}
            </Badge>,
            turnsLeft * 100 / 3
        ],
        _ => [icon, 100]
    )

    return (
        <BadgeAlert icon={decoratedIcon} color={color} progress={progress}>
            {message}
        </BadgeAlert>
    )
}
