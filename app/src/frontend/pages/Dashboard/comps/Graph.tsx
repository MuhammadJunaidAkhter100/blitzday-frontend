import { Card, CardHeader, CardContent, Typography } from "@mui/material";

const Graph = () => {
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
                title={'Wedget title'}
            />
            <CardContent
                sx={{
                    padding: '22px 30px',
                    minHeight: 200
                }}
            >
                <Typography
                    variant="body2"
                    color={'text.secondary'}
                >
                    Wedget here
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Graph
