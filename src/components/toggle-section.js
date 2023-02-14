import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import {Section} from "./section"

export const ToggleSection = ({state, values, labeler}) => {
    const [value, setValue] = state

    const toggleButtons = values.map(value => (
        <ToggleButton key={value} value={value} sx={{flexGrow: 1, p: 0}}>
            {labeler(value)}
        </ToggleButton>
    ))

    return (
        <Section>
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={value}
                onChange={(_, value) => setValue(value)}
                sx={{display: "flex"}}
            >
                {toggleButtons}
            </ToggleButtonGroup>
        </Section>
    )
}
