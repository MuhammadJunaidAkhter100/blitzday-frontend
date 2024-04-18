import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    IconButton,
    Stack,
    Avatar,
    Grid,
    Menu,
    MenuItem,
    styled,
    Button
} from "@mui/material"
import {
    ArrowBack,
    MoreHoriz,
    RadioButtonChecked
} from '@mui/icons-material';
import { Logo } from '../../../assets';
import { menuRoutes, teamMenuRoutes } from './routes';

const CustomMenu = styled(Menu)(() => ({
    ".MuiPaper-root": {
        borderColor: '#1A1E28',
        paddingInline: 8,
    }
}));
const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: 8,
    color: theme.palette.text.primary,
    marginBlock: 4,
    fontSize: 20,
    fontWeight: 400,
    '&.active': {
        backgroundColor: theme.palette.primary.main
    }
}));

interface HeaderProps {
    userName?: string
    exrtaComponent?: JSX.Element,
    pageTitle?: string,
    stopRecordingText?: string
    hideRecorder?: boolean,
    hideRecordingButton?: boolean
    stopCall?: () => void
    startCall?: () => void
}


const Header = ({ pageTitle, exrtaComponent, userName, stopCall, startCall, stopRecordingText, hideRecordingButton = false }: HeaderProps) => {
    const navigate = useNavigate();
    const name = (userName || localStorage?.getItem('name') || 'Blitz')[0];
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const options = (localStorage?.getItem('role') === 'teamMember' ? teamMenuRoutes : menuRoutes);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const recordingStartHandler = () => {
        navigate('/call');
    }

    return (
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
                <Grid container spacing={4}>
                    <Grid item xs={4} container alignItems={'center'}>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems={'center'}
                        >
                            {pageTitle ? (<>
                                <IconButton onClick={() => navigate(-1)}>
                                    <ArrowBack
                                        fontSize="inherit"
                                    />
                                </IconButton>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        lineHeight: 1,
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {pageTitle}
                                </Typography>
                            </>) : (
                                <Box
                                    component={'img'}
                                    src={Logo}
                                    alt="BiltzDay.ai"
                                    height={30}
                                />
                            )}
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                        gap={2}
                    >
                        {exrtaComponent ? exrtaComponent : null}
                        {!hideRecordingButton &&
                            <Button
                                variant="contained"
                                size={'small'}
                                sx={{ whiteSpace: 'nowrap' }}
                                startIcon={<RadioButtonChecked fontSize="large" />}
                                onClick={startCall || recordingStartHandler}
                            >
                                Start Recording
                            </Button>
                        }

                        {stopCall ? (
                            <Button
                                variant="contained"
                                size={'small'}
                                sx={{ whiteSpace: 'nowrap' }}
                                startIcon={<RadioButtonChecked fontSize="large" />}
                                onClick={stopCall}
                            >
                                {stopRecordingText || 'Stop Recording'}
                            </Button>
                        ) : null}

                    </Grid>
                    <Grid
                        item
                        xs={4}
                        container
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                        gap={2}
                    >
                        <IconButton onClick={handleClick}>
                            <MoreHoriz
                                fontSize="inherit"
                            />
                        </IconButton>
                        <Avatar>
                            {name}
                        </Avatar>
                    </Grid>
                </Grid>
            </Box>
            <CustomMenu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'user-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {options?.map(({ label, path }, i) => (
                    <NavLink key={i} to={path} onClick={label === 'Sign Out' ? () => localStorage.clear() : () => { }}>
                        {({ isActive }) => (
                            <CustomMenuItem className={isActive ? 'active' : ''}>{label}</CustomMenuItem>
                        )}
                    </NavLink>
                ))}
            </CustomMenu>
        </>
    )
}

export default Header
