import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Button style={{ fontSize: '20px' }} color="inherit" component={Link} to="/">Data Management</Button>
                </Typography>
                <Button color="inherit" component={Link} to="/users">User Data</Button>
                <Button color="inherit" component={Link} to="/cities">City Data</Button>
                <Button color="inherit" component={Link} to="/countries">Country Data</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
