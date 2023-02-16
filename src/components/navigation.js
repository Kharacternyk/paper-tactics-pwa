import MyIcon from "@mui/icons-material/Close"
import OpponentIcon from "@mui/icons-material/FiberManualRecordOutlined"
import LearnIcon from "@mui/icons-material/School"
import PlayIcon from "@mui/icons-material/SportsEsports"
import AppBar from "@mui/material/AppBar"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import {useStorage} from "../hooks/use-storage"
import {Footer} from "./footer"
import {GameLobby} from "./game-lobby"
import {GameMap} from "./game-map"
import {Tutorial} from "./tutorial"

export const Navigation = () => {
    const [currentPage, setCurrentPage] = useStorage("tab", 0)

    return (
        <>
            <AppBar position="sticky" color="inherit" sx={sx}>
                <Stack
                    direction="row"
                    maxWidth="30rem"
                    width="100%"
                    alignItems="center"
                >
                    <Paper
                        elevation={2}
                        square
                        sx={{width: "2.5rem", flex: "initial"}}
                    >
                        <GameMap
                            game={logoGame}
                            icons={logoIcons}
                            gamePreferences={{size: 2}}
                        />
                    </Paper>
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
                {currentPage === 0 && <Tutorial />}
                {currentPage === 1 && <GameLobby />}
                <Footer />
            </Stack>
        </>
    )
}

const logoGame = {
    me: {
        units: [[1, 1]],
        walls: [[1, 2]],
        reachable: [[2, 2]],
    },
    opponent: {
        units: [[2, 2]],
        walls: [[2, 1]],
        reachable: [],
    },
    trenches: [],
}

const logoIcons = {
    me: <MyIcon />,
    opponent: <OpponentIcon />,
}

const sx = {
    display: "flex",
    alignItems: "center",
    px: 2,
}
