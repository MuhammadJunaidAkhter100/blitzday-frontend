import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Box,
    Stack,
    Avatar,
    Button,
    IconButton
} from "@mui/material";
import { East, Close } from '@mui/icons-material';

import { SupportIcon } from '../../../../assets';
import { Meeting } from "../../../utils/interfaces";

const TranscriptDetails = ({ meeting }: { meeting: Meeting }) => {
    const detailsMessage: any = meeting?.details;

    return (
        <Card
            sx={{
                height: '100%',
                bgcolor: 'background.paper',
                border: 1,
                borderColor: '#1A1E28',
                borderRadius: 3,
            }}
        >
            <CardHeader
                sx={{
                    padding: '22px 30px',
                    bgcolor: 'background.light',
                    ".MuiCardHeader-content": {
                        'span': {
                            fontSize: '20px',
                            fontWeight: 400,
                            lineHeight: 1,
                        }
                    }
                }}
                title={'Transcript details'}
            />
            <CardContent
                sx={{
                    padding: '14px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {detailsMessage?.map((item: any, i: number) => {
                    const speaker = Object.keys(item)[0];
                    let avatarKey = 'C';
                    if (speaker) {
                        avatarKey = speaker?.split(' ')[1];
                    }

                    return (
                        <Stack
                            key={i}
                            direction={'row'}
                            gap={1}
                            sx={{
                                bgcolor: '#13151D',
                                borderRadius: 3,
                                p: 1,
                                pb: 3,
                            }}
                        >
                            <Avatar
                                sx={{
                                    borderRadius: '50%',
                                    backgroundColor: !item?.client && "#34788A"
                                }}
                                src={!true && SupportIcon}
                            >
                                {avatarKey}
                            </Avatar>
                            <Box
                                sx={{
                                    width: '100%',
                                    pr: 2,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Stack
                                    direction={'row'}
                                    gap={2}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    sx={{
                                        py: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        color={!item?.client ? "#5CE2FF" : 'primary.main'}
                                        fontWeight={600}
                                    >
                                        {speaker}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color={'text.secondary'}
                                    >
                                        {item?.time}
                                    </Typography>
                                </Stack>

                                <Typography
                                    variant="body1"
                                    color={'text.secondary'}
                                >

                                    {item[speaker]}
                                </Typography>

                                {item?.view_answer ? (
                                    <Button
                                        variant="contained"
                                        size={'small'}
                                        endIcon={<East />}
                                        sx={{
                                            mt: 1,
                                            ml: 'auto',
                                            borderRadius: 5,
                                        }}
                                    >
                                        View answer
                                    </Button>
                                ) : null}
                                {item?.answer ? (
                                    <Stack
                                        direction={'row'}
                                        gap={1}
                                        sx={{
                                            bgcolor: 'primary.main',
                                            borderRadius: 3,
                                            alignItems: 'flex-start',
                                            py: 2,
                                            px: 2.5,
                                            mt: 2,
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                        >
                                            {item?.answer}
                                        </Typography>
                                        {/* <IconButton size="small">
                                        <Close />
                                    </IconButton> */}
                                    </Stack>
                                ) : null}
                            </Box>
                        </Stack>
                    )
                }
                )}
            </CardContent>
        </Card>
    )
}

export default TranscriptDetails
