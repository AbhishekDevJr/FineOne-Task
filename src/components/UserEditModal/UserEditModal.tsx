import React, { useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { User } from '../Users/Users';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/userDataSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm<User>({
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

    //Handles User Edit Submission
    const onSubmit = (data: User) => {
        dispatch(updateUser(data));
        toast.success(`User Details Updated Successfully.`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        onClose();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    useEffect(() => {
        if (user) {
            Object.keys(user).forEach(key => setValue(key as keyof User, user[key]));
        }
    }, [user, setValue]);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
            />
            <Modal
                open={open}
                onClose={handleClose}
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
                                rules={{
                                    required: "First name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "First name should contain only letters"
                                    }
                                }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        label="First Name"
                                        sx={halfWidthStyle}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName ? errors.firstName.message : ""}
                                    />}
                            />
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{
                                    required: "Last name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: "Last name should contain only letters"
                                    }
                                }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        label="Last Name"
                                        sx={halfWidthStyle}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName ? errors.lastName.message : ""}
                                    />}
                            />
                        </Box>
                        <Box sx={fieldStyle}>
                            <Controller
                                name="age"
                                control={control}
                                rules={{
                                    required: "Age is required.",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Age should be a Number."
                                    }
                                }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        label="Age"
                                        type="number"
                                        sx={halfWidthStyle}
                                        error={!!errors.age}
                                        helperText={errors.age ? errors.age.message : ""}
                                    />}
                            />
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Enter a valid email"
                                    }
                                }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        label="Email"
                                        type="email"
                                        sx={halfWidthStyle}
                                        error={!!errors.email}
                                        helperText={errors.email ? errors.email.message : ""}
                                    />}
                            />
                        </Box>
                        <Box sx={fieldStyle}>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        label="Phone"
                                        sx={halfWidthStyle}
                                    />}
                            />
                            <Controller
                                name="ip"
                                control={control}
                                rules={{
                                    required: "Company Name is required"
                                }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        label="IP Address"
                                        sx={halfWidthStyle}
                                        error={!!errors.ip}
                                        helperText={errors.ip ? errors.ip.message : ""}
                                    />}
                            />
                        </Box>
                        <Box sx={fieldStyle}>
                            <Controller
                                name="macAddress"
                                control={control}
                                rules={{
                                    required: "Company Name is required"
                                }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        label="MAC Address"
                                        sx={halfWidthStyle}
                                        error={!!errors.macAddress}
                                        helperText={errors.macAddress ? errors.macAddress.message : ""}
                                    />}
                            />
                            <Controller
                                name="company"
                                control={control}
                                rules={{
                                    required: "Company Name is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9]+$/,
                                        message: "Enter a valid Company Name. Special characters are not allowed."
                                    }
                                }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        label="Company"
                                        sx={halfWidthStyle}
                                        error={!!errors.company}
                                        helperText={errors.company ? errors.company.message : ""}
                                    />}
                            />
                        </Box>
                        <Controller
                            name="role"
                            control={control}
                            rules={{
                                required: "Role Field is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message: "Enter a valid Role Value. Special characters are not allowed."
                                }
                            }}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Role"
                                    sx={fullWidthStyle}
                                    error={!!errors.role}
                                    helperText={errors.role ? errors.role.message : ""}
                                />}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default UserEditModal;
