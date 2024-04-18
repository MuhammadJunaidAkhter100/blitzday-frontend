import { useEffect, useState } from 'react';
import { Box, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../assets';

import Login from './Login';
import Signup from './Signup';
import VerifyToken from './VerifyToken';
import UpdatePassword from './UpdatePassword';
import ForgotPassword from './forgotPassword';

const Authentication: React.FC = () => {
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);

    const [active, setActive] = useState('login');
    const [activeEmail, setActiveEmail] = useState(null);
    const [authorizeToken, setAuthorizeToken] = useState(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');
        if (isLoggedIn) {
            navigate("/dashboard");
        } else {
            setIsReady(true);
        }
    }, [])

    return (
        <>
            {isReady && (
                <>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            py: 2,
                            pr: 3,
                            pl: 2,
                            borderBottom: 1,
                            borderColor: '#1A1E28',
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems={'center'}
                            minHeight={'41px'}
                        >
                            <Box
                                component={'img'}
                                src={Logo}
                                alt="BiltzDay.ai"
                                height={30}
                            />
                        </Stack>
                    </Box>
                    <Box
                        sx={{
                            background: 'linear-gradient(180deg, #07080F 0%, #0F1116 100%)',
                            flex: 1,
                        }}
                    >
                        <Box
                            sx={{
                                padding: 6,
                                width: '100%',
                                maxWidth: 480,
                                marginInline: 'auto',
                                background: '',
                            }}
                        >
                            <Stack spacing={5}>
                                {/* Form switch */}
                                {active === 'signup' || active === 'login' ? (
                                    <Stack
                                        direction={'row'}
                                        flexWrap={'nowrap'}
                                        sx={{
                                            bgcolor: '#181A1F',
                                            borderRadius: 1.8,
                                            padding: 1.5,
                                        }}
                                    >
                                        <Button
                                            variant={active === 'login' ? "contained" : "text"}
                                            fullWidth
                                            sx={{
                                                maxWidth: '50%',
                                                color: '#fff',
                                                fontWeight: 'bold'
                                            }}
                                            onClick={() => setActive('login')}
                                        >
                                            Login
                                        </Button>
                                        <Button
                                            variant={active === 'signup' ? "contained" : "text"}
                                            fullWidth
                                            sx={{
                                                maxWidth: '50%',
                                                color: '#fff',
                                                fontWeight: 'bold'
                                            }}
                                            onClick={() => setActive('signup')}
                                        >
                                            Sign up
                                        </Button>
                                    </Stack>
                                ) : null}
                                {active === 'login' ? (
                                    <Login setActive={setActive} />
                                ) : null}
                                {active === 'signup' ? (
                                    <Signup />
                                ) : null}
                                {active === 'forgot_password' ? (
                                    <ForgotPassword setActive={setActive} setActiveEmail={setActiveEmail} />
                                ) : null}
                                {active === 'verify_token' ? (
                                    <VerifyToken setActive={setActive} email={activeEmail} setAuthorizeToken={setAuthorizeToken} />
                                ) : null}
                                {active === 'update_password' ? (
                                    <UpdatePassword setActive={setActive} email={activeEmail} authorizeToken={authorizeToken} />
                                ) : null}
                            </Stack>
                        </Box>
                    </Box>
                </>
            )}
        </>
    )
}

export default Authentication
