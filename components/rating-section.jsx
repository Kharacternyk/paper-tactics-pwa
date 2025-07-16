import Box from "@mui/material/Box"
import Rating from "@mui/material/Rating"
import Tooltip from "@mui/material/Tooltip"
import {Section} from "./section"

export const RatingSection = ({state, icon, max, min, tooltip}) => (
    <Section>
        <Tooltip title={tooltip}>
            <Box display="flex" justifyContent="center">
                <Rating
                    value={state[0]}
                    onChange={(_, value) =>
                        state[1](!min || !value || value >= min ? value : min)
                    }
                    max={max}
                    icon={icon}
                    emptyIcon={icon}
                    sx={sx}
                />
            </Box>
        </Tooltip>
    </Section>
)

const sx = {
    "& .MuiRating-iconFilled": {
        color: "primary.main",
    },
    "& .MuiRating-iconHover": {
        color: "primary.light",
    },
}
