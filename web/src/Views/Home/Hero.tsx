"use client"
import {
    Box,
    Stack,
    Typography,
    Button
} from "@mui/material";
import Container from "@/components/Container";
import Video from "./Video";

const Hero: React.FC = () => {

    function scrollToBottomOfContainer() {
        const container = document.getElementById('main-wrapper');
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth',
            });
        }
    }

    return (
        <Box sx={{
            py: {
                xs: '32px',
                md: '52px',
                lg: '105px',
            },
        }}>
            <Container>
                <Stack
                    gap={5.5}
                    alignItems={'center'}
                    sx={{
                        textAlign: 'center',
                        maxWidth: '1244px',
                        marginInline: 'auto',
                    }}
                >
                    <Typography
                        variant="h1"
                    >
                        Try <span style={{ color: '#5D22FE' }}>BlitzDay.AI</span> for Free
                    </Typography>
                    <Typography
                        variant="h3"
                    >
                        Millions of dollars are invested in creating sales collateral, but much of it goes unused. Sales teams waste a ton of time searching for the correct information on their computers.
                    </Typography>
                    <Typography
                        variant="h3"
                    >
                        <span style={{ color: '#5D22FE' }}>BlitzDay.AI</span> gives <span style={{ color: '#5D22FE' }}>live</span> recommendations based on Customer’s questions, enabling reps to tailor their pitch dynamically and close more deals
                    </Typography>
                    <Stack
                        gap={4}
                        alignItems={'center'}
                    >
                        <Button
                            onClick={scrollToBottomOfContainer}
                            variant="contained"
                        >
                            Schedule A demo
                        </Button>
                    </Stack>
                </Stack>
            </Container>
            {/* page video */}
            <Video
                fallbackUrl={'https://www.shopurfood.com/blogs/wp-content/uploads/2021/06/AI-Marketing.jpg'}
                url={'https://media.istockphoto.com/id/1360048537/video/futuristic-animated-concept-big-data-center-chief-technology-officer-using-laptop-standing-in.mp4?s=mp4-640x640-is&k=20&c=qfseEZiJxfYc26fY6oD2hRZp4stCUQAHBxFgbPJCrKc='}
            />
        </Box>
    )
}

export default Hero
