import { Card, CardHeader, CardContent } from "@mui/material";

import SummaryTimeline from "./SummaryTimeline";
import { Meeting } from "../../../utils/interfaces";

const AiSummary = ({ meeting }: { meeting: Meeting }) => {

    return (
        <Card
            sx={{
                height: '100%',
                bgcolor: 'background.paper',
                border: 1,
                borderColor: '#1A1E28',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardHeader
                sx={{
                    padding: '18px 30px',
                    bgcolor: 'background.light',
                    ".MuiCardHeader-content": {
                        'span': {
                            fontSize: '20px',
                            fontWeight: 400,
                            lineHeight: 1,
                            whiteSpace: 'nowrap'
                        }
                    }
                }}
                title={'AI Summary'}
                // action={
                //     <Stack
                //         direction={'row'}
                //         alignItems={'center'}
                //         gap={2}
                //     >
                //         <Stack
                //             direction={'row'}
                //             alignItems={'center'}
                //             gap={1}
                //         >
                //             <Typography
                //                 variant="body2"
                //                 sx={{
                //                     color: '#4A5B5C'
                //                 }}
                //             >
                //                 Date:
                //             </Typography>
                //             <Chip
                //                 label="Jan 21, 2024"
                //                 variant="outlined"
                //                 sx={{
                //                     py: 1,
                //                     px: 2,
                //                     border: 1,
                //                     borderColor: 'primary',
                //                     bgcolor: 'rgba(93, 34, 254, 0.40)',
                //                     fontSize: '16px',
                //                     height: '36px',
                //                     borderRadius: 4,
                //                     ".MuiChip-label": {
                //                         opacity: 0.6,
                //                         padding: 0,
                //                         lineHeight: 1,
                //                         fontWeight: 400,
                //                     }
                //                 }}
                //             />
                //         </Stack>
                //         <Stack
                //             direction={'row'}
                //             alignItems={'center'}
                //             gap={1}
                //         >
                //             <Typography
                //                 variant="body2"
                //                 sx={{
                //                     color: '#4A5B5C'
                //                 }}
                //             >
                //                 Duration:
                //             </Typography>
                //             <Chip
                //                 label="25 mins 30 sec"
                //                 variant="outlined"
                //                 sx={{
                //                     py: 1,
                //                     px: 2,
                //                     border: 1,
                //                     borderColor: 'primary',
                //                     bgcolor: 'rgba(197, 34, 254, 0.40)',
                //                     fontSize: '16px',
                //                     height: '36px',
                //                     borderRadius: 4,
                //                     ".MuiChip-label": {
                //                         opacity: 0.6,
                //                         padding: 0,
                //                         lineHeight: 1,
                //                         fontWeight: 400,
                //                     }
                //                 }}
                //             />
                //         </Stack>
                //     </Stack>
                // }
            />
            <CardContent
                sx={{
                    padding: '22px 30px',
                    flexGrow: 1
                }}
            >
                <SummaryTimeline meeting={meeting}/>
            </CardContent>
        </Card>
    )
}

export default AiSummary
