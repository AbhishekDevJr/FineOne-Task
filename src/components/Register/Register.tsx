import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { decryptData, encryptData } from '../../helpers/encryptData';
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
    company: string;
    role: string;
    password: string;
}

const Register: React.FC = () => {
    //React Hook Form Variables
    const { control, handleSubmit, formState: { errors } } = useForm<User>();
    const navigate = useNavigate();

    //Handles User Register Form Submission
    const onSubmit = (data: User) => {
        const registeredUsers = decryptData(localStorage.getItem('registeredUsers'));

        if (Array.isArray(registeredUsers)) {
            const updatedRegisteredUsers = [...registeredUsers, data];
            localStorage.setItem('registeredUsers', encryptData(updatedRegisteredUsers) || '');
        }
        else {
            localStorage.setItem('registeredUsers', encryptData([data]) || '');
        }

        toast.success(`User Registered Successfully.`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setTimeout(() => navigate('/signin'), 2000);
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
            <Box sx={{ width: 600, margin: 'auto', mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                    <TextField {...field}
                                        label="Role"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.role}
                                        helperText={errors.role ? errors.role.message : ""}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                </form>
                <Typography variant="body2" align="left" sx={{ mt: 2 }}>
                    Already have an account?
                    <Button variant="text" color="primary" onClick={() => navigate('/signin')} sx={{ textTransform: 'none' }}>
                        SignIn Here.
                    </Button>
                </Typography>
            </Box>
        </>
    );
};

export default Register;
