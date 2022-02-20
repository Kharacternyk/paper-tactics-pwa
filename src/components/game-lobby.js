import {Section} from "./section"
import {GameUnitIcon} from "./game-unit-icon"
import {Game} from "./game"
import {useState} from "react"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import Button from "@mui/material/Button"
import CrossIcon from "@mui/icons-material/Close"
import TriangleIcon from "@mui/icons-material/ChangeHistory"
import FlakeIcon from "@mui/icons-material/AcUnit"
import AnchorIcon from "@mui/icons-material/Anchor"
import FlowerIcon from "@mui/icons-material/LocalFlorist"
import StarsIcon from "@mui/icons-material/AutoAwesome"
import RocketIcon from "@mui/icons-material/RocketLaunch"
import BeerIcon from "@mui/icons-material/SportsBar"
import BakeryIcon from "@mui/icons-material/BakeryDining"
import BulbIcon from "@mui/icons-material/EmojiObjects"
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
        <Game apiUrl={apiUrl} iconIndex={iconIndex} icons={icons} />
    ) : (
        <>
            <Section>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={() => setAwaiting(true)}
                >
                    Create game
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
    <TriangleIcon />,
    <FlakeIcon />,
    <AnchorIcon />,
    <FlowerIcon />,
    <BulbIcon />,
    <StarsIcon />,
    <RocketIcon />,
    <BeerIcon />,
    <BakeryIcon />,
]

const apiUrl = "wss://az7ndrlaxk.execute-api.eu-central-1.amazonaws.com/rolling"
