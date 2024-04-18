import { Box, Grid } from "@mui/material";

import Header from "../../components/MainLayout/Header";
import Footer from "../../components/MainLayout/Footer";
// Cards
import NextSteps from "./comps/NextSteps";
import AiSummary from "./comps/AiSummary";
import TranscriptDetails from "./comps/TranscriptDetails";
import ScrollBar from "../../components/ScrollBar";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";


const LiveTranscript = () => {
    const location = useLocation();
    const data = location.state?.data;

    const [loading, setLoading] = useState(true);
    const [meeting, setMeeting] = useState(null);

    useEffect(() => {
        if (data) {
            setMeeting(data);
            setLoading(false);
        }
    }, [data])

    return (<>
        <Header
            pageTitle={`Recording `}
        />
        <ScrollBar>
            <Box
                sx={{
                    flex: 1,
                    py: 6,
                    px: {
                        sm: 6,
                        md: 8,
                        lg: 12
                    },
                    display: 'flex',
                }}
            >
                {!loading && (
                    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                        <Grid item sm={12} md={12} lg={4.5}>
                            <TranscriptDetails meeting={meeting} />

                        </Grid>
                        <Grid item sm={12} md={6} lg={4.5}>
                            <AiSummary meeting={meeting} />
                        </Grid>
                        <Grid item sm={12} md={6} lg={3}>
                            <NextSteps meeting={meeting} />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </ScrollBar>
        <Footer />
    </>
    )
}

export default LiveTranscript
