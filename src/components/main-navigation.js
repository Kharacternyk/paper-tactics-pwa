import {GameMap} from "./game-map"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import LearnIcon from "@mui/icons-material/School"
import PlayIcon from "@mui/icons-material/SportsEsports"
import MyIcon from "@mui/icons-material/Close"
import OpponentIcon from "@mui/icons-material/ChangeHistory"

export const MainNavigation = ({value, onChange}) => {
    const logoGame = {
        size: 3,
        me: {
            units: [[1, 1], [1, 2]],
            walls: [[2, 3]],
            reachable: []
        },
        opponent: {
            units: [[3, 3], [3, 2]],
            walls: [[2, 1]],
            reachable: [],
        }
    }

    const logoIcons = {
        me: <MyIcon />,
        opponent: <OpponentIcon />
    }

    return (
        <Box px={2} display="flex" justifyContent="center">
            <Stack direction="row" maxWidth="30rem" width="100%" alignItems="center">
                <Paper elevation={2} sx={{width: "2.5rem", flex: "initial"}}>
                    <GameMap game={logoGame} icons={logoIcons} />
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
                    Paper <br/>
                    Tactics
                </Typography>
                <Tabs value={value} onChange={onChange} flex="initial">
                    <Tab label="Learn" icon={<LearnIcon />} />
                    <Tab label="Play" icon={<PlayIcon />} />
                </Tabs>
            </Stack>
        </Box>
    )
}
