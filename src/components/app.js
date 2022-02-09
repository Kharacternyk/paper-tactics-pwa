import { Game } from "./game"
import { Settings, icons } from "./settings"
import { useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Alert from "@mui/material/Alert"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import CssBaseline from "@mui/material/CssBaseline"
import LearnIcon from "@mui/icons-material/School"
import PlayIcon from "@mui/icons-material/SportsEsports"
import PracticeIcon from "@mui/icons-material/TrackChanges"
import SettingsIcon from "@mui/icons-material/Settings"
import useCookie from "react-use-cookie"

const theme = createTheme({ })

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"

export const App = () => {
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ iconIndex, setIconIndex ] = useCookie("icon", 0)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="sticky" color="inherit">
                <Box p={1} display="flex" justifyContent="center">
                    <Typography
                        variant="h4"
                        component="h1"
                        color="primary"
                        fontStyle="italic"
                        fontWeight="bold"
                        letterSpacing="0.2em"
                        textTransform="uppercase"
                    >
                        Paper Tactics
                    </Typography>
                </Box>
                <Tabs
                    centered
                    value={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                >
                    <Tab label="Learn" icon={<LearnIcon />} />
                    <Tab label="Play" icon={<PlayIcon />} />
                    <Tab label="Practice" icon={<PracticeIcon />} />
                    <Tab label="Settings" icon={<SettingsIcon />} />
                </Tabs>
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
