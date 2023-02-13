import secondary from "@mui/material/colors/red"
import primary from "@mui/material/colors/teal"
import CssBaseline from "@mui/material/CssBaseline"
import Stack from "@mui/material/Stack"
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {useStorage} from "../hooks/use-storage"
import {Footer} from "./footer"
import {GameLobby} from "./game-lobby"
import {Header} from "./header"
import {Tutorial} from "./tutorial"

export const App = () => {
    const [currentPage, setCurrentPage] = useStorage("tab", 0)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header
                value={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
            />
            <Stack gap={2} alignItems="center" px={2} py={2}>
                {currentPage === 0 && <Tutorial />}
                {currentPage === 1 && <GameLobby />}
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
