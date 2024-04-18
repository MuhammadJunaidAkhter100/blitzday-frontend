import { useState } from "react";
import { Box, Grid, Button, Typography, Stack } from "@mui/material"
import { Form } from 'antd';
import { ToastContainer, toast } from "react-toastify";

import { updateForgettedPassword } from "../../utils/http";
import { TOASTCONFIGURATION } from "../../utils/constants";
import { CustomTextField } from './styles';


type FieldType = {
    email?: string;
    token?: string;
    password?: string;
    confirm_passwored?: string;
};
interface Props {
    setActive: React.Dispatch<React.SetStateAction<string>>;
    authorizeToken: string;
    email: string
}

const UpdatePassword: React.FC<Props> = ({ setActive, email, authorizeToken }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        const { data, error } = await updateForgettedPassword({ newPassword: values?.password }, authorizeToken) as unknown as { data: {}, error: string }
        if (data) {
            setActive('login');
        } else {
            toast.error(error || "Error in updating user password", TOASTCONFIGURATION);
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <ToastContainer />
            <Box textAlign={'center'}>
                <Typography variant="h4">
                    New Password
                </Typography>
                <Typography variant="subtitle1" color={'text.secondary'} fontSize={'20px'}>
                    Enter your new password below.
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
                initialValues={{ email: email }}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Form.Item<FieldType>
                            name={'email'}
                        >
                            <CustomTextField
                                disabled
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
                                placeholder="New password"
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
                                    message: 'Please re-enter password!'
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered does not match!'));
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
                        <Stack direction={'row'} gap={2}>
                            <Button variant="outlined" onClick={() => setActive('login')} color="secondary" fullWidth sx={{ height: 48 }}>
                                Back to Login
                            </Button>
                            <Button variant="contained" type="submit" color="secondary" fullWidth sx={{ height: 48 }}>
                                {loading ? 'Updating' : 'Update'}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Form>
        </>
    )
}

export default UpdatePassword