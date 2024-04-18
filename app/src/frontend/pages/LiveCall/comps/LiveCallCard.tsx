import React from "react";
import {
    Typography,
    Box,
    Stack,
    Avatar,
    IconButton
} from "@mui/material";
import { Close } from '@mui/icons-material';

interface Props {
    data: {
        color?: string,
        title: string,
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
            gap={3}
            sx={{
                bgcolor: '#0E1016',
                borderRadius: 3,
                p: 2.5,
                height: '100%',
                border: 1,
                borderColor: '#1A1E28',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 1,
                }}
            >
                <Avatar
                    sx={{
                        borderRadius: '50%',
                        width: 44,
                        height: 44,
                        backgroundColor: giveColor()
                    }}
                >
                    {index + 1}
                </Avatar>
                <Stack
                    direction={'row'}
                    gap={2}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{
                        py: 1,
                        width: '100%',
                    }}
                >
                    <Typography
                        variant="body1"
                        fontSize={20}
                        fontWeight={600}
                        sx={{
                            color: giveColor()
                        }}
                    >
                        {data?.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        color={'text.secondary'}
                    >
                        {data?.time}
                    </Typography>
                </Stack>
            </Box>
            <Typography
                variant="body1"
                color={'text.secondary'}
            >

                {data?.message}
            </Typography>
            <Stack
                direction={'row'}
                gap={1}
                sx={{
                    bgcolor: giveColor(),
                    borderRadius: 3,
                    alignItems: 'flex-start',
                    py: 2,
                    px: 2.5,
                    flexGrow: 1,
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: 24,
                    }}
                    dangerouslySetInnerHTML={{ __html: data?.answer }}
                >
                </Typography>
            </Stack>
        </Stack>
    )
}

export default LiveCallCard
