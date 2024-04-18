import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Stack, Grid } from "@mui/material"
import { Stop, Pause, PlayArrow } from '@mui/icons-material';


import { RecordingIcon, zoomLogo } from '../../../assets';
import { useEffect, useState } from 'react';

const Footer = ({
    startTimer,
    meetingTime,
    stopCallHandler,
    isPaused,
    pauseResumeHandler
}: { startTimer?: boolean, meetingTime?: any, stopCallHandler?: any, isPaused?: boolean, pauseResumeHandler?: any }) => {
    const [time, setTime] = useState(0);
    const location: any = useLocation();
    const navigate = useNavigate();

    const switchScreen = () => {

    }

    useEffect(() => {
        let intervalId: any;
        if (startTimer && !isPaused) {
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [startTimer, time , isPaused]);

    useEffect(() => {
        if (!startTimer) {
            setTime(0);
        }
    }, [startTimer])

    // Time calculation
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;


    useEffect(() => {
        if (meetingTime) meetingTime.current = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }, [time])

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                py: 2,
                pr: 3,
                pl: 2,
                borderTop: 1,
                borderColor: '#1A1E28',
            }}
        >
            <Box
                sx={{
                    px: {
                        sm: 6,
                        md: 8,
                        lg: 12
                    }
                }}
            >
                <Grid container spacing={[2, 0]}>
                    <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }} />
                    <Grid
                        item
                        xs={10}
                        md={8}
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                        gap={6}
                    >
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            gap={1.5}
                        >
                            <Box
                                component={'img'}
                                src={RecordingIcon}
                                sx={{
                                    width: '26px',
                                    height: '26px',
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 400,
                                    lineHeight: 1,
                                }}
                            >
                                Live Call
                            </Typography>
                        </Stack>
                        <Stack
                            direction={'row'}
                            gap={1.5}
                        >
                            <IconButton
                                sx={{
                                    borderRadius: 8,
                                    bgcolor: "#151529"
                                }}
                                onClick={stopCallHandler ? stopCallHandler : () => { }}
                            >
                                <Stop />
                            </IconButton>
                            <IconButton
                                sx={{
                                    borderRadius: 8,
                                    bgcolor: "#151529",
                                }}
                                onClick={pauseResumeHandler ? pauseResumeHandler : () => { }}
                            >
                                {isPaused ? <PlayArrow /> : <Pause />}
                            </IconButton>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 400,
                                    lineHeight: 1,
                                    borderRadius: 8,
                                    bgcolor: "#151529",
                                    py: 1,
                                    px: 2,
                                }}
                            >
                                {hours}:{minutes.toString().padStart(2, "0")}:
                                {seconds.toString().padStart(2, "0")}:
                                {milliseconds.toString().padStart(2, "0")}
                            </Typography>
                        </Stack>

                        {/* <Box
                            component={'img'}
                            src={zoomLogo}
                            sx={{
                                height: '42px',
                                display: {
                                    sm: 'block',
                                    xs: 'none',
                                }
                            }}
                        /> */}
                    </Grid>
                </Grid>
            </Box>
        </Box >
    )
}

export default Footer
