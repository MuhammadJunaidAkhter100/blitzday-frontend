import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    return (
        <Box
            id="main-wrapper"
            sx={{
                height: '100svh',
                bgcolor: 'background.default',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                    width: '12px'
                },
                '&::-webkit-scrollbar-track': {
                    background: '#1B1B1B'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#5D22FE',
                    borderRadius: '20px'
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#5D22FE #1B1B1B',
            }}
        >
            <Header />
            {children}
            <Footer />
        </Box>
    )
}

export default MainLayout
