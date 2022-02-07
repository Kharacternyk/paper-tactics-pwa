import Box from "@mui/material/Box"

export const GameUnitIcon = ({children}) => {
    const sx = {
        "& svg": {
            width: "100%",
            height: "100%",
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={sx}
        >
            {children}
        </Box>
    )
}
