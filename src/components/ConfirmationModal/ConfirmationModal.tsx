import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName: string;
}

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose, onConfirm, userName }) => {
    //ConfirmationModal Comp Control Variables
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="confirmation-modal-title"
            aria-describedby="confirmation-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="confirmation-modal-title" variant="h6" component="h2">
                    Delete User
                </Typography>
                <Typography id="confirmation-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete user <span style={{ fontWeight: '600' }}>{userName}</span>?
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="secondary" onClick={onConfirm} style={{ marginRight: '8px' }}>
                        Confirm
                    </Button>
                    <Button variant="contained" color="primary" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ConfirmationModal;
