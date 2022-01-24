import { useState } from "react"
import Alert from "react-bootstrap/Alert"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { Game } from "./game"

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"

export const App = () => {
    const [ currentPage, setCurrentPage ] = useState("how-to")

    return (
        <Stack spacing={2}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography component="h1" sx={{flexGrow: 1}}>
                        Paper Tactics
                    </Typography>
                    <Button color="inherit" onClick={() => setCurrentPage("how-to")}>
                        Learn to play
                    </Button>
                    <Button color="inherit" onClick={() => setCurrentPage("new-pvp")}>
                        Play vs other players
                    </Button>
                </Toolbar>
            </AppBar>
            {currentPage === "how-to" && <Alert variant="success"> Coming soon… </Alert>}
            {currentPage === "new-pvp" && <Game apiUrl={apiUrl} />}
        </Stack>
    )
}
