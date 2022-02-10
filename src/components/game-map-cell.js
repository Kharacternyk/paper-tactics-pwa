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
                color: "success.main"
            },
            wall: {
                color: "error.light",
                bgcolor: "success.main",
            }
        },
        opponent: {
            unit: {
                color: "error.main",
                bgcolor: reachableByMe && "grey.100"
            },
            wall: {
                color: "success.light",
                bgcolor: "error.main",
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
                bgcolor: "success.light"
            }
        } else {
            return {
                color: "success.light"
            }
        }
    }
    return {}
}
