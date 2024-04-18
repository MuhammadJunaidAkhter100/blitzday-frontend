import {
    Box,
    Typography,
    Stack,
    Grid
} from "@mui/material";
import LiveTvTwoToneIcon from '@mui/icons-material/LiveTvTwoTone';
import InsightsTwoToneIcon from '@mui/icons-material/InsightsTwoTone';
import HourglassBottomTwoToneIcon from '@mui/icons-material/HourglassBottomTwoTone';
import Container from "@/components/Container";
import Card from "./comps/Card";

const CutBusyWork: React.FC = () => {

    const dummyData = [
        {
            avatar: <LiveTvTwoToneIcon fontSize="inherit" />,
            title: 'Get Live',
            subtitle: 'Recommendations through Generative AI',
            description: 'Your Salespeople don’t have to remember every datapoint or Product feature from your enablement training.'
        },
        {
            avatar: <InsightsTwoToneIcon fontSize="inherit" />,
            title: 'Actionable Insights',
            description: 'BlitzDay.AI provides call transcript, summary, next steps, action items, and sentiment analysis after each call.'
        },
        {
            avatar: <HourglassBottomTwoToneIcon fontSize="inherit" />,
            title: 'Shorter Ramp Time',
            description: "Accelerate your sales reps' ability to generate and close pipelines more efficiently than ever"
        }
    ];

    return (
        <Container>
            <Box
                sx={{
                    pt: {
                        xs: '32px',
                        md: '32px',
                        lg: '42px',
                    },
                    pb: {
                        xs: '32px',
                        md: '52px',
                        lg: '105px',
                    },
                }}
            >
                <Stack
                    gap={1.5}
                    alignItems={'center'}
                    sx={{
                        textAlign: 'center',
                        maxWidth: '700px',
                        marginInline: 'auto',
                    }}
                >
                    <Typography
                        variant="h2"
                        fontWeight={'600'}
                    >
                        Cut Busywork with <span style={{ color: '#5D22FE' }}>BlitzDay.AI</span>
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight={'100'}
                        color={'text.secondary'}
                    >
                        Reps spend 72% of their time on admin and non-selling tasks.
                    </Typography>
                </Stack>
                <Grid container spacing={3} sx={{
                    marginTop: {
                        xs: '24px',
                        md: '42px',
                        lg: '107px',
                    }
                }}>
                    {dummyData?.map((item, i) => (
                        <Grid key={i} item xs={12} md={i === 2 ? 12 : 6} lg={4}>
                            <Card {...item} />
                        </Grid>
                    ))}
                </Grid>
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    gap={3}
                    flexWrap={'wrap'}
                    sx={{
                        mt: {
                            xs: '24px',
                            md: '52px',
                            lg: '107px',
                        },
                    }}
                >
                    {['microsoft-teams', 'google-meet', 'webex'].map((item, i) => (
                        <Box
                            key={i}
                            component={'img'}
                            src={`/partners/${item}.png`}
                            alt={item}
                            sx={{
                                marginInline: 'auto',
                                height: {
                                    xs: 52,
                                    md: 72,
                                    lg: 114,
                                }
                            }}
                        />
                    ))}
                </Stack>
            </Box>
        </Container>
    )
}

export default CutBusyWork
