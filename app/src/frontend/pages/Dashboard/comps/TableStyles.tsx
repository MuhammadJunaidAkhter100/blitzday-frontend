import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableHead as MuiTableHead } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export const TableHead = styled(MuiTableHead)(({ theme }) => ({
    backgroundColor: 'transparent',
}));

export const HeaderCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        padding: '0 16px',
        color: '#323838',
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: 500,
        whiteSpace: 'nowrap',
    }
}));

export const BodyCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        padding: '20px',
        backgroundColor: '#0E1016',
        borderTop: '1px solid #1A1E28',
        borderBottom: '1px solid #1A1E28',
        fontSize: 16,
        fontWeight: 500,
        color: theme.palette.text.primary,
        whiteSpace: 'nowrap',
        '&:first-of-type': {
            borderLeft: '1px solid #1A1E28',
            borderRadius: '16px 0 0 16px',
        },
        '&:last-of-type': {
            borderRight: '1px solid #1A1E28',
            borderRadius: '0 16px 16px 0',
        }
    }
}));

export const CustomAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
    justifyContent: 'flex-end',
    ".MuiAvatar-root": {
        border: `2px solid ${theme.palette.divider}`,
        backgroundColor: '#0E1016',
        borderRadius: '50%',
    }
}));