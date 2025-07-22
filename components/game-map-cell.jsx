import TableCell from "@mui/material/TableCell"
import {GameUnitIcon} from "./game-unit-icon"

export const GameMapCell = ({
    mine,
    opponent,
    unit,
    wall,
    reachable,
    opponentReachable,
    doInvertReachable,
    trench,
    onClick,
    icons,
    turnCount,
    animateFX,
}) => {
    let colorStyle = {}

    if (mine && unit && (opponentReachable || !doInvertReachable)) {
        colorStyle = {
            color: "primary.main",
        }
    } else if (mine && unit) {
        colorStyle = {
            color: "primary.main",
            bgcolor: "grey.200",
        }
    } else if (opponent && unit && reachable && !doInvertReachable) {
        colorStyle = {
            color: "secondary.main",
            ":hover": {bgcolor: "primary.light"},
        }
    } else if (opponent & unit && !doInvertReachable) {
        colorStyle = {
            color: "secondary.main",
            bgcolor: "grey.200",
        }
    } else if (opponent & unit) {
        colorStyle = {
            color: "secondary.main",
        }
    } else if (reachable && !doInvertReachable) {
        colorStyle = {
            color: "rgba(0, 0, 0, 0)",
            ":hover": {color: "primary.light"},
        }
    } else if (opponentReachable && doInvertReachable) {
        colorStyle = {
            color: "rgba(0, 0, 0, 0)",
        }
    } else {
        colorStyle = {
            bgcolor: "grey.200",
            color: "rgba(0, 0, 0, 0)",
        }
    }

    const sx = {
        position: "relative",
        p: 0,
        "td + &": {
            borderLeft: 1,
            borderLeftColor: "grey.300",
        },
        "tr:last-child &": {
            borderBottom: 0,
        },
        ...colorStyle,
    }

    let icon = icons.me

    if ((mine && wall) || (opponent && unit)) {
        icon = icons.opponent
    }

    if (Array.isArray(icon)) {
        if (animateFX) {
            if (wall) {
                icon = icon[icon.length - 1]
            } else {
                icon = icon[turnCount % (icon.length - 1)]
            }
        } else {
            icon = icon[0]
        }
    }

    const overlayIcon =
        trench && !wall ? (
            <GameUnitIcon sx={{position: "absolute", left: 0, top: 0}}>
                {icons.opponent}
            </GameUnitIcon>
        ) : null

    return (
        <TableCell onClick={onClick} sx={sx}>
            <GameUnitIcon>{icon}</GameUnitIcon>
            {overlayIcon}
        </TableCell>
    )
}

const getStyle = ({
    mine,
    opponent,
    unit,
    wall,
    reachable,
    opponentReachable,
    doInvertReachable,
    trench,
}) => {
    if (wall) {
        const color = mine ? "primary" : "secondary"
        return {
            color: `${color}.dark`,
            bgcolor: `${color}.main`,
        }
    }

    const light = doInvertReachable ? opponentReachable : reachable

    if (trench) {
        if (!light) {
            return {
                color: "grey.500",
                bgcolor: "grey.200",
            }
        }

        const style = {
            color: "grey.400",
        }

        if (reachable) {
            style[":hover"] = {
                color: "primary.main",
                bgcolor: "primary.light",
            }
        }

        return style
    }
}
