import { GameUnitIcon } from "./game-unit-icon"
import TableCell from "@mui/material/TableCell"

export const GameMapCell = (props) => {
    return (
        <TableCell
            onClick={props.onClick}
            sx={getStyle(props)}
        >
            <GameUnitIcon>
                {props.icon}
            </GameUnitIcon>
        </TableCell>
    )
}

const getStyle = (props) => {
    return {
        p: 0,
        "td + &": {
            borderLeft: 1,
            borderLeftColor: "grey.300"
        },
        "tr:last-child &": {
            borderBottom: 0
        },
        ":hover": getHoverColors(props),
        ...getColors(props),
    }
}

const getColors = ({mine, opponent, unit, wall, reachableByMe}) => {
    const variants = {
        mine: {
            unit: {
                color: "primary.main"
            },
            wall: {
                color: "primary.dark",
                bgcolor: "primary.main",
            }
        },
        opponent: {
            unit: {
                color: "secondary.main",
                bgcolor: reachableByMe && "grey.100"
            },
            wall: {
                color: "secondary.dark",
                bgcolor: "secondary.main",
            }
        }
    }

    if (mine || opponent) {
        return variants[mine ? "mine" : "opponent"][unit ? "unit" : "wall"]
    }

    return {
        color: reachableByMe ? "grey.100" : "rgba(0, 0, 0, 0)"
    }
}

const getHoverColors= ({reachableByMe, unit}) => {
    if (reachableByMe) {
        if (unit) {
            return {
                bgcolor: "primary.light"
            }
        } else {
            return {
                color: "primary.light"
            }
        }
    }
    return {}
}
