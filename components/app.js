import secondary from "@mui/material/colors/red"
import primary from "@mui/material/colors/teal"
import CssBaseline from "@mui/material/CssBaseline"
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {Navigation} from "./navigation"

export const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
    </ThemeProvider>
)

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
