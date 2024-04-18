import * as React from 'react';
import {
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogActions
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { deleteSingleDocument } from '../../../utils/http';
import { TOASTCONFIGURATION } from '../../../utils/constants';

interface Props {
    open: boolean | string,
    handleSuccessClose?: any,
    handleFailureClose?: any
    data: any
}


const ConfirmationPopup: React.FC<Props> = ({ data, open, handleFailureClose, handleSuccessClose }) => {
    const [loading, setLoading] = React.useState(false);

    const onConfirmDeleteHandler = async () => {
        setLoading(true);
        const { error } = await deleteSingleDocument({ documentId: data?._id }) as unknown as { error: string };

        setLoading(false);
        if (error) {
            toast.error(error || "Error in deleting document", TOASTCONFIGURATION);
            handleFailureClose();
            return;
        }

        handleSuccessClose();
    }

    return (
        <>
            <ToastContainer />
            <Dialog
                fullWidth={true}
                maxWidth={'xs'}
                open={Boolean(open)}
                onClose={handleFailureClose}
                PaperProps={{
                    sx: {
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        border: 1,
                        borderColor: 'text.primary'
                    }
                }}
            >
                <DialogContent
                    sx={{
                        textAlign: 'center',
                        py: 5,
                        px: 3,
                    }}
                >
                    <Typography
                        variant='h5'
                        fontWeight={'bold'}
                        marginBottom={3}
                    >
                        Confirm delete
                    </Typography>
                    <Typography
                        color={'text.secondary'}
                    >
                        Are you sure you want to delete<br />“{data?.name}”
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        px: 3,
                        pb: 3,
                        gap: 1,
                    }}
                >
                    <Button
                        fullWidth
                        variant='outlined'
                        size='large'
                        onClick={() => handleFailureClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        size='large'
                        onClick={() => onConfirmDeleteHandler()}
                    >
                        {loading ? 'Deleting ...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmationPopup
