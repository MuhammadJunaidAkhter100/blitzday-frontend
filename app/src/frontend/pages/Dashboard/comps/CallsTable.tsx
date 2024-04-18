import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import {
    Table,
    TableBody,
    Avatar,
    TableContainer,
    TableRow,
    Typography,
    Stack,
    Button,
    CircularProgress
} from '@mui/material';

import {
    TableHead,
    HeaderCell,
    BodyCell,
} from './TableStyles'

import { Meeting } from '../../../utils/interfaces';
import { getSingleMeeting } from '../../../utils/http';
import { TOASTCONFIGURATION } from '../../../utils/constants';

// Define options for formatting the date
let optionsDate = {
    month: 'long' as const,
    day: '2-digit' as const,
    year: 'numeric' as const
};

// Define options for formatting the time
let optionsTime = {
    hour: 'numeric' as const,
    minute: '2-digit' as const,
    hour12: true as const
};

const CallsTable = ({ meetings }: { meetings: Meeting[] }) => {
    const [currentlySelectedMeeting, setCurrentlySelectedMeeting] = useState(null);
    const navigate = useNavigate();

    const detailsClickHandler = async (id: string) => {
        setCurrentlySelectedMeeting(id);

        const { data, error } = await getSingleMeeting(id) as unknown as { data: { meetingTranscriptionDetails: Meeting }, error: string };
        if (error) {
            toast.error(error || "Error in getting fetching meeting information", TOASTCONFIGURATION);
            setCurrentlySelectedMeeting(null);
            return;
        }

        if (data?.meetingTranscriptionDetails) {
            navigate("/call/details", { state: { data: data?.meetingTranscriptionDetails } })
        }

        setCurrentlySelectedMeeting(null);
    }

    return (
        <>
            <ToastContainer />
            <TableContainer>
                <Table sx={{
                    width: '100%',
                    borderCollapse: 'separate',
                    borderSpacing: '0px 16px'
                }}
                    aria-label="call recordings"
                >
                    <TableHead>
                        <TableRow>
                            {['', 'Title', 'Date', 'Time', ''].map((item, i) => (
                                <HeaderCell key={i}>{item}</HeaderCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meetings?.map((meeting, i) => {
                            const date = new Date(meeting.time)?.toLocaleDateString('en-US', optionsDate);
                            const time = new Date(meeting.time)?.toLocaleTimeString('en-US', optionsTime);

                            return (
                                <TableRow key={i}>
                                    <BodyCell width={60}>
                                        <Avatar>
                                            R
                                        </Avatar>
                                    </BodyCell>
                                    <BodyCell width={'30%'}>
                                        <Typography variant='h5' sx={{ fontSize: 20 }}>
                                            {`Recording ${i + 1}`}
                                        </Typography>
                                    </BodyCell>
                                    <BodyCell>{date}</BodyCell>
                                    <BodyCell>{time}</BodyCell>
                                    {/* <BodyCell>21 min</BodyCell> */}
                                    {/* <BodyCell>
                                <CustomAvatarGroup max={4}>
                                    <Avatar alt="Remy Sharp" src={Man1} />
                                    <Avatar alt="Jhon" src={Man2} />
                                    <Avatar alt="Emaily" src={Man3} />
                                    <Avatar alt="Sapencer" src={Man1} />
                                    <Avatar alt="kepo" src={Man1} />
                                </CustomAvatarGroup>
                            </BodyCell> */}
                                    <BodyCell width={'fit-content'}>
                                        <Stack direction={'row'} justifyContent={'center'} spacing={1}>
                                            <Button sx={{ color: '#fff' }} size="small" onClick={() => detailsClickHandler(meeting._id)}>Transcript</Button>
                                            <Button sx={{ color: '#fff' }} size="small" onClick={() => detailsClickHandler(meeting._id)}>AI Summary</Button>
                                            <Button sx={{ color: '#fff' }} size="small" onClick={() => detailsClickHandler(meeting._id)}>Next Steps</Button>
                                            {currentlySelectedMeeting === meeting._id && <CircularProgress />}
                                        </Stack>
                                    </BodyCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CallsTable
