import Box from "@mui/material/Box"
import Rating from "@mui/material/Rating"
import {Section} from "./section"

export const RatingSection = ({state, icon, max, min}) => (
    <Section>
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
