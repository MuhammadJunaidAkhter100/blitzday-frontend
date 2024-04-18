import { Box, Grid, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Form } from 'antd';

import { CustomTextField } from './styles';
import { signUpHandler } from "../../utils/http";
import { ToastContainer, toast } from "react-toastify";
import { TOASTCONFIGURATION } from "../../utils/constants";

import 'react-toastify/dist/ReactToastify.css';


type FieldType = {
    email?: string;
    name?: string;
    companyName?:string;
    password?: string;
    confirm_passwored?: string;
};
const Signup: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        if (values?.password === values?.confirm_passwored) {
            const { data, error } = await signUpHandler(values) as unknown as { data: { token: string, name: string, role: string }, error: string };
            if (data) {
                localStorage.setItem('role', data.role);
                localStorage.setItem('name', data.name);
                localStorage.setItem('token', data.token);
                navigate("/dashboard");
            } else if (error) {
                toast.error(error || "Error in signing up", TOASTCONFIGURATION);
            }
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
                    Create Account
                </Typography>
                <Typography variant="subtitle1" color={'text.secondary'} fontSize={'20px'}>
                    Sign up to get started!
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
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                },
                                {
                                    type: 'email',
                                    message: 'Please provide valid email!'
                                }
                            ]}
                        >
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                placeholder="Your email"
                            />
                        </Form.Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Form.Item<FieldType>
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!'
                                },
                            ]}
                        >
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                placeholder="Your name"
                            />
                        </Form.Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Form.Item<FieldType>
                            name="companyName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your company name!'
                                },
                            ]}
                        >
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                placeholder="Company Name"
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
                        <Form.Item<FieldType>
                            name="confirm_passwored"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your confirm password!'
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <CustomTextField
                                type="password"
                                fullWidth
                                variant="outlined"
                                placeholder="Re-enter password"
                            />
                        </Form.Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit" fullWidth sx={{ height: 48 }}>
                            Sign up
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </>
    )
}

export default Signup
