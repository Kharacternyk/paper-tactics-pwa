import {GameUnitIcon} from "./game-unit-icon"
import TrenchIcon from "@mui/icons-material/AllOut"
import TableCell from "@mui/material/TableCell"
import match from "babel-plugin-proposal-pattern-matching/match"

export const GameMapCell = ({
    mine,
    opponent,
    unit,
    wall,
    reachable,
    trench,
    onClick,
    icons,
}) => {
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
        ...match({mine, opponent, unit, wall, reachable, trench})(
            ({mine = true, unit = true}) => ({color: "primary.main"}),
            ({mine = true, wall = true}) => ({
                color: "primary.dark",
                bgcolor: "primary.main",
            }),
            ({opponent = true, unit = true, reachable = true}) => ({
                color: "secondary.main",
                ":hover": {bgcolor: "primary.light"},
            }),
            ({opponent = true, unit = true}) => ({
                color: "secondary.main",
                bgcolor: "grey.200",
            }),
            ({opponent = true, wall = true}) => ({
                color: "secondary.dark",
                bgcolor: "secondary.main",
            }),
            ({trench = true, reachable = true}) => ({
                color: "grey.400",
                ":hover": {
                    color: "primary.main",
                    bgcolor: "primary.light",
                },
            }),
            ({trench = true}) => ({
                color: "grey.500",
                bgcolor: "grey.200",
            }),
            ({reachable = true}) => ({
                color: "rgba(0, 0, 0, 0)",
                ":hover": {color: "primary.light"},
            }),
            _ => ({bgcolor: "grey.200", color: "rgba(0, 0, 0, 0)"})
        ),
    }

    const icon = match({opponent, mine, wall, unit, trench})(
        ({mine = true, wall = true}) => icons.opponent,
        ({opponent = true, unit = true}) => icons.opponent,
        _ => icons.me
    )

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
