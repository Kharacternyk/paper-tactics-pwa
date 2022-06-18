import {Tutorial} from "./tutorial"
import {GameLobby} from "./game-lobby"
import {Header} from "./header"
import {Footer} from "./footer"
import {ThemeProvider, createTheme} from "@mui/material/styles"
import primary from "@mui/material/colors/teal"
import secondary from "@mui/material/colors/red"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import CssBaseline from "@mui/material/CssBaseline"
import useCookie from "react-use-cookie"

export const App = () => {
    const [currentPage, setCurrentPage] = useCookie("tab", 0)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header
                value={Number(currentPage)}
                onChange={(event, page) => setCurrentPage(page)}
            />
            <Stack gap={2} alignItems="center" px={2} py={2}>
                {Number(currentPage) === 0 && <Tutorial />}
                {Number(currentPage) === 1 && <GameLobby />}
                <Footer />
            </Stack>
        </ThemeProvider>
    )
}

const theme = createTheme({
    palette: {
        primary: {
            light: primary[300],
            main: primary[600],
            dark: primary[900],
        },
        secondary: {
            light: secondary[300],
            main: secondary[600],
            dark: secondary[900],
        },
    },
})
