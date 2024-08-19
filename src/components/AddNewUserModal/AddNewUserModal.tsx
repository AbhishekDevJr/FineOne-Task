import React from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { User } from '../Users/Users';
import { useDispatch } from 'react-redux';
import { addUser } from '../../features/userDataSlice';

interface AddNewUserModalProps {
    open: boolean;
    onClose: () => void;
}

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto',
};

const AddNewUserModal: React.FC<AddNewUserModalProps> = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm<User>({
        defaultValues: {
            id: 0, // Default ID; should be handled properly (e.g., auto-increment or server-side generated)
            firstName: '',
            lastName: '',
            age: 0,
            email: '',
            phone: '',
            ip: '',
            macAddress: '',
            company: { items: {} },
            role: ''
        },
    });

    const onSubmit = (data: User) => {
        console.log('New User Data:', data);
        dispatch(addUser(data));
        onClose(); // Close the modal
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <h2>Add New User</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => <TextField {...field} label="First Name" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Last Name" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="age"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Age" type="number" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Email" type="email" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Phone" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="ip"
                        control={control}
                        render={({ field }) => <TextField {...field} label="IP Address" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="macAddress"
                        control={control}
                        render={({ field }) => <TextField {...field} label="MAC Address" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="company"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Company" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Role" fullWidth margin="normal" />}
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default AddNewUserModal;
