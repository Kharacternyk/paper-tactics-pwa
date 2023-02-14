import Box from "@mui/material/Box"
import Rating from "@mui/material/Rating"
import {Section} from "./section"

export const RatingSection = ({state, icon, max}) => (
    <Section>
        <Box display="flex" justifyContent="center">
            <Rating
                value={state[0]}
                onChange={(_, value) => state[1](value)}
                max={max}
                icon={icon}
                emptyIcon={icon}
                sx={{
                    "& .MuiRating-iconFilled": {
                        color: "primary.main",
                    },
                    "& .MuiRating-iconHover": {
                        color: "primary.light",
                    },
                }}
            />
        </Box>
    </Section>
)
