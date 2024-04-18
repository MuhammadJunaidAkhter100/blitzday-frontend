import { useState } from "react";
import { Box, Grid, Button, Typography, Stack } from "@mui/material"
import { Form } from 'antd';
import { ToastContainer, toast } from "react-toastify";

import { verifyPasswordResetToken } from "../../utils/http";
import { TOASTCONFIGURATION } from "../../utils/constants";
import { CustomTextField } from './styles';

type FieldType = {
    email?: string;
    token?: string;
};
interface Props {
    setActive: React.Dispatch<React.SetStateAction<string>>;
    setAuthorizeToken: React.Dispatch<React.SetStateAction<string>>
    email: string;
}

const VerifyToken: React.FC<Props> = ({ setActive, email , setAuthorizeToken }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        const { data, error } = await verifyPasswordResetToken({ email, token: values?.token }) as unknown as { data: { token: string }, error: string }

        if (data) {
            setAuthorizeToken(data?.token);
            setActive('update_password');
        } else {
            toast.error(error || "Token validation failed", TOASTCONFIGURATION);
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
                    Verify Token
                </Typography>
                <Typography variant="subtitle1" color={'text.secondary'} fontSize={'20px'}>
                    A token has been sent via email
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
                            name="token"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please provide your token!'
                                },
                            ]}
                        >
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                placeholder="Paste your token"
                            />
                        </Form.Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction={'row'} gap={2}>
                            <Button variant="outlined" onClick={() => setActive('login')} color="secondary" fullWidth sx={{ height: 48 }}>
                                Back to Login
                            </Button>
                            <Button variant="contained" type="submit" color="secondary" fullWidth sx={{ height: 48 }}>
                                {loading ? 'Verifying' : 'Verify'}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Form>
        </>
    )
}

export default VerifyToken