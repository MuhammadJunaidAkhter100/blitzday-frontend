import { TextField, styled } from "@mui/material"

export const CustomTextField = styled(TextField)(({ theme }) => ({
    'fieldset': {
        top: 0,
        borderColor: '#181A1F',
        'legend': {
            display: 'none',
        }
    },
    '.MuiInputBase-root': {
        backgroundColor: '#181A1F',
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