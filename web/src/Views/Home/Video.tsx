import ReactPlayer from 'react-player'
import {
    Box,
    Typography,
} from "@mui/material";
import Container from "@/components/Container";

type Props = {
    url: string,
    fallbackUrl?: string
}

const Video: React.FC<Props> = ({ url, fallbackUrl }) => {
    return (
        <>
            <Box sx={{
                overflow: 'hidden',
                position: 'relative',
                isolation: 'isolate',
                minHeight: 200,
                mt: 6.5,
                '&:before': {
                    display: 'block',
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: '100%',
                    height: 10,
                    transform: 'translateY(-41px)',
                    bgcolor: 'primary.main',
                    zIndex: -1,
                },
                '&:after': {
                    display: 'block',
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: '100%',
                    height: 10,
                    transform: 'translateY(41px)',
                    bgcolor: 'primary.main',
                    zIndex: -1,
                },
            }}>
                <Container>
                    <Box
                        component={ReactPlayer}
                        url={url}
                        config={{
                            youtube: {
                                playerVars: { showinfo: 0 }
                            },
                        }}
                        light={fallbackUrl}
                        controls
                        playing
                        playIcon={
                            <svg width="64" height="68" viewBox="0 0 64 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M63.626 34.2887L0.489285 67.7426L0.489288 0.834703L63.626 34.2887Z" fill="#D9D9D9" />
                            </svg>
                        }
                        sx={{
                            borderRadius: { xs: 3, lg: 5 },
                            bgcolor: '#1B1B1B',
                            width: '100% !important',
                            height: 'auto !important',
                            overflow: 'hidden',
                            aspectRatio: '16/7',
                            "video": {
                                objectFit: 'cover',
                            }
                        }}
                    />
                </Container>
            </Box>
        </>
    )
}

export default Video
