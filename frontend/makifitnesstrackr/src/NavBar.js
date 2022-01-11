import React, { Fragment } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HashLink } from 'react-router-hash-link';
import Link from '@mui/material/Link';


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
                        <Typography variant="h4" color="#006D77" noWrap sx={{ flexGrow: 1 }}>
                        Fitnesstrac-kr
                        </Typography>
                        
                        {Object.keys(user).length > 0 ?//logged in
                            <nav>
                                <Link
                                    href='/'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5}}
                                >
                                    Home
                                </Link>
                                <Link
                                    href='/activities'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ }}
                                >
                                    Activities
                                </Link>
                                <Link
                                    href='/routines'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Routines
                                </Link>
                                <Link
                                    href='/myroutines'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    MyRoutines
                                </Link>
                            
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
                                <Link
                                    href='/'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Home
                                </Link>
                                <Link
                                    href='/activities'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Activities
                                </Link>
                                <Link
                                    href='/routines'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Routines
                                </Link>

                                <HashLink to="/#signin">
                                    <Button
                                        variant="outlined"
                                        sx={{ my: 1, mx: 1.5 }}>
                                        Sign In
                                    </Button>
                                </HashLink>

                                <HashLink to="/#signin">
                                    <Button
                                        variant="outlined"
                                        sx={{ my: 1, mx: 1.5 }}>
                                        Register
                                    </Button>
                                </HashLink>
         
           
                            </nav>
                        }
                    </Toolbar>
                </AppBar>
            </Fragment>
        </ThemeProvider>
    );

}

export default NavBar;