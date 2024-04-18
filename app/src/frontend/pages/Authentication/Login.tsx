import { Box, Grid, Button, Typography, Stack } from "@mui/material"
import { Form } from 'antd';
import { useNavigate, NavLink } from "react-router-dom";

import { CustomTextField } from './styles';
import { loginHandler } from "../../utils/http";
import { TOASTCONFIGURATION } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";

type FieldType = {
    username_or_email?: string;
    password?: string;
};
interface Props {
    setActive: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<Props> = ({ setActive }) => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const { data, error } = await loginHandler({
            email: values?.username_or_email,
            password: values?.password
        }) as unknown as { data: { token: string, name: string, role: string }, error: string };
        if (data) {
            localStorage.setItem('role', data.role);
            localStorage.setItem('name', data.name);
            localStorage.setItem('token', data.token);
            navigate("/dashboard");
        } else if (error) {
            toast.error(error || "Error in log in", TOASTCONFIGURATION);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <ToastContainer />
            <Box textAlign={'center'}>
                <Typography variant="h4">
                    Welcome,
                </Typography>
                <Typography variant="subtitle1" color={'text.secondary'} fontSize={'20px'}>
                    Login to continue!
                </Typography>
            </Box>
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark={false}
                layout={'vertical'}
                style={{ width: '100%' }}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Form.Item<FieldType>
                            name={'username_or_email'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email or username!'
                                }
                            ]}
                        >
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                placeholder="Your email or username"
                            />
                        </Form.Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Form.Item<FieldType>
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                },
                            ]}
                        >
                            <CustomTextField
                                type="password"
                                fullWidth
                                variant="outlined"
                                placeholder="Your password"
                            />
                        </Form.Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit" color="secondary" fullWidth sx={{ height: 48 }}>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12} container justifyContent={'center'} sx={{ py: 2 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ fontStyle: 'italic', "&:hover": { textDecoration: 'underline' }, cursor: 'pointer' }}
                            onClick={() => setActive('forgot_password')}
                        >
                            Forgot password?
                        </Typography>
                    </Grid>
                </Grid>
            </Form>
        </>
    )
}

export default Login
