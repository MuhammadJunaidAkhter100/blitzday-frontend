import { Box, Grid } from "@mui/material";

import Header from "../../components/MainLayout/Header";
import Footer from "../../components/MainLayout/Footer";
import Graph from "./comps/Graph";
import CallsTable from "./comps/CallsTable";
import { Scrollbar } from "react-scrollbars-custom";
import { useEffect, useState } from "react";
import { getAllMeetings } from "../../utils/http";
import { Meeting } from "../../utils/interfaces";

interface Meetings {
    meetings: Meeting[]
}

const Dashboard = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        getAllMeetingsHandler();
    }, [])

    const getAllMeetingsHandler = async () => {
        const { data } = await getAllMeetings() as unknown as { data: Meetings };
        if (data?.meetings?.length > 0) {
            setMeetings(data.meetings)
        }
    }


    return (
        <>
            <Header />
            <Box sx={{
                height: 0,
                flexGrow: 1,
            }}>
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
                    <Box
                        sx={{
                            flex: 1,
                            pt: 6,
                            px: {
                                sm: 6,
                                md: 8,
                                lg: 12
                            },
                            maxWidth: 'calc(100vw - 18px)',
                            marginInline: 'auto'
                        }}
                    >
                        <Grid container spacing={3} sx={{ width: '100%' }}>
                            {/* <Grid item xs={12} lg={6}>
                                <Graph />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Graph />
                            </Grid> */}
                            <Grid item xs={12}>
                                <CallsTable meetings={meetings}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Dashboard
