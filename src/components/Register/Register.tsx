import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { decryptData, encryptData } from '../../helpers/encryptData';

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
    const { control, handleSubmit } = useForm<User>();
    const navigate = useNavigate();

    const onSubmit = (data: User) => {
        const registeredUsers = decryptData(localStorage.getItem('registeredUsers'));
        console.log('Register Data------->', data, registeredUsers);

        if (Array.isArray(registeredUsers)) {
            const updatedRegisteredUsers = [...registeredUsers, data];
            localStorage.setItem('registeredUsers', encryptData(updatedRegisteredUsers));
        }
        else {
            localStorage.setItem('registeredUsers', encryptData([data]));
        }
        navigate('/signin');
    };

    return (
        <Box sx={{ width: 600, margin: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
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
                    name="company"
                    control={control}
                    render={({ field }) => <TextField {...field} label="Company" fullWidth margin="normal" />}
                />
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => <TextField {...field} label="Role" fullWidth margin="normal" />}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField {...field} label="Password" type="password" fullWidth margin="normal" />}
                />
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
    );
};

export default Register;
