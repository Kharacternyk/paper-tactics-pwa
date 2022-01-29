import TableCell from "@mui/material/TableCell"
import Box from "@mui/material/Box"
import Close from "@mui/icons-material/Close"

export const GameMapCell = (props) => {
    return (
        <TableCell
            onClick={props.onClick}
            sx={getStyle(props)}
        >
            <Box
                p={1}
                display="flex"
                height="100%"
                justifyContent="center"
                alignItems="center"
            >
                <Close />
            </Box>
        </TableCell>
    )
}

const getStyle = (props) => {
    return {
        p: 0,
        borderRight: 1,
        borderBottom: 1,
        borderColor: "text.disabled",
        ":hover": getHoverColors(props),
        ...getColors(props),
    }
}

const getColors = ({mine, opponent, unit, wall}) => {
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
                color: "error.main"
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
        color: "rgba(0, 0, 0, 0)"
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
