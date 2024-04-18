import {
    Box,
} from "@mui/material";
import ScrollBar from "../../components/ScrollBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ScrollBar>
            <Box
                sx={{
                    flex: 1,
                    py: 6,
                    px: {
                        xs: 4,
                        sm: 6,
                        md: 8,
                        lg: 12
                    },
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>
        </ScrollBar>
    )
}

export default Layout
