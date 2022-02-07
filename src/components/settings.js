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
import AgroIcon from "@mui/icons-material/Agriculture"
import BakeryIcon from "@mui/icons-material/BakeryDining"
import ForestIcon from "@mui/icons-material/Forest"
import BulbIcon from "@mui/icons-material/EmojiObjects"
import BugIcon from "@mui/icons-material/BugReport"
import FortIcon from "@mui/icons-material/Fort"

export const icons = [
    <CrossIcon />,
    <FlakeIcon />,
    <AnchorIcon />,
    <FlowerIcon />,
    <StarsIcon />,
    <RocketIcon />,
    <AgroIcon />,
    <BakeryIcon />,
    <ForestIcon />,
    <BulbIcon />,
    <BugIcon />,
    <FortIcon />
]

export const Settings = ({onIconChanged, iconIndex}) => {
    const iconButtons = icons.map((icon, index) => (
        <ToggleButton key={index} value={index} sx={{flexGrow: 1, p: 0}}>
            <GameUnitIcon>
                {icons[index]}
            </GameUnitIcon>
        </ToggleButton>
    ))

    console.log(iconIndex)

    return  (
        <Section>
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={iconIndex}
                onChange={(event, iconIndex) => onIconChanged(iconIndex)}
                sx={{display: "flex"}}
            >
                {iconButtons}
            </ToggleButtonGroup>
        </Section>
    )
}
