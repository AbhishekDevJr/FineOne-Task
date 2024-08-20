import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { decryptData, encryptData } from '../../helpers/encryptData';
import { useDispatch } from 'react-redux';
import { setLoginToken } from '../../features/authSlice';

interface SignInForm {
    email: string;
    password: string;
}

const Signin: React.FC = () => {
    //SignIn Comp Control Variables
    const { control, handleSubmit } = useForm<SignInForm>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [registeredUserState, setRegisteredUserState] = useState(decryptData(localStorage.getItem('registeredUsers')));

    //Form Submission Handler
    const onSubmit = (data: SignInForm) => {
        //Checks SignIN Credentials with Locally Stores Registered User
        if (Array.isArray(registeredUserState) && registeredUserState.some((item) => item.email === data.email)) {
            if (Array.isArray(registeredUserState) && registeredUserState.some((item) => item.password === data.password)) {
                localStorage.setItem('loginToken', encryptData('chintapakdumdum') || '');
                dispatch(setLoginToken(encryptData('chintapakdumdum')));
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

    //Sets State to Registered Users Stored in LocalStorage
    useEffect(() => {
        setRegisteredUserState(decryptData(localStorage.getItem('registeredUsers')));
    }, []);

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
