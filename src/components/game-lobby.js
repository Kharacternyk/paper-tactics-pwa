import AnchorIcon from "@mui/icons-material/AnchorOutlined"
import ArchitectureIcon from "@mui/icons-material/ArchitectureOutlined"
import StarsIcon from "@mui/icons-material/AutoAwesomeOutlined"
import BakeryIcon from "@mui/icons-material/BakeryDiningOutlined"
import Balance from "@mui/icons-material/BalanceOutlined"
import BeachIcon from "@mui/icons-material/BeachAccessOutlined"
import Blender from "@mui/icons-material/BlenderOutlined"
import BubbleChart from "@mui/icons-material/BubbleChartOutlined"
import Casino from "@mui/icons-material/CasinoOutlined"
import CelebrationIcon from "@mui/icons-material/CelebrationOutlined"
import CrossIcon from "@mui/icons-material/Close"
import PeopleIcon from "@mui/icons-material/ConnectWithoutContact"
import Diamond from "@mui/icons-material/DiamondOutlined"
import TurnIcon from "@mui/icons-material/Edit"
import BulbIcon from "@mui/icons-material/EmojiObjectsOutlined"
import HeartIcon from "@mui/icons-material/FavoriteBorderOutlined"
import CircleIcon from "@mui/icons-material/FiberManualRecordOutlined"
import FlagIcon from "@mui/icons-material/FlagOutlined"
import StarIcon from "@mui/icons-material/GradeOutlined"
import HealthAndSafety from "@mui/icons-material/HealthAndSafetyOutlined"
import HiveIcon from "@mui/icons-material/HiveOutlined"
import CartIcon from "@mui/icons-material/LocalGroceryStoreOutlined"
import LunchDining from "@mui/icons-material/LunchDiningOutlined"
import MusicIcon from "@mui/icons-material/MusicNoteOutlined"
import MoonIcon from "@mui/icons-material/NightsStayOutlined"
import BellIcon from "@mui/icons-material/NotificationsNoneOutlined"
import RocketIcon from "@mui/icons-material/RocketLaunchOutlined"
import Science from "@mui/icons-material/ScienceOutlined"
import RobotIcon from "@mui/icons-material/SmartToyOutlined"
import BeerIcon from "@mui/icons-material/SportsBarOutlined"
import FootballIcon from "@mui/icons-material/SportsFootballOutlined"
import HashIcon from "@mui/icons-material/TagOutlined"
import Token from "@mui/icons-material/TokenOutlined"
import Traffic from "@mui/icons-material/TrafficOutlined"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Rating from "@mui/material/Rating"
import TextField from "@mui/material/TextField"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import {useState} from "react"
import useCookie from "react-use-cookie"
import {Game} from "./game"
import {GameUnitIcon} from "./game-unit-icon"
import {Section} from "./section"

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
    <Diamond />,
    <Token />,
    <BubbleChart />,
    <Blender />,
    <Casino />,
    <Science />,
    <LunchDining />,
    <HealthAndSafety />,
    <Traffic />,
    <Balance />,
]

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

const countSelectorSx = {
    "& .MuiRating-iconFilled": {
        color: "primary.main",
    },
    "& .MuiRating-iconHover": {
        color: "primary.light",
    },
}

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
    const [trenchDensityPercent, setTrenchDensityPercent] = useCookie(
        "trench-density",
        "0"
    )
    const [isDoubleBase, setIsDoubleBase] = useCookie("double-base", "")
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

    const trenchDensityButtons = [0, 15, 25, 35, 50, 75].map(density => (
        <ToggleButton key={density} value={density} sx={{flexGrow: 1, p: 0}}>
            {density ? `${density}%` : "No trenches"}
        </ToggleButton>
    ))

    const doubleBaseSelectionButtons = [false, true].map(isDoubleBase => (
        <ToggleButton
            key={isDoubleBase}
            value={isDoubleBase}
            sx={{flexGrow: 1, p: 0}}
        >
            {isDoubleBase ? "Double base" : "Single base"}
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
                trench_density_percent: Number(trenchDensityPercent),
                is_double_base: Boolean(isDoubleBase),
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
            <Section>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={Number(trenchDensityPercent)}
                    onChange={(event, value) => setTrenchDensityPercent(value)}
                    sx={{display: "flex"}}
                >
                    {trenchDensityButtons}
                </ToggleButtonGroup>
            </Section>
            <Section>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={Boolean(isDoubleBase)}
                    onChange={(event, value) =>
                        setIsDoubleBase(value ? "true" : "")
                    }
                    sx={{display: "flex"}}
                >
                    {doubleBaseSelectionButtons}
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
                    {iconButtons.slice(10, 20)}
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
                    {iconButtons.slice(20)}
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
