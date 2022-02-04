import { Game } from "./game"
import { Settings, icons } from "./settings"
import { useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
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
import SettingsIcon from "@mui/icons-material/Settings"
import useCookie from "react-use-cookie"

const theme = createTheme({
    spacing: x => `${0.5 * x}rem`
})

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"

export const App = () => {
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ iconIndex, setIconIndex ] = useCookie("icon", 0)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
                    <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </AppBar>
            <Stack gap={2} alignItems="center" px={2} pt={2}>
                {currentPage === 0 && <Alert severity="warning"> Coming soon… </Alert>}
                {currentPage === 1 && <Game apiUrl={apiUrl} icon={icons[iconIndex]} />}
                {currentPage === 2 && <Alert severity="warning"> Coming soon… </Alert>}
                {currentPage === 3 && (
                    <Settings onIconChanged={setIconIndex} iconIndex={Number(iconIndex)}/>
                )}
            </Stack>
        </ThemeProvider>
    )
}
