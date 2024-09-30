import React from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    ip: string;
    macAddress: string;
    company: {
        item: string,
        name: string
    };
    role: string;
    password: string;
}
interface AddNewUserModalProps {
    open: boolean;
    onClose: () => void;
    setIsUserAdded: React.Dispatch<React.SetStateAction<boolean>>;
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

const AddNewUserModal: React.FC<AddNewUserModalProps> = ({ open, onClose, setIsUserAdded }) => {
    //AddNewUserModal Comp Control Variables
    const { control, handleSubmit, formState: { errors }, reset } = useForm<User>({
        defaultValues: {
            id: 0,
            firstName: '',
            lastName: '',
            age: 0,
            email: '',
            phone: '',
            ip: '',
            macAddress: '',
            company: {
                item: '',
                name: ''
            },
            role: '',
            password: ''
        },
    });

    const fieldStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '8px',
        marginBottom: '16px',
    };

    const userRegistrationApi = async (reqBody) => {
        try {
            const registeredUser = await fetch(`${import.meta.env.VITE_APP_BACK_END_URL}/user/register/`, {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });
            const registeredUserJson = await registeredUser.json();
            if (registeredUserJson?.title === 'User Created') {
                toast.success(`${registeredUserJson?.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setIsUserAdded((prevState) => !prevState);
            }
            else {
                toast.error(`${registeredUserJson?.errors?.username?.join(' ')}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        catch (e) {
            console.log('User Register Error------------------>', e);
            toast.error(`Something went wrong, Our Devs are working on it.`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    //Handles Add New User Form Submission
    const onSubmit = (data: User) => {
        userRegistrationApi({
            first_name: data?.firstName,
            last_name: data?.lastName,
            username: data?.email,
            email: data?.email,
            password: data?.password,
            profile: {
                age: data?.age,
                company: data?.company,
                phone_number: data?.phone,
                role: data?.role
            }
        });
        handleClose();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

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
                    <Typography id="confirmation-modal-title" variant="h6" component="h2">
                        Add New User
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
                                        fullWidth
                                        margin="normal"
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
                                        fullWidth
                                        margin="normal"
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
                                        type="text"
                                        fullWidth
                                        margin="normal"
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
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.email}
                                        helperText={errors.email ? errors.email.message : ""}
                                    />}
                            />
                        </Box>

                        <Box sx={fieldStyle}>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Enter a valid 10-digit phone number"
                                    }
                                }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        label="Phone"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.phone}
                                        helperText={errors.phone ? errors.phone.message : ""}
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
                                        fullWidth
                                        margin="normal"
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
                                        fullWidth
                                        margin="normal"
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
                                        fullWidth
                                        margin="normal"
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
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.role}
                                    helperText={errors.role ? errors.role.message : ""}
                                />}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                pattern: {
                                    value: /^[ A-Za-z0-9_@./#&+-]*$/,
                                    message: "Password contains invalid characters"
                                }
                            }}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password.message : ""}
                                />}
                        />

                        <Box sx={fieldStyle}>
                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default AddNewUserModal;
