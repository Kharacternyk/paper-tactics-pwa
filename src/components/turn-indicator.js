import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Box from "@mui/material/Box"
import Edit from "@mui/icons-material/Edit"
import EditOff from "@mui/icons-material/EditOff"

export const TurnIndicator = ({game}) => {
    const color = game.myTurn ? "success" : "error"
    const icon = game.myTurn ? <Edit color={color} /> : <EditOff color={color} />
    const message = game.myTurn ? "Your turn!" : "Opponent's turn…"
    const value = game.turnsLeft * 100 / 3

    const progress = (
        <Box sx={{position: "relative", display: "inline-flex"}}>
            <CircularProgress variant="determinate" value={value} color={color} />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                right={0}
            >
                {icon}
            </Box>
        </Box>
    )

    return (
        <Alert severity={color} icon={progress}>
            <AlertTitle sx={{display: "flext", alignItems: "center", height: "100%", m: 0}}>
                {message}
            </AlertTitle>
        </Alert>
    )
}
