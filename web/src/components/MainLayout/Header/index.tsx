'use client'
import {
    Stack,
    Box,
    Button,
    useMediaQuery
} from '@mui/material';
import Container from '@/components/Container';
import MobileNav from './MobileNav';

const Header: React.FC = () => {
    const mobile = useMediaQuery('(max-width:992px)');

    return (
        <Box sx={{
            width: '100%',
            overflow: 'hidden',
            position: 'sticky',
            left: 0,
            top: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(20px)',
            zIndex: 99999,
        }}>
            <Container>
                <Stack
                    direction={'row'}
                    gap={3}
                    paddingY={mobile ? 2 : 3}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Box
                        component={'img'}
                        src={'/main-logo.png'}
                        alt='BiltzDay.ai'
                        width={'180px'}
                    />
                    {/* {mobile ? (
                        <MobileNav />
                    ) : (
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            gap={3}
                        >

                            <Stack
                                direction={'row'}
                                alignItems={'center'}
                                gap={2}
                            >
                                <Button
                                    variant='text'
                                    endIcon={
                                        <Box
                                            component={'img'}
                                            src={'/icons/arrow-down.svg'}
                                            alt='down'
                                            width={'18px'}
                                            sx={{ ml: 0.5 }}
                                        />
                                    }
                                >
                                    Features
                                </Button>
                                <Button
                                    variant='text'
                                >
                                    Resources
                                </Button>
                            </Stack>
                            <Button
                                variant='contained'
                            >
                                Login
                            </Button>
                        </Stack>
                    )
                    } */}
                </Stack >
            </Container >
        </Box >
    )
}

export default Header
