import React, { Fragment } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavHashLink } from 'react-router-hash-link';


const theme = createTheme();

const NavBar = ({ user, handleLogout, activities,routines }) => {

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                <CssBaseline />
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                >
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Fitnesstrac-kr
                        </Typography>
                        
                        {Object.keys(user).length > 0 ?//logged in
                            <nav>
                                <NavLink
                                    to="/"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/activities"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Activities
                                </NavLink>
                                <NavLink
                                    to="/routines"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Routines
                                </NavLink>
                                <NavLink
                                    to="/myroutines"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    MyRoutines
                                </NavLink>
                            
                                <Button
                                    variant="outlined"
                                    sx={{ my: 1, mx: 1.5 }}
                                    onClick={() => {
                                        handleLogout()
                                        navigate("/")
                                    }}>
                                    Logout
                                </Button>
                            </nav>

                            :
                            <nav>
                                <NavLink
                                    to="/"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/activities"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Activities
                                </NavLink>
                                <NavLink
                                    to="/routines"
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Routines
                                </NavLink>

                                <NavHashLink to="/#signin">
                                    <Button
                                        variant="outlined"
                                        sx={{ my: 1, mx: 1.5 }}>
                                        Sign In
                                    </Button>
                                </NavHashLink>

                                <NavHashLink to="/#signin">
                                    <Button
                                        variant="outlined"
                                        sx={{ my: 1, mx: 1.5 }}>
                                        Register
                                    </Button>
                                </NavHashLink>
         
           
                            </nav>
                        }
                    </Toolbar>
                </AppBar>
            </Fragment>
        </ThemeProvider>
    );

}

export default NavBar;