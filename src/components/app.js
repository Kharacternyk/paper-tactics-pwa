import { useState } from "react"
import Alert from "@mui/material/Alert"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"
import FormControlLabel from "@mui/material/FormControlLabel"
import CssBaseline from "@mui/material/CssBaseline"
import LearnIcon from "@mui/icons-material/School"
import PlayIcon from "@mui/icons-material/SportsEsports"
import PracticeIcon from "@mui/icons-material/TrackChanges"
import SettingsIcon from "@mui/icons-material/Settings"
import CrossIcon from "@mui/icons-material/Close"
import AnchorIcon from "@mui/icons-material/Anchor"
import ChildIcon from "@mui/icons-material/ChildCare"
import BulbIcon from "@mui/icons-material/EmojiObjects"
import BugIcon from "@mui/icons-material/BugReport"
import VirusIcon from "@mui/icons-material/Coronavirus"
//flutterdash
import { Game } from "./game"

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"

export const App = () => {
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ icon, setIcon ] = useState("cross");

    const icons = {
        cross: <CrossIcon />,
        anchor: <AnchorIcon />,
        child: <ChildIcon />,
        bulb: <BulbIcon />,
        bug: <BugIcon />,
        virus: <VirusIcon />
    }

    const settings = (
        <FormControl>
            <FormLabel>Icon</FormLabel>
            <RadioGroup defaultValue="cross" onChange={e => setIcon(e.target.value)}>
                <FormControlLabel value="cross" control={<Radio />} label={icons.cross} />
                <FormControlLabel value="anchor" control={<Radio />} label={icons.anchor} />
                <FormControlLabel value="child" control={<Radio />} label={icons.child} />
                <FormControlLabel value="bulb" control={<Radio />} label={icons.bulb} />
                <FormControlLabel value="bug" control={<Radio />} label={icons.bug} />
                <FormControlLabel value="virus" control={<Radio />} label={icons.virus} />
            </RadioGroup>
        </FormControl>
    )

    return (
        <>
            <CssBaseline />
            <Stack spacing={2}>
                <AppBar position="sticky" color="transparent">
                    <Box p={1} display="flex" justifyContent="center">
                        <Typography
                            component="h1"
                            color="primary"
                            fontSize="1.5rem"
                            fontStyle="italic"
                            fontWeight="bold"
                            letterSpacing="0.2em"
                            textTransform="uppercase"
                        >
                            Paper Tactics
                        </Typography>
                    </Box>
                    <BottomNavigation
                        showLabels
                        value={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                    >
                        <BottomNavigationAction label="Learn" icon={<LearnIcon />} />
                        <BottomNavigationAction label="Play" icon={<PlayIcon />} />
                        <BottomNavigationAction label="Practice" icon={<PracticeIcon />} />
                        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                    </BottomNavigation>
                </AppBar>
                {currentPage === 0 && <Alert severity="warning"> Coming soon… </Alert>}
                {currentPage === 1 && <Game apiUrl={apiUrl} icon={icons[icon]} />}
                {currentPage === 2 && <Alert severity="warning"> Coming soon… </Alert>}
                {currentPage === 3 && settings}
            </Stack>
        </>
    )
}
