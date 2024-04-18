import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { Meeting } from "../../../utils/interfaces";


const NextSteps = ({ meeting }: { meeting: Meeting }) => {

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
                title={'Next Steps'}
            />
            <CardContent
                sx={{
                    padding: '22px 30px',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: '20px',
                        fontWeight: 400,
                    }}
                >
                    Steps
                </Typography>
                <Typography
                    variant="body1"
                    color={'text.secondary'}
                    sx={{
                        mb: 2,
                    }}
                    dangerouslySetInnerHTML={{__html: meeting.nextSteps}}
                >
                </Typography>
            </CardContent>
        </Card>
    )
}

export default NextSteps
