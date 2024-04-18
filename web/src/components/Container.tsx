import { Box } from "@mui/material"

type Props = {
    children: React.ReactNode
}

const Container = ({ children }: Props) => {
    return (
        <Box
            sx={{
                maxWidth: 1556,
                marginInline: 'auto',
                paddingX: 2,
            }}
        >
            {children}
        </Box>
    )
}

export default Container
