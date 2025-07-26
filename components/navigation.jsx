import LearnIcon from "@mui/icons-material/School"
import PlayIcon from "@mui/icons-material/SportsEsports"
import SettingsIcon from "@mui/icons-material/Brush"
import ErrorIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined"
import AppBar from "@mui/material/AppBar"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import SvgIcon from "@mui/material/SvgIcon"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import {lazy, Suspense} from "react"
import {useStorage} from "../hooks/use-storage"
import Logo from "../images/logo.svg?react"
import {ErrorBoundary} from "react-error-boundary"
import {Footer} from "./footer"
import {BadgeAlert} from "./badge-alert"

const GameLobby = lazy(() => import("./game-lobby"))
const Tutorial = lazy(() => import("./tutorial"))
const Settings = lazy(() => import("./settings"))

export const Navigation = () => {
    const highlightFX = useStorage("highlight-fx", true)
    const animateFX = useStorage("animate-fx", true)
    const showTooltips = useStorage("show-tooltips", true)
    const isQuickPlay = useStorage("is-quick-play", false)
    const [currentPage, setCurrentPage] = useStorage("tab", 0, localStorage)
    const [isEasterEggFound, setIsEasterEggFound] = useStorage(
        ":-)",
        false,
        localStorage
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
                        flexShrink="1"
                        flexGrow="1"
                        textOverflow="ellipsis"
                        overflow="hidden"
                    >
                        Paper <br />
                        Tactics
                    </Typography>
                    <Tabs
                        value={currentPage}
                        onChange={(_, value) => setCurrentPage(value)}
                        sx={{
                            flexGrow: 0,
                            flexShrink: 0,
                        }}
                    >
                        <Tab label="Learn" icon={<LearnIcon />} />
                        <Tab label="Play" icon={<PlayIcon />} />
                        <Tab label="Style" icon={<SettingsIcon />} />
                    </Tabs>
                </Stack>
            </AppBar>
            <Stack gap={2} alignItems="center" px={2} py={2}>
                <Suspense fallback={<CircularProgress />}>
                    <ErrorBoundary
                        fallback={
                            <BadgeAlert
                                subtitle="Try reloading the page or contact the developer"
                                color="secondary"
                                progress={100}
                                icon={<ErrorIcon />}
                            >
                                Something went wrong
                            </BadgeAlert>
                        }
                    >
                        {currentPage === 0 && (
                            <Tutorial
                                findEasterEgg={() => setIsEasterEggFound(true)}
                                isEasterEggFound={isEasterEggFound}
                            />
                        )}
                        {currentPage === 1 && (
                            <GameLobby
                                isEasterEggFound={isEasterEggFound}
                                highlightFX={highlightFX[0]}
                                animateFX={animateFX[0]}
                                showTooltips={showTooltips[0]}
                                isQuickPlay={isQuickPlay}
                            />
                        )}
                        {currentPage === 2 && (
                            <Settings
                                highlightFX={highlightFX}
                                animateFX={animateFX}
                                showTooltips={showTooltips}
                            />
                        )}
                    </ErrorBoundary>
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
