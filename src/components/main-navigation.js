import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import LearnIcon from "@mui/icons-material/School"
import PlayIcon from "@mui/icons-material/SportsEsports"
import SettingsIcon from "@mui/icons-material/Settings"

export const MainNavigation = ({value, onChange}) => {
    const tabSx = {
        flex: "1 0 0",
        justifySelf: "center"
    }

    return (
        <Tabs
            value={value}
            onChange={onChange}
            sx={{maxWidth: "30rem", width: "100%"}}
        >
            <Tab label="Learn" icon={<LearnIcon />} sx={tabSx}/>
            <Tab label="Play" icon={<PlayIcon />} sx={tabSx}/>
            <Tab label="Settings" icon={<SettingsIcon />} sx={tabSx}/>
        </Tabs>
    )
}
