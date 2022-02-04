import { BadgeAlert } from "./badge-alert";
import Badge from "@mui/material/Badge"
import MyTurnIcon from "@mui/icons-material/Edit"
import OpponentsTurnIcon from "@mui/icons-material/EditOff"

export const TurnIndicator = ({game}) => {
    const color = game.myTurn ? "success" : "error"
    const iconProps = {color, sx: {transform: "scale(-1, 1)"}}
    const message = game.myTurn ? "Your turn!" : "Opponent's turn…"
    const progress = game.turnsLeft * 100 / 3

    const icon = (
        game.myTurn ? <MyTurnIcon {...iconProps} /> : <OpponentsTurnIcon {...iconProps} />
    )
    const decoratedIcon = (
        <Badge badgeContent={game.turnsLeft} color={color}>
            {icon}
        </Badge>
    )

    return (
        <BadgeAlert icon={decoratedIcon} color={color} progress={progress}>
            {message}
        </BadgeAlert>
    )
}
