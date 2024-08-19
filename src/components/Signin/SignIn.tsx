import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { decryptData } from '../../helpers/encryptData';

interface SignInForm {
    email: string;
    password: string;
}

const registeredUsers = decryptData(localStorage.getItem('registeredUsers'));

const Signin: React.FC = () => {
    const { control, handleSubmit } = useForm<SignInForm>();
    const navigate = useNavigate();

    const onSubmit = (data: SignInForm) => {
        console.log('SignIn Submit----------->', data, registeredUsers);
        if (Array.isArray(registeredUsers) && registeredUsers.some((item) => item.email === data.email)) {
            if (Array.isArray(registeredUsers) && registeredUsers.some((item) => item.password === data.password)) {
                navigate('/users');
            }
            else {
                alert('Wrong Password!');
            }
        }
        else {
            alert('Wrong Username!');
        }
    };

    return (
        <Box sx={{ width: 400, margin: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Sign In
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField {...field} label="Email" type="email" fullWidth margin="normal" />}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField {...field} label="Password" type="password" fullWidth margin="normal" />}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Sign In
                </Button>
            </form>
            <Typography variant="body2" align="left" sx={{ mt: 2 }}>
                Don't have an account?
                <Button variant="text" color="primary" onClick={() => navigate('/register')} sx={{ textTransform: 'none' }}>
                    Register Here.
                </Button>
            </Typography>
        </Box>
    );
};

export default Signin;
