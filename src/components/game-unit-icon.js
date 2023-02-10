import Box from "@mui/material/Box"

export const GameUnitIcon = ({children, sx}) => {
    const svgSx = {
        "& svg": {
            width: "100%",
            height: "100%",
        },
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{...svgSx, ...sx}}
        >
            {children}
        </Box>
    )
}
