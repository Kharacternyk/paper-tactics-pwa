import {GameLobby} from "./game-lobby"
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

export const App = () => {
    const [currentPage, setCurrentPage] = useState(0)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="sticky" color="inherit" sx={{justifyContent: "center"}}>
                <MainNavigation
                    value={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                />
            </AppBar>
            <Stack gap={2} alignItems="center" px={2} pt={2}>
                {currentPage === 0 && <Alert severity="warning"> Coming soon… </Alert>}
                {currentPage === 1 && <GameLobby />}
                <Footer />
            </Stack>
        </ThemeProvider>
    )
}
