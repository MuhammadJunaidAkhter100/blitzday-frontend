import { useState } from "react";
import { Box, Grid, Button, Typography, Stack } from "@mui/material"
import { Form } from 'antd';
import { ToastContainer, toast } from "react-toastify";

import { generatePasswordResetToken } from "../../utils/http";
import { TOASTCONFIGURATION } from "../../utils/constants";
import { CustomTextField } from './styles';

type FieldType = {
    email?: string;
};
interface Props {
    setActive: React.Dispatch<React.SetStateAction<string>>;
    setActiveEmail: React.Dispatch<React.SetStateAction<string>>
}

const ForgotPassword: React.FC<Props> = ({ setActive, setActiveEmail }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);

        const { data, error } = await generatePasswordResetToken({ email: values.email }) as unknown as { data: {}, error: string };

        if (data) {
            setActiveEmail(values.email);
            setActive('verify_token');
        } else {
            toast.error(error || "Error in generating password reset token", TOASTCONFIGURATION)
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
                    User Email
                </Typography>
                <Typography variant="subtitle1" color={'text.secondary'} fontSize={'20px'}>
                    A token will be sent via email
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
                            name={'email'}
                        >
                            <CustomTextField
                                fullWidth
                                variant="outlined"
                                placeholder="Your email or username"
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

export default ForgotPassword