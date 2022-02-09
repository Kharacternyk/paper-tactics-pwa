import Paper from "@mui/material/Paper"

export const Section = ({children}) => {
    const sx = {
        maxWidth: "30rem",
        width: "100%",
    }

    return <Paper elevation={8} sx={sx}>{children}</Paper>
}
