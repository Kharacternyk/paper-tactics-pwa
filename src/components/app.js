import { useState } from "react"
import Alert from "@mui/material/Alert"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import CssBaseline from "@mui/material/CssBaseline"
import LearnIcon from "@mui/icons-material/School"
import PlayIcon from "@mui/icons-material/SportsEsports"
import PracticeIcon from "@mui/icons-material/TrackChanges"
import { Game } from "./game"

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"

export const App = () => {
    const [ currentPage, setCurrentPage ] = useState(0)

    return (
        <>
            <CssBaseline />
            <Stack spacing={2}>
                <AppBar position="sticky" color="transparent">
                    <Box p={1} display="flex" justifyContent="center">
                        <Typography
                            component="h1"
                            color="primary"
                            fontSize="1.5rem"
                            fontStyle="italic"
                            fontWeight="bold"
                            letterSpacing="0.2em"
                            textTransform="uppercase"
                        >
                            Paper Tactics
                        </Typography>
                    </Box>
                    <BottomNavigation
                        showLabels
                        value={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                    >
                        <BottomNavigationAction label="Learn" icon={<LearnIcon />} />
                        <BottomNavigationAction label="Play" icon={<PlayIcon />} />
                        <BottomNavigationAction label="Practice" icon={<PracticeIcon />} />
                    </BottomNavigation>
                </AppBar>
                {currentPage === 0 && <Alert severity="warning"> Coming soon… </Alert>}
                {currentPage === 1 && <Game apiUrl={apiUrl} />}
                {currentPage === 2 && <Alert severity="warning"> Coming soon… </Alert>}
            </Stack>
        </>
    )
}
