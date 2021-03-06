import {Section} from "./section"
import {GameUnitIcon} from "./game-unit-icon"
import {Game} from "./game"
import {useState} from "react"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Rating from "@mui/material/Rating"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import Button from "@mui/material/Button"
import TurnIcon from "@mui/icons-material/Edit"
import PeopleIcon from "@mui/icons-material/ConnectWithoutContact"
import RobotIcon from "@mui/icons-material/SmartToyOutlined"
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
import CelebrationIcon from "@mui/icons-material/CelebrationOutlined"
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
    const [gameSize, setGameSize] = useCookie("game-size", "10")
    const [turnCount, setTurnCount] = useCookie("turn-count", "3")
    const [isVisibilityApplied, setIsVisibilityApplied] = useCookie(
        "visibility",
        ""
    )
    const [isAgainstBot, setIsAgainstBot] = useCookie("bot", "")

    const iconButtons = icons.map((icon, index) => (
        <ToggleButton key={index} value={index} sx={{flexGrow: 1, p: 0}}>
            <GameUnitIcon>{icons[index]}</GameUnitIcon>
        </ToggleButton>
    ))

    const visibilityPreferenceButtons = [false, true].map(isEnabled => (
        <ToggleButton
            key={isEnabled}
            value={isEnabled}
            sx={{flexGrow: 1, p: 0}}
        >
            {isEnabled ? "With visibility rules" : "Classic"}
        </ToggleButton>
    ))

    const opponentSelectionButtons = [false, true].map(isBot => (
        <ToggleButton key={isBot} value={isBot} sx={{flexGrow: 1, p: 0}}>
            {isBot ? "Against bot" : "Against other people"}
        </ToggleButton>
    ))

    const turnCountSelector = (
        <Box display="flex" justifyContent="center">
            <Rating
                value={Number(turnCount)}
                onChange={(event, value) => setTurnCount(value)}
                max={7}
                icon={<TurnIcon />}
                emptyIcon={<TurnIcon />}
                sx={countSelectorSx}
            />
        </Box>
    )

    const gameSizeSelector = (
        <Box display="flex" justifyContent="center">
            <Rating
                value={Number(gameSize)}
                onChange={(event, value) => setGameSize(value)}
                max={12}
                icon={<ArchitectureIcon />}
                emptyIcon={<ArchitectureIcon />}
                sx={countSelectorSx}
            />
        </Box>
    )

    return awaiting ? (
        <Game
            apiUrl={apiUrl}
            gamePreferences={{
                size: Number(gameSize),
                turn_count: Number(turnCount),
                is_visibility_applied: Boolean(isVisibilityApplied),
                is_against_bot: Boolean(isAgainstBot),
            }}
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
                    startIcon={isAgainstBot ? <RobotIcon /> : <PeopleIcon />}
                >
                    Play against {isAgainstBot ? "bot" : "other people"}
                </Button>
            </Section>
            <Section>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={Boolean(isAgainstBot)}
                    onChange={(event, value) =>
                        setIsAgainstBot(value ? "true" : "")
                    }
                    sx={{display: "flex"}}
                >
                    {opponentSelectionButtons}
                </ToggleButtonGroup>
            </Section>
            <Section>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={Boolean(isVisibilityApplied)}
                    onChange={(event, value) =>
                        setIsVisibilityApplied(value ? "true" : "")
                    }
                    sx={{display: "flex"}}
                >
                    {visibilityPreferenceButtons}
                </ToggleButtonGroup>
            </Section>
            <Section>{turnCountSelector}</Section>
            <Section>{gameSizeSelector}</Section>
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
                        const server = servers.find(
                            server => server.label == value
                        )
                        setApiUrl(server?.url ?? value)
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Server"
                            variant="filled"
                        />
                    )}
                />
            </Section>
        </>
    )
}

const servers = [
    {
        label: "Frankfurt",
        url: "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling",
    },
    {
        label: "Localhost",
        url: "ws://localhost:8001",
    },
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
    <CelebrationIcon />,
    <BellIcon />,
    <BeachIcon />,
]

const countSelectorSx = {
    "& .MuiRating-iconFilled": {
        color: "primary.main",
    },
    "& .MuiRating-iconHover": {
        color: "primary.light",
    },
}
