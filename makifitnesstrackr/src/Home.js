import  React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import image from "./redd-gdQnsMbhkUs-unsplash.jpg";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";

import { login, register } from "../src/API/index"

const theme = createTheme();

const Home = (props) => {
  const { user, setUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failure, setFailure] = useState(false);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const token = await login(username, password);
    console.log(token)
    if (!token) {
      setFailure(true);
      setOpen(true);
      return;
    }
    const user = {
      token: token,
      username: username,
    };
    setUser(user);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);

    setFailure(false);
    setOpen(true);
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="false">
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            alignItems: "baseline",
            justifyContent: "center",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography variant="h2" color="white">
              Track your Life Activity
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" color="white">
              <Link href="./register">Sign Up</Link>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">
              <Link>Sign In</Link>
            </Typography>
          </Box>
        </Box>

        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 6,
              mb: 6,
            }}
          >
            <Typography variant="h4">Popular Activities</Typography>
            <Link href="./activities">
              <Typography sx={{ mt: 4 }}>see all Activity {">"} </Typography>
            </Link>
          </Box>

          <Box
            style={{
              maxHeight: "100vh",
              overflow: "auto",
              display: "flex",
              minWidth: "100%",
            }}
          >
            <Card sx={{ maxWidth: "345" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Incline Dumbbell Hammer Curl
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lie down face up on an incline bench and lift thee barbells
                    slowly upward toward chest
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Push Ups
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pretty sure you know what to do!
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    treadmill
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    running
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Container>

        <Box>
          <Box
            sx={{
              mt: 6,
              mb: 6,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Routines</Typography>
            <Link href="./routines">
              <Typography sx={{ mt: 4 }}>see all Routines {">"} </Typography>
            </Link>
          </Box>
          <Box
            style={{
              maxHeight: "100vh",
              overflow: "auto",
              display: "flex",
              minWidth: "100%",
            }}
          >
            <Card sx={{ maxWidth: "345" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Chest Day
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Work the Back and Biceps.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  See all activities
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: "345" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Cardio Day
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Running, stairs. Stuff that gets your heart pumping!
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                See all activities
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            mt: 6,
            mb: 6,
            pt: 6,
            backgroundColor: "#4d4f4f",
          }}
        >
          <Box><a id="signin">
            <Typography variant="h5" sx={{ color: "white" }} >
              Sign In
            </Typography></a>
            <Box component="form" sx={{ color: "white" }}>
              <Grid container spacing={2}>
                <Grid Grid item xs={12} sm={12}>
                  <TextField
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                  />

                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="password"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      variant="standard"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    variant="text"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLoginSubmit}
                  >
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ color: "white" }}>
              Sign Up
            </Typography>
            <Box component="form">
              <Grid container spacing={2}>
                <Grid Grid item xs={12} sm={12}>
                  <TextField
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    variant="standard"
                    // value={username}
                    // onChange={(e) => setUsername(e.currentTarget.value)}
                  />

                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="password"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      variant="standard"
                      // value={password}
                      // onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    variant="text"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    // onClick={handleRegisterSubmit}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
