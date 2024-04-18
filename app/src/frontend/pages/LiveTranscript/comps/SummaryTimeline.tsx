import { Typography, Box, Stack, alpha } from "@mui/material";
import { Meeting } from "../../../utils/interfaces";


const SummaryTimeline = ({ meeting }: { meeting: Meeting }) => {

    const timeline_content = [meeting.summary]

    return (
        <Stack
            gap={4}
            sx={{
                position: 'relative',
                paddingLeft: 3,
                height: "100%",
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '2px',
                    height: '100%',
                    background: 'linear-gradient(#2E3648, #2E364800)',
                    zIndex: 1,
                }
            }}
        >
            {timeline_content?.map((item, i) => (
                <Box
                    key={i}
                    sx={{
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '7px',
                            left: '-29px',
                            width: '10px',
                            height: '10px',
                            border: 1,
                            borderRadius: '50%',
                            borderColor: i === 0 ? '#9D22FE' : '#22AFFE',
                            background: () => alpha(i === 0 ? '#9D22FE' : '#22AFFE', 0.5),
                            zIndex: 2,
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-37px',
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            bgcolor: 'background.paper',
                            zIndex: 1,
                        }
                    }}
                >
                    <Typography
                        variant="body1"
                        color={'text.secondary'}
                        dangerouslySetInnerHTML={{__html: item}}
                    >
                    </Typography>
                </Box>
            ))}
        </Stack>
    );
}

export default SummaryTimeline