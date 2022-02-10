import { Game } from "./game"
import { Settings, icons } from "./settings"
import { MainNavigation } from "./main-navigation"
import { useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Alert from "@mui/material/Alert"
import AppBar from "@mui/material/AppBar"
import Stack from "@mui/material/Stack"
import CssBaseline from "@mui/material/CssBaseline"
import useCookie from "react-use-cookie"

const theme = createTheme({ })

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"

export const App = () => {
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ iconIndex, setIconIndex ] = useCookie("icon", 0)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="sticky" color="inherit" sx={{alignItems: "center"}}>
                <MainNavigation
                    value={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                />
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
