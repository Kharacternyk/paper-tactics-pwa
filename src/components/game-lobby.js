import {Section} from "./section"
import {GameUnitIcon} from "./game-unit-icon"
import {Game} from "./game"
import {useState} from "react"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import Button from "@mui/material/Button"
import PeopleIcon from "@mui/icons-material/ConnectWithoutContact"
import CrossIcon from "@mui/icons-material/Close"
import CircleIcon from "@mui/icons-material/FiberManualRecordOutlined"
import HashIcon from "@mui/icons-material/TagOutlined"
import FlagIcon from "@mui/icons-material/FlagOutlined"
import MusicIcon from "@mui/icons-material/MusicNoteOutlined"
import StarsIcon from "@mui/icons-material/AutoAwesomeOutlined"
import RocketIcon from "@mui/icons-material/RocketLaunchOutlined"
import BeerIcon from "@mui/icons-material/SportsBarOutlined"
import BakeryIcon from "@mui/icons-material/BakeryDiningOutlined"
import BulbIcon from "@mui/icons-material/EmojiObjectsOutlined"
import useCookie from "react-use-cookie"

export const GameLobby = () => {
    const [iconIndex, setIconIndex] = useCookie("icon", 0)
    const [awaiting, setAwaiting] = useState(false)

    const iconButtons = icons.map((icon, index) => (
        <ToggleButton key={index} value={index} sx={{flexGrow: 1, p: 0}}>
            <GameUnitIcon>
                {icons[index]}
            </GameUnitIcon>
        </ToggleButton>
    ))

    return awaiting ? (
        <Game
            apiUrl={apiUrl}
            iconIndex={Number(iconIndex)}
            icons={icons}
            onQuit={() => setAwaiting(false)}
        />
    ) : (
        <>
            <Section>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={() => setAwaiting(true)}
                    startIcon={<PeopleIcon />}
                >
                    Play against other people
                </Button>
            </Section>
            <Section>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={Number(iconIndex)}
                    onChange={(event, iconIndex) => setIconIndex(iconIndex)}
                    sx={{display: "flex"}}
                >
                    {iconButtons}
                </ToggleButtonGroup>
            </Section>
        </>
    )
}

const icons = [
    <CrossIcon />,
    <CircleIcon />,
    <HashIcon />,
    <FlagIcon />,
    <StarsIcon />,
    <RocketIcon />,
    <BeerIcon />,
    <MusicIcon />,
    <BakeryIcon />,
    <BulbIcon />,
]

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"
