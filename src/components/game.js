import { useEffect, useState } from "react"
import { GameMap } from "./game-map"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Chip from "@mui/material/Chip"
import LinearProgress from "@mui/material/LinearProgress"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import useWebSocket from "react-use-websocket"

export const Game = ({apiUrl}) => {
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(apiUrl)
    const [ game, setGame ] = useState()

    useEffect(() => {
        sendJsonMessage({action: "create-game"})
    }, [])

    useEffect(() => {
        setGame(lastJsonMessage)
    }, [lastJsonMessage])

    const onTurnMade = (x, y) => {
        sendJsonMessage({action: "make-turn", gameId: game.id, cell: [x, y]})
    }

    return game ? (
        <Paper elevation={8} sx={{alignSelf: "center"}}>
            <Stack spacing={2} sx={{p: 1}}>
                <Stepper activeStep={3 - game.turnsLeft}>
                    <Step key={1}>
                        <StepLabel />
                    </Step>
                    <Step key={2}>
                        <StepLabel />
                    </Step>
                    <Step key={3}>
                        <StepLabel />
                    </Step>
                </Stepper>
                <GameMap game={game} onTurnMade={onTurnMade} />
                <Chip label={`Game ID: ${game.id}`} color="primary"/>
            </Stack>
        </Paper>
    ) : (
        <Paper elevation={8} sx={{alignSelf: "center"}}>
            <Alert severity="info">
                Waiting for someone else to connect…
                <LinearProgress />
            </Alert>
        </Paper>
    )
}
