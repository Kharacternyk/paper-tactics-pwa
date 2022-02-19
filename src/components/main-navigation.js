import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import LearnIcon from "@mui/icons-material/School"
import PlayIcon from "@mui/icons-material/SportsEsports"

export const MainNavigation = ({value, onChange}) => {
    return (
        <Tabs
            value={value}
            onChange={onChange}
            sx={{maxWidth: "30rem", width: "100%", justifyContent: "center"}}
        >
            <Box display="flex" alignItems="center" flexGrow={1} p={2}>
                <Typography
                    component="h1"
                    fontFamily="IBM Plex Mono"
                    fontStyle="italic"
                    fontSize="1.25rem"
                    fontWeight={500}
                    color="primary"
                >
                    Paper-Tactics
                </Typography>
            </Box>
            <Tab label="Learn" icon={<LearnIcon />} />
            <Tab label="Play" icon={<PlayIcon />} />
        </Tabs>
    )
}
