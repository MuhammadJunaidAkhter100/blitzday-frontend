import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
    Stack,
    Button,
    Typography,
    Card,
    CardContent,
    CardActions,
    Divider,
    TextField,
    Avatar
} from "@mui/material";
import Header from "../../components/MainLayout/Header";
import Layout from "./Layout";
import { TOASTCONFIGURATION } from "../../utils/constants";
import { getTeamMembers, inviteTeamMember, removeTeamMembers } from "../../utils/http";


const InviteMembers: React.FC = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const [currentSelectedEmail, setCurrentSelectedEmail] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        fetchTeamMembers()
    }, [])

    const fetchTeamMembers = async () => {
        const { data, error } = await getTeamMembers() as unknown as { data: any, error: string };
        if (error) {
            toast.error(error || 'Error in fetching team members', TOASTCONFIGURATION);
            return;
        }

        setTeamMembers(data?.teamMembers || []);
    }

    const inviteHandler = async () => {
        if (!email || !name) {
            toast.error('Email or Name is required', TOASTCONFIGURATION);
            return;
        }

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setLoading(true);
            const { error } = await inviteTeamMember({ name, email }) as unknown as { error: string }
            if (error) {
                toast.error(error || 'Error in inviting team member', TOASTCONFIGURATION);
            } else {
                toast.success('Invite sent successfully', TOASTCONFIGURATION);
                setName('');
                setEmail('');
            }
            setLoading(false);
        } else {
            toast.error('Email is invalid', TOASTCONFIGURATION);
            return;
        }
    }

    const removeTeamMateHandler = async (email: string) => {
        setDeleteLoading(true);
        setCurrentSelectedEmail(email);
        const { error } = await removeTeamMembers({ email }) as unknown as { error: string };
        if (error) {
            toast.error(error || 'Error in removing team member', TOASTCONFIGURATION);
            setDeleteLoading(false);
            setCurrentSelectedEmail(null);
            return;
        }

        await fetchTeamMembers();
        toast.success("Team member removed successfully", TOASTCONFIGURATION);
        setDeleteLoading(false);
        setCurrentSelectedEmail(null);
    }

    return (
        <>
            <ToastContainer />
            <Header
                pageTitle={'Invite members'}
                hideRecorder
            />
            <Layout>
                <Card
                    sx={{
                        width: '100%',
                        maxWidth: 480,
                        marginInline: 'auto',
                        background: 'linear-gradient(180deg, #07080F 0%, #0F1116 100%)',
                        borderRadius: 2,
                        minHeight: 300,
                        border: 1,
                        borderColor: '#1A1E28',
                        boxShadow: '0 0 16px rgba(0,0,0,.1)',
                    }}
                >
                    <CardContent sx={{ pt: 6.5, pb: 5, px: 3 }}>
                        <Stack textAlign={'center'} gap={1}>
                            <Typography variant="h5" fontWeight={700}>
                                Invite members
                            </Typography>
                            <Typography variant="body1" color={'text.secondary'} fontWeight={500}>
                                start collaborating with team members or<br />share your content with anyone.
                            </Typography>
                        </Stack>
                        <Stack
                            direction={"column"}
                            gap={1}
                            sx={{
                                mt: 5,
                                mb: 4,
                                borderRadius: 1.5,
                                "&:has('.Mui-focused')": {
                                    outline: 1,
                                    outlineColor: '#5D22FE',
                                }
                            }}>
                            <TextField
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                sx={{
                                    bgcolor: '#181A1F',
                                    'fieldset': {
                                        borderColor: 'transparent',
                                        height: 48,
                                    },
                                    '.MuiInputBase-root': {
                                        backgroundColor: 'transparent',
                                        height: 48,
                                        '&:hover': {
                                            'fieldset': {
                                                borderColor: 'transparent',
                                            }
                                        },
                                        '&.Mui-focused': {
                                            'fieldset': {
                                                borderColor: 'transparent',
                                            }
                                        }
                                    }
                                }}
                            />
                            <TextField
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                sx={{
                                    bgcolor: '#181A1F',
                                    'fieldset': {
                                        borderColor: 'transparent',
                                        height: 48,
                                    },
                                    '.MuiInputBase-root': {
                                        backgroundColor: 'transparent',
                                        height: 48,
                                        '&:hover': {
                                            'fieldset': {
                                                borderColor: 'transparent',
                                            }
                                        },
                                        '&.Mui-focused': {
                                            'fieldset': {
                                                borderColor: 'transparent',
                                            }
                                        }
                                    }
                                }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    height: 48,
                                    borderRadius: 1.5,
                                }}
                                onClick={inviteHandler}
                            >
                                {loading ? 'Inviting ...' : 'Invite'}
                            </Button>
                        </Stack>

                        <Stack
                            gap={2}
                        >
                            {teamMembers?.map(({ email }, i) => (
                                <Stack
                                    direction={'row'}
                                    gap={1}
                                    alignItems={'center'}
                                    key={i}
                                >
                                    <Avatar
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '50%',
                                        }}
                                    >
                                        {email[0]}
                                    </Avatar>
                                    <Typography variant="body2" color={'text.secondary'} fontWeight={500}>
                                        {email}
                                    </Typography>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        sx={{ ml: 'auto' }}
                                        onClick={() => removeTeamMateHandler(email)}
                                    >
                                        {(currentSelectedEmail === email && deleteLoading) ? 'Removing ...' : 'Remove'}
                                    </Button>
                                </Stack>
                            ))}
                        </Stack>
                    </CardContent>
                    <Divider />
                    {/* <CardActions sx={{ p: 3, justifyContent: 'flex-end' }}>
                        <Button variant="outlined">
                            Copy link
                        </Button>
                    </CardActions> */}
                </Card>
            </Layout>
        </>
    )
}

export default InviteMembers
