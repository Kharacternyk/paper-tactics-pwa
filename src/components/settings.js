import { Section } from "./section"
import { GameUnitIcon } from "./game-unit-icon"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import CrossIcon from "@mui/icons-material/Close"
import FlakeIcon from "@mui/icons-material/AcUnit"
import AnchorIcon from "@mui/icons-material/Anchor"
import FlowerIcon from "@mui/icons-material/LocalFlorist"
import StarsIcon from "@mui/icons-material/AutoAwesome"
import RocketIcon from "@mui/icons-material/RocketLaunch"
import BeerIcon from "@mui/icons-material/SportsBar"
import BakeryIcon from "@mui/icons-material/BakeryDining"
import BoltIcon from "@mui/icons-material/Bolt"
import BulbIcon from "@mui/icons-material/EmojiObjects"

export const icons = [
    <CrossIcon />,
    <BoltIcon />,
    <FlakeIcon />,
    <AnchorIcon />,
    <FlowerIcon />,
    <BulbIcon />,
    <StarsIcon />,
    <RocketIcon />,
    <BeerIcon />,
    <BakeryIcon />,
]

export const Settings = ({onIconChanged, iconIndex}) => {
    const iconButtons = icons.map((icon, index) => (
        <ToggleButton key={index} value={index} sx={{flexGrow: 1, p: 0}}>
            <GameUnitIcon>
                {icons[index]}
            </GameUnitIcon>
        </ToggleButton>
    ))

    return  (
        <Section>
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={Number(iconIndex)}
                onChange={(event, iconIndex) => onIconChanged(iconIndex)}
                sx={{display: "flex"}}
            >
                {iconButtons}
            </ToggleButtonGroup>
        </Section>
    )
}
