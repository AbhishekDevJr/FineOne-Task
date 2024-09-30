import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Popover } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { decryptData } from '../../helpers/encryptData';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoginToken } from '../../features/authSlice';
import { RootState } from '../../store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
    //NavBar Comp Control Variables
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loginToken, setLoginToken] = useState<string | undefined>(undefined);
    const loginTokenTemp = decryptData(useSelector((state: RootState) => state.auth.loginToken));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogoutApi = async () => {
        try {
            const userLogout = await fetch(`${import.meta.env.VITE_APP_BACK_END_URL}/user/logout/`, {
                method: 'POST',
                // body: JSON.stringify(),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                credentials: 'include',
            });
            const userLogoutJson = await userLogout.json();

            if (userLogoutJson?.title === 'User Logout Successfull') {
                toast.success(`${userLogoutJson?.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                localStorage.removeItem('userAuthKey');
                setTimeout(() => navigate('/signin'), 2000);
            }
            else {
                toast.error(`${userLogoutJson?.message}`, {
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
        } catch (e) {
            console.log('User Auth Error--------------->', e)
            toast.error(`${e.message}`, {
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

    //Handled Logout Button Logic
    const handleLogout = () => {
        userLogoutApi();
    };

    //Sets Login Token State to Locally Stored Login Token on Component Mount
    useEffect(() => {
        setLoginToken(decryptData(localStorage.getItem('loginToken')) as string | undefined);
    }, []);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Button style={{ fontSize: '20px' }} color="inherit" component={Link} to="/">Data Management</Button>
                    </Typography>
                    <Button color="inherit" component={Link} to="/users">User Data</Button>
                    <Button color="inherit" component={Link} to="/cities">City Data</Button>
                    <Button color="inherit" component={Link} to="/countries">Country Data</Button>
                    {loginToken || decryptData(localStorage.getItem('userAuthKey')) === import.meta.env.VITE_APP_CLIENT_SECRET_KEY ?
                        <IconButton onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)} color="inherit">
                            <Avatar alt="Profile Picture">U</Avatar>
                        </IconButton>
                        :
                        null
                    }
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Button onClick={handleLogout} style={{ padding: '10px' }}>
                            Logout
                        </Button>
                    </Popover>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavBar;
