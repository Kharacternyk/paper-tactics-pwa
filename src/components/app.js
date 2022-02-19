import {Game} from "./game"
import {Settings} from "./settings"
import {MainNavigation} from "./main-navigation"
import {Footer} from "./footer"
import {useState} from "react"
import {ThemeProvider, createTheme} from "@mui/material/styles"
import primary from "@mui/material/colors/teal"
import secondary from "@mui/material/colors/red"
import Alert from "@mui/material/Alert"
import AppBar from "@mui/material/AppBar"
import Stack from "@mui/material/Stack"
import CssBaseline from "@mui/material/CssBaseline"
import useCookie from "react-use-cookie"

const theme = createTheme({
    palette: {
        primary: {
            light: primary[300],
            main: primary[600],
            dark: primary[900]
        },
        secondary: {
            light: secondary[300],
            main: secondary[600],
            dark: secondary[900]
        }
    }
})

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
                {currentPage === 1 && <Alert severity="warning"> Coming soon… </Alert>}
                {currentPage === 2 && <Game apiUrl={apiUrl} iconIndex={iconIndex} />}
                <Footer />
            </Stack>
        </ThemeProvider>
    )
}
