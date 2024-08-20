import React from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { User } from '../Users/Users';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/userDataSlice';

interface UserEditModalProps {
    open: boolean;
    onClose: () => void;
    user: User | null;
    onSubmit: (data: User) => void;
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

const fieldStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    marginBottom: '16px',
};

const fullWidthStyle = {
    width: '100%',
};

const halfWidthStyle = {
    width: '48%',
};

const UserEditModal: React.FC<UserEditModalProps> = ({ open, onClose, user }) => {
    const dispatch = useDispatch();
    const { control, handleSubmit, setValue } = useForm<User>({
        defaultValues: user || {
            id: 0,
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
        dispatch(updateUser(data));
        onClose();
    };

    React.useEffect(() => {
        if (user) {
            Object.keys(user).forEach(key => setValue(key as keyof User, user[key]));
        }
    }, [user, setValue]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="edit-modal-title" variant="h6" component="h2" gutterBottom>
                    Edit User
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={fieldStyle}>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => <TextField {...field} label="First Name" sx={halfWidthStyle} />}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => <TextField {...field} label="Last Name" sx={halfWidthStyle} />}
                        />
                    </Box>
                    <Box sx={fieldStyle}>
                        <Controller
                            name="age"
                            control={control}
                            render={({ field }) => <TextField {...field} label="Age" type="number" sx={halfWidthStyle} />}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <TextField {...field} label="Email" type="email" sx={halfWidthStyle} />}
                        />
                    </Box>
                    <Box sx={fieldStyle}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => <TextField {...field} label="Phone" sx={halfWidthStyle} />}
                        />
                        <Controller
                            name="ip"
                            control={control}
                            render={({ field }) => <TextField {...field} label="IP Address" sx={halfWidthStyle} />}
                        />
                    </Box>
                    <Box sx={fieldStyle}>
                        <Controller
                            name="macAddress"
                            control={control}
                            render={({ field }) => <TextField {...field} label="MAC Address" sx={halfWidthStyle} />}
                        />
                        <Controller
                            name="company"
                            control={control}
                            render={({ field }) => <TextField {...field} label="Company" sx={halfWidthStyle} />}
                        />
                    </Box>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Role" sx={fullWidthStyle} />}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default UserEditModal;
