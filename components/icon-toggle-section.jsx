import {icons} from "../icons"
import {GameUnitIcon} from "./game-unit-icon"
import {ToggleSection} from "./toggle-section"
import {keyframes} from "@mui/styled-engine"
import Tooltip from "@mui/material/Tooltip"

export const IconToggleSection = ({
    iconIndexState,
    isEasterEggFound,
    highlightFX,
    showTooltips,
}) => {
    const rows = []
    const length = isEasterEggFound ? icons.length : icons.length - 10
    for (var i = 0; i * 10 < length; ++i) {
        const values = []
        for (var k = 0; k < 10 && i * 10 + k < length; ++k) {
            values.push(i * 10 + k)
        }
        rows.push(
            <ToggleSection
                key={i}
                state={iconIndexState}
                values={values}
                labeler={value => {
                    let icon = icons[value]
                    let sx = {}
                    if (Array.isArray(icon)) {
                        icon = icon[0]
                        if (highlightFX) {
                            sx = {
                                animation: `${transition} 2s infinite alternate`,
                            }
                        }
                        if (showTooltips) {
                            icon = <Tooltip title="FX icon">{icon}</Tooltip>
                        }
                    }
                    return <GameUnitIcon sx={sx}>{icon}</GameUnitIcon>
                }}
            />
        )
    }
    return <>{rows}</>
}

const transition = keyframes`
    from {
        background-color: inherit;
        color: inherit;
    }
    to {
        background-color: #FFFF0033;
        color: #AAAA00;
    }
`
