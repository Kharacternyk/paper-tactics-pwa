import { useState } from "react"
import Alert from "@mui/material/Alert"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import CssBaseline from "@mui/material/CssBaseline"
import School from "@mui/icons-material/School"
import SportsEsports from "@mui/icons-material/SportsEsports"
import { Game } from "./game"

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"

export const App = () => {
    const [ currentPage, setCurrentPage ] = useState("learn")

    return (
        <>
            <CssBaseline />
            <Stack spacing={2}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography component="h1" sx={{flexGrow: 1}}>
                            Paper Tactics
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => setCurrentPage("learn")}
                            startIcon={<School />}
                        >
                             Learn
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => setCurrentPage("play")}
                            startIcon={<SportsEsports />}
                        >
                            Play
                        </Button>
                    </Toolbar>
                </AppBar>
                {currentPage === "learn" && <Alert severity="warning"> Coming soon… </Alert>}
                {currentPage === "play" && <Game apiUrl={apiUrl} />}
            </Stack>
        </>
    )
}
