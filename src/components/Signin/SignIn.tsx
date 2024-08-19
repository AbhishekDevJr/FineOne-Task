import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

interface SignInForm {
    email: string;
    password: string;
}

const Signin: React.FC = () => {
    const { control, handleSubmit } = useForm<SignInForm>();
    const navigate = useNavigate();

    const onSubmit = (data: SignInForm) => {
        // Get users from localStorage
        const encryptedUsers = localStorage.getItem('users');
        // if (encryptedUsers) {
        //     const users = JSON.parse(CryptoJS.AES.decrypt(encryptedUsers, 'secretKey').toString(CryptoJS.enc.Utf8));

        //     // Find matching user
        //     const user = users.find((user: unknown) => user.email === data.email && user.password === data.password);
        //     if (user) {
        //         // Successful login, store user in session and redirect
        //         sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        //         navigate('/dashboard'); // Redirect to a protected route
        //     } else {
        //         alert('Invalid credentials');
        //     }
        // } else {
        //     alert('No users found');
        // }
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
