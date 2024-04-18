import { useEffect, useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material"
import { Form } from 'antd';
import { useNavigate } from "react-router-dom";
import Header from "../../components/MainLayout/Header"
import { CustomTextField } from './styles';
import ScrollBar from "../../components/ScrollBar";


import { Logo } from '../../../assets';
import { getCurrentUser, updateCurrentUser, updateCurrentUserPassword } from "../../utils/http";
import { ToastContainer, toast } from "react-toastify";
import { TOASTCONFIGURATION } from "../../utils/constants";

type FieldType = {
    email?: string;
    name?: string;
    password?: string;
    companyName?: string;
    confirm_passwored?: string;
    run_at_startup?: boolean;
};

const Settings: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({ email: '', name: '', companyName: '' });

    useEffect(() => {
        populateCurrentUser();
    }, [])

    const populateCurrentUser = async () => {
        const { data } = await getCurrentUser() as unknown as { data: { user: { name: string, email: string, companyName: string } } };
        if (data?.user) {
            console.log(data?.user)
            setInitialValues(data?.user);
        }
    }

    const onFinish = async (values: any) => {
        if (initialValues.email !== values?.email || initialValues.name !== values?.name || initialValues.companyName !== values?.companyName) {
            setLoading(true);
            const { data, error } = await updateCurrentUser({
                email: values?.email,
                name: values?.name,
                companyName: values?.companyName
            }) as unknown as { data: { token: string, name: string }, error: string }

            if (data) {
                setInitialValues({ email: values.email, name: values.name, companyName: values.companyName });
                setName(data?.name);
                localStorage.setItem('name', data?.name)
                localStorage.setItem('token', data?.token)
                toast.success("User updated successfully", TOASTCONFIGURATION);
            } else if (error) {
                toast.error(error || "Error in updating user", TOASTCONFIGURATION);
            }

            setLoading(false);
        }
    };

    const onFinishPasswordManagement = async (values: any) => {
        if (values?.currentPassword && values?.newPassword) {
            setPasswordLoading(true);
            const { error } = await updateCurrentUserPassword(values) as unknown as { error: string }

            if (error) {
                toast.error(error || "Error in updating user", TOASTCONFIGURATION);
            } else {
                form.resetFields();
                toast.success("Password updated successfully", TOASTCONFIGURATION);
            }
            setPasswordLoading(false);
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <ToastContainer />
            <Header
                pageTitle={'Settings'}
                userName={name}
                hideRecorder
            />
            {initialValues?.email && (
                <ScrollBar>
                    <Box
                        sx={{
                            flex: 1,
                            py: 6,
                            px: {
                                xs: 4,
                                sm: 6,
                                md: 8,
                                lg: 12
                            },
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: 578,
                                marginInline: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: 3,
                            }}
                        >
                            <Box
                                component={'img'}
                                src={Logo}
                                alt="BiltzDay.ai"
                                height={42}
                                sx={{
                                    my: 3,
                                }}
                            />
                            <Typography
                                variant="h5"
                                sx={{
                                    lineHeight: 1,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Personal Info Management
                            </Typography>
                            <Form
                                name="basic"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                requiredMark={false}
                                layout={'vertical'}
                                style={{ width: '100%' }}
                                initialValues={initialValues}
                            >
                                <Grid container>
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
                                    {/* <Grid item xs={12}>
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
                                                message: 'Please input your confirm passwored!'
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
                                            placeholder="Confirm passwored"
                                        />
                                    </Form.Item>
                                </Grid> */}
                                    <Grid item xs={12}>
                                        <Button
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                height: '62px',
                                                borderRadius: 2,
                                                mt: 2,
                                                mb: 4,
                                            }}
                                        >
                                            {loading ? 'Updating...' : 'Update'}
                                        </Button>
                                    </Grid>
                                    {/* <Grid item xs={12} container justifyContent={'flex-end'}>
                                    <Form.Item<FieldType>
                                        name="run_at_startup"
                                    >
                                        <FormControlLabel
                                            sx={{
                                                color: '#6C757D',
                                            }}
                                            control={<Switch />}
                                            label="Run at startup"
                                            labelPlacement="start"
                                        />
                                    </Form.Item>
                                </Grid> */}
                                </Grid>
                            </Form>
                            <Typography
                                variant="h5"
                                sx={{
                                    lineHeight: 1,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Security & Password Management
                            </Typography>
                            <Form
                                name="basic"
                                onFinish={onFinishPasswordManagement}
                                form={form}
                                autoComplete="off"
                                requiredMark={false}
                                layout={'vertical'}
                                style={{ width: '100%' }}
                            >
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Form.Item
                                            name="currentPassword"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input current password!'
                                                }
                                            ]}

                                        >
                                            <CustomTextField
                                                fullWidth
                                                type="password"
                                                variant="outlined"
                                                placeholder="Your Current Password"
                                            />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Form.Item
                                            name="newPassword"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input new password!'
                                                },
                                            ]}
                                        >
                                            <CustomTextField
                                                fullWidth
                                                type="password"
                                                variant="outlined"
                                                placeholder="New Password"
                                            />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Form.Item
                                            name="confirmNewPassword"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter confirm new password!'
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('newPassword') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <CustomTextField
                                                fullWidth
                                                type="password"
                                                variant="outlined"
                                                placeholder="Confirm New Password"
                                            />
                                        </Form.Item>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                height: '62px',
                                                borderRadius: 2,
                                                mt: 2,
                                                mb: 4,
                                            }}
                                        >
                                            {passwordLoading ? 'Updating ...' : 'Update'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>

                            <Grid item xs={12} sx={{ pt: 4, pb: 2 }} container justifyContent={'center'} gap={4} alignItems={'center'}>
                                <Button size={'large'} sx={{ color: '#5D22FE' }} onClick={() => navigate('/privacy-policy')}>
                                    Privacy policy
                                </Button>
                                <Typography variant="body1" sx={{ color: '#6C757D' }}>
                                    Version 1.0
                                </Typography>
                                <Button size={'large'} sx={{ color: '#5D22FE' }} onClick={() => navigate('/terms-conditions')}>
                                    Terms & Conditions
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                </ScrollBar>
            )}
        </>
    )
}

export default Settings
