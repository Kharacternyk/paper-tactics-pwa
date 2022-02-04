import { Section } from "./section"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"

export const BadgeAlert = ({children, icon, color, progress}) => {
    const badge = (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                variant={progress === undefined ? "indeterminate" : "determinate"}
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
            <Alert severity={color} icon={badge}>
                <AlertTitle sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    m: 0
                }}>
                    {children}
                </AlertTitle>
            </Alert>
        </Section>
    )
}
