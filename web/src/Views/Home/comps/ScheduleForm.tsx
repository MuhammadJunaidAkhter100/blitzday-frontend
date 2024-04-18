"use client";

import { Grid, Box, TextField, Button, styled } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
    height: '48px',
    'fieldset': {
        height: '48px',
        top: 0,
        borderColor: '#181A1F',
        'legend': {
            display: 'none',
        }
    },
    '.MuiInputBase-root': {
        height: '48px',
        'input': {
            height: '100%',
        },
        backgroundColor: '#181A1F',
        fontSize: '14px',
        '&:hover': {
            'fieldset': {
                borderColor: '#1A1E28',
            }
        },
        '&.Mui-focused': {
            'fieldset': {
                borderColor: theme.palette.primary.main,
            }
        }
    }
}));

const ScheduleForm: React.FC = () => {
    return (
        <Box sx={{
            width: '100%',
            maxWidth: 388,
            marginInline: 'auto',
            mt: {
                xs: '24px',
                lg: '50px',
            }
        }}>
            <Grid container spacing={2.5}>
                <Grid item xs={12}>
                    <CustomTextField fullWidth placeholder="Your email" />
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField fullWidth placeholder="Your name" />
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField fullWidth placeholder="Company name" />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ScheduleForm
