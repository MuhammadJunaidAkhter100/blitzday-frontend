import {
    Stack,
    Avatar,
    Typography,
} from "@mui/material";
import { cardData } from "../utils/types";

const Card: React.FC<cardData> = ({ avatar, title, subtitle, description }) => {
    return (
        <Stack sx={{
            borderRadius: 5,
            background: 'linear-gradient(180deg, rgba(218, 253, 255, 0.1) 0%, rgba(218, 253, 255, 0) 100%)',
            padding: 4,
            paddingTop: 3,
            minHeight: '100%',
            gap: 3,
        }}>
            <Avatar
                src={(typeof avatar === 'string') ? avatar : ''}
                sx={{
                    color: 'text.primary',
                    bgcolor: 'primary.light',
                    mb: 2,
                    width: { xs: 60, lg: 100 },
                    height: { xs: 60, lg: 100 },
                    fontSize: { xs: 32, lg: 52, }
                }}
            >
                {typeof avatar !== 'string' ? avatar : ''}
            </Avatar>
            <Typography
                variant="h3"
                fontSize={40}
                fontWeight={600}
            >
                {title}
            </Typography>
            {subtitle ? (
                <Typography
                    variant="h4"
                    fontWeight={600}
                    color={'primary.light'}
                >
                    {subtitle}
                </Typography>
            ) : null}
            <Typography
                variant="h5"
                color={'text.secondary'}
            >
                {description}
            </Typography>
        </Stack>
    )
}

export default Card
