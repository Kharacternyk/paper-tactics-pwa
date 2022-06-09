import {Section} from "./section"
import {GameUnitIcon} from "./game-unit-icon"
import {Game} from "./game"
import {useState} from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
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
import AnchorIcon from "@mui/icons-material/AnchorOutlined"
import ArchitectureIcon from "@mui/icons-material/ArchitectureOutlined"
import BellIcon from "@mui/icons-material/NotificationsNoneOutlined"
import BeachIcon from "@mui/icons-material/BeachAccessOutlined"
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined"
import StarIcon from "@mui/icons-material/GradeOutlined"
import HiveIcon from "@mui/icons-material/HiveOutlined"
import CartIcon from "@mui/icons-material/LocalGroceryStoreOutlined"
import MoonIcon from "@mui/icons-material/NightsStayOutlined"
import FootballIcon from "@mui/icons-material/SportsFootballOutlined"
import useCookie from "react-use-cookie"

export const GameLobby = () => {
    const [iconIndex, setIconIndex] = useCookie("icon", 0)
    const [awaiting, setAwaiting] = useState(false)
    const [apiUrl, setApiUrl] = useState(servers[0].url)

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
                    {iconButtons.slice(0, 10)}
                </ToggleButtonGroup>
            </Section>
            <Section>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={Number(iconIndex)}
                    onChange={(event, iconIndex) => setIconIndex(iconIndex)}
                    sx={{display: "flex"}}
                >
                    {iconButtons.slice(10)}
                </ToggleButtonGroup>
            </Section>
            <Section>
                <Autocomplete
                    freeSolo
                    options={servers}
                    defaultValue={servers[0]}
                    onInputChange={(event, value) => {
                        const server = servers.find(server => server.label == value)
                        setApiUrl(server?.url ?? value)
                    }}
                    renderInput={
                        params => <TextField {...params} label="Server" variant="filled"/>
                    }
                />
            </Section>
        </>
    )
}

const servers = [
    {
        label: "Frankfurt",
        url: "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"
    },
    {
        label: "Local Test",
        url: "ws://localhost:8001"
    }
]

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
    <HeartIcon />,
    <StarIcon />,
    <HiveIcon />,
    <CartIcon />,
    <MoonIcon />,
    <FootballIcon />,
    <AnchorIcon />,
    <ArchitectureIcon />,
    <BellIcon />,
    <BeachIcon />,
]
