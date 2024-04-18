import { useState } from 'react';
import {
    Button,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Collapse,
    Stack
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


const MobileNav = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [subMenu, setSubMenu] = useState<boolean>(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton size='small' onClick={handleDrawerOpen}>
                <MenuRoundedIcon fontSize='inherit' />
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
                sx={{
                    width: '100%',
                    flexShrink: 0,
                    zIndex: 999999,
                    '& .MuiDrawer-paper': {
                        maxWidth: '60%',
                        width: '350px',
                    },
                    '.MuiPaper-root': {
                        pt: 3,
                        pb: 1,
                        backgroundColor: 'background.default',
                        backgroundImage: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }
                }}
            >
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                        mx: 2,
                        mb: 5,
                    }}
                >
                    <Box
                        component={'img'}
                        src={'/main-logo.png'}
                        alt='BiltzDay.ai'
                        width={'180px'}
                    />
                    <IconButton size='small' onClick={handleDrawerClose}>
                        <CloseRoundedIcon fontSize='inherit' />
                    </IconButton>
                </Stack>
                <List sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                }}>
                    <ListItem sx={{ mb: 1 }} disablePadding onClick={() => setSubMenu(!subMenu)}>
                        <ListItemButton sx={{ pr: 3 }}>
                            <ListItemText primary={'Features'} />
                            <Box
                                component={'img'}
                                src={'/icons/arrow-down.svg'}
                                alt='down'
                                width={'16px'}
                                sx={{
                                    ml: 0.5,
                                    transform: subMenu ? 'rotate(180deg)' : null
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={subMenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sub menu item" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItem sx={{ mb: 1 }} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={'Resources'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ mt: 'auto', pb: 0, }}>
                        <Button variant='contained' fullWidth>
                            Login
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default MobileNav
