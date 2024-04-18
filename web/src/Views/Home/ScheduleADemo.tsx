import { Box, Typography } from "@mui/material";
import ScheduleForm from "./comps/ScheduleForm";

const ScheduleADemo: React.FC = () => {
    return (
        <Box
            textAlign={'center'}
            sx={{
                px: 3,
                py: {
                    xs: '32px',
                    md: '52px',
                    lg: '105px',
                },
                bgcolor: 'background.paper'
            }}
        >
            <Typography
                variant="h2"
                fontWeight={'bold'}
            >
                Schedule a demo
            </Typography>
            <Typography
                variant="body1"
                color={'text.secondary'}
                sx={{
                    fontSize: 20,
                }}
            >
                Try BlitzDay.AI for Free
            </Typography>
            <ScheduleForm />
        </Box>
    )
}

export default ScheduleADemo
