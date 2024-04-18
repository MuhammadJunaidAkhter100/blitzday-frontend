import {
    Box,
    Grid,
    Typography,
} from '@mui/material';

import Container from '@/components/Container';

const Footer: React.FC = () => {
    return (
        <Box>
            <Container>
                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        container
                        alignItems={'center'}
                        sx={{
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                            minHeight: 100,
                        }}
                    >
                        <Box
                            component={'img'}
                            src={'/main-logo.png'}
                            alt='BiltzDay.ai'
                            width={'180px'}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        container
                        alignItems={'center'}
                        sx={{
                            justifyContent: { xs: 'center', sm: 'flex-end' },
                            minHeight: 100,
                        }}
                    >
                        <Typography
                            variant='body1'
                            color={'text.secondary'}
                            sx={{
                                fontSize: { lg: 16 },
                            }}
                        >
                            All right reserved
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer
