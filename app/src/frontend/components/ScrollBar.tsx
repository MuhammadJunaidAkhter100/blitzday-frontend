import { Box } from "@mui/material";
import { Scrollbar } from "react-scrollbars-custom";

interface Props {
    height?: number | string;
    children: React.ReactNode;
}

const ScrollBar: React.FC<Props> = ({ children, height }) => {
    return (
        <Box sx={{ flexGrow: 1, height: height ? height : 0 }}>
            <Box
                component={Scrollbar}
                sx={{
                    ".ScrollbarsCustom-Thumb": {
                        backgroundColor: '#1E2330 !important',
                    },
                    ".ScrollbarsCustom-Content": {
                        display: 'flex'
                    }
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default ScrollBar
