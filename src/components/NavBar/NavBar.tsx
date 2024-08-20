import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Popover } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { decryptData } from '../../helpers/encryptData';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoginToken } from '../../features/authSlice';
import { RootState } from '../../store/store';

const NavBar = () => {
    //NavBar Comp Control Variables
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loginToken, setLoginToken] = useState<string | undefined>(undefined);
    const loginTokenTemp = decryptData(useSelector((state: RootState) => state.auth.loginToken));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Handled Logout Button Logic
    const handleLogout = () => {
        localStorage.removeItem('loginToken');
        setLoginToken(undefined);
        dispatch(clearLoginToken());
        setAnchorEl(null);
        navigate('/signin');
    };

    //Sets Login Token State to Locally Stored Login Token on Component Mount
    useEffect(() => {
        setLoginToken(decryptData(localStorage.getItem('loginToken')));
    }, []);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Button style={{ fontSize: '20px' }} color="inherit" component={Link} to="/">Data Management</Button>
                </Typography>
                <Button color="inherit" component={Link} to="/users">User Data</Button>
                <Button color="inherit" component={Link} to="/cities">City Data</Button>
                <Button color="inherit" component={Link} to="/countries">Country Data</Button>
                {loginToken || loginTokenTemp === 'chintapakdumdum' ?
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
    );
};

export default NavBar;
