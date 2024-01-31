import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import {Section} from "./section"

export const BadgeAlert = ({children, subtitle, icon, color, progress}) => {
    const badge = (
        <Box position="relative" display="inline-flex" alignItems="center">
            <CircularProgress
                size="2.5rem"
                variant={
                    progress === undefined ? "indeterminate" : "determinate"
                }
                value={progress}
                color={color}
            />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                right={0}
            >
                {icon}
            </Box>
        </Box>
    )

    return (
        <Section>
            <Alert color={color} icon={badge}>
                <AlertTitle
                    sx={
                        subtitle
                            ? {}
                            : {
                                  display: "flex",
                                  alignItems: "center",
                                  height: "100%",
                                  m: 0,
                              }
                    }
                >
                    {children}
                </AlertTitle>
                {subtitle}
            </Alert>
        </Section>
    )
}
