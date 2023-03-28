import LearnIcon from "@mui/icons-material/School"
import PlayIcon from "@mui/icons-material/SportsEsports"
import AppBar from "@mui/material/AppBar"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import SvgIcon from "@mui/material/SvgIcon"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import {lazy, Suspense} from "react"
import {useStorage} from "../hooks/use-storage"
import Logo from "../logo.svg"
import {Footer} from "./footer"

const GameLobby = lazy(() => import("./game-lobby"))
const Tutorial = lazy(() => import("./tutorial"))

export const Navigation = () => {
    const [currentPage, setCurrentPage] = useStorage("tab", 0)
    const [isEasterEggFound, setIsEasterEggFound] = useStorage(
        ":-)",
        false,
        sessionStorage
    )

    return (
        <>
            <AppBar position="sticky" color="inherit" sx={sx}>
                <Stack
                    direction="row"
                    maxWidth="30rem"
                    width="100%"
                    alignItems="center"
                >
                    <SvgIcon
                        component={Logo}
                        inheritViewBox
                        sx={{height: "3rem", width: "3rem"}}
                    />
                    <Typography
                        component="h1"
                        fontFamily="IBM Plex Mono"
                        fontStyle="italic"
                        fontSize="1rem"
                        fontWeight={500}
                        color="primary"
                        pl={1}
                        flex="auto"
                    >
                        Paper <br />
                        Tactics
                    </Typography>
                    <Tabs
                        value={currentPage}
                        onChange={(_, value) => setCurrentPage(value)}
                        flex="initial"
                    >
                        <Tab label="Learn" icon={<LearnIcon />} />
                        <Tab label="Play" icon={<PlayIcon />} />
                    </Tabs>
                </Stack>
            </AppBar>
            <Stack gap={2} alignItems="center" px={2} py={2}>
                <Suspense fallback={<CircularProgress />}>
                    {currentPage === 0 && (
                        <Tutorial
                            findEasterEgg={() => setIsEasterEggFound(true)}
                            isEasterEggFound={isEasterEggFound}
                        />
                    )}
                    {currentPage === 1 && (
                        <GameLobby isEasterEggFound={isEasterEggFound} />
                    )}
                    <Footer />
                </Suspense>
            </Stack>
        </>
    )
}

const sx = {
    display: "flex",
    alignItems: "center",
    px: 2,
}
