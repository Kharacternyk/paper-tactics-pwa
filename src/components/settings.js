import { Section } from "./section"
import { GameUnitIcon } from "./game-unit-icon"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import CrossIcon from "@mui/icons-material/Close"
import AnchorIcon from "@mui/icons-material/Anchor"
import ForestIcon from "@mui/icons-material/Forest"
import BulbIcon from "@mui/icons-material/EmojiObjects"
import BugIcon from "@mui/icons-material/BugReport"
import FortIcon from "@mui/icons-material/Fort"
import StarsIcon from "@mui/icons-material/AutoAwesome"
import BakeryIcon from "@mui/icons-material/BakeryDining"

export const icons = [
    <CrossIcon />,
    <AnchorIcon />,
    <ForestIcon />,
    <BulbIcon />,
    <BugIcon />,
    <FortIcon />,
    <StarsIcon />,
    <BakeryIcon />
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
