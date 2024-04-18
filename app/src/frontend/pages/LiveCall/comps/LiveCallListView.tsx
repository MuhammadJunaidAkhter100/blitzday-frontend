import React from "react";
import {
    Typography,
    Stack,
} from "@mui/material";

interface Props {
    data: {
        color?: string,
        message: string,
        time: string,
        answer: string,
    },
    index: number,
}

const LiveCallCard: React.FC<Props> = ({ data, index }) => {
    const colors: string[] = ["#5D22FE", "#34788A", "#68208A", "#8A7320"];

    const giveColor = () => {
        const colorIndex = index % colors.length;
        return colors[colorIndex]
    }

    return (
        <Stack
            gap={2}
            sx={{
                bgcolor: '#0E1016',
                borderRadius: 1,
                p: 2.5,
                pt: 2,
                height: '100%',
                border: 1,
                borderColor: '#1A1E28',
            }}
        >
            <Stack
                direction={'row'}
                gap={2}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{
                    width: '100%',
                }}
            >
                <Typography
                    variant="subtitle1"
                    color={'text.secondary'}
                >

                    <b>Question:</b> {data?.message}
                </Typography>
                <Typography
                    variant="body1"
                    color={'text.secondary'}
                >
                    {data?.time}
                </Typography>
            </Stack>
            <Stack
                direction={'row'}
                gap={1}
                sx={{
                    bgcolor: giveColor(),
                    borderRadius: 1,
                    alignItems: 'flex-start',
                    pt: 1.5,
                    pb: 2,
                    px: 2.5,
                    flexGrow: 1,
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: 20,
                    }}
                    dangerouslySetInnerHTML={{ __html: data?.answer }}
                >
                </Typography>
            </Stack>
        </Stack>
    )
}

export default LiveCallCard
