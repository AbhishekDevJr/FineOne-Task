import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { decryptData, encryptData } from '../../helpers/encryptData';
import { useDispatch } from 'react-redux';
import { setLoginToken } from '../../features/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignInForm {
    email: string;
    password: string;
}

const Signin: React.FC = () => {
    //SignIn Comp Control Variables
    const { control, handleSubmit, formState: { errors } } = useForm<SignInForm>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [registeredUserState, setRegisteredUserState] = useState(decryptData(localStorage.getItem('registeredUsers')));

    const userAuthApi = async (reqBody) => {
        try {
            const userAuthData = await fetch(`${import.meta.env.VITE_APP_BACK_END_URL}/user/login/`, {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });
            const userAuthDataJson = await userAuthData.json()
            console.log('Login Res---------------->', userAuthDataJson);
        }
        catch (e) {
            console.log('User Auth Error--------------->', e)
            toast.error(`User Not Found.`, {
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

    //Form Submission Handler
    const onSubmit = (data: SignInForm) => {
        //Checks SignIN Credentials with Locally Stored Registered User
        userAuthApi({
            username: data?.email,
            password: data?.password
        })
        // if (Array.isArray(registeredUserState) && registeredUserState.some((item) => item.email === data.email)) {
        //     if (Array.isArray(registeredUserState) && registeredUserState.some((item) => item.password === data.password)) {
        //         localStorage.setItem('loginToken', encryptData(import.meta.env.VITE_APP_CLIENT_SECRET_KEY) || '');
        //         dispatch(setLoginToken(encryptData(import.meta.env.VITE_APP_CLIENT_SECRET_KEY)));
        //         toast.success(`User Successfully Authenticated.`, {
        //             position: "top-center",
        //             autoClose: 3000,
        //             hideProgressBar: true,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "dark",
        //         });
        //         setTimeout(() => navigate('/users'), 2000);
        //     }
        //     else {
        //         toast.error(`Incorrect Password.`, {
        //             position: "top-center",
        //             autoClose: 3000,
        //             hideProgressBar: true,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "dark",
        //         });
        //     }
        // }
        // else {
        //     toast.error(`User Not Found.`, {
        //         position: "top-center",
        //         autoClose: 3000,
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "dark",
        //     });
        // }
    };

    //Sets State to Registered Users Stored in LocalStorage
    useEffect(() => {
        setRegisteredUserState(decryptData(localStorage.getItem('registeredUsers')));
    }, []);

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
            <Box sx={{ width: 400, margin: 'auto', mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            <TextField {...field}
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ""}
                            />}
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
        </>
    );
};

export default Signin;
