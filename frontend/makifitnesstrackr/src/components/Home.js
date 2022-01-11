import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import image from "../redd-gdQnsMbhkUs-unsplash.jpg";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { Button, CardActionArea, CardActions } from "@mui/material";
import '../App.css';


import { login, register } from "../API/index";

const theme = createTheme();

const Home = (props) => {
  const { user, setUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("logging in with username + password ", username, password);
    const response = await login(username, password);

    if (!response) {
      alert("An unknown error occurred, please try again later.");
    }

    else if (response.token) {
      const token = response.token;
      console.log(token);
      if (!token) {
        return;
      }
      const user = {
        token: token,
        username: username,
      };
      
      setUser(user);
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);

      navigate("/myroutines");
    } else if (response.error) {
      alert(response.error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const response = await register(username, password);

    if (!response) {
      alert("An unknown error occurred, please try again later.");

     }else if (response.token) {
        const token = response.token;
        console.log(token);
        if (!token) {
          return;
        }
        const user = {
          token: token,
          username: username,
        };

        setUser(user);
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        console.log("newusername", username);

        navigate("/");
      } else if (response.error) {
        alert(response.error.message);
      }
    }
  

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let getRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);
  
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
                  sx={{backgroundColor: getRandomColor()}}

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
            </Card>

            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  sx={{backgroundColor: getRandomColor()}}
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
            </Card>

            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  sx={{backgroundColor: getRandomColor()}}
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
            </Card>
          </Box>
        </Container>

        <Container>
          <Box sx={{ mb: 6 }}>
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
                    sx={{backgroundColor: getRandomColor()}}
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
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      Incline Dumbbell Hammer Curl/Incline Dumbbell Hammer Curl:
                    </Typography>
                    <Typography paragraph>
                      Lie down face up on an incline bench and lift thee
                      barbells slowly upward toward chest,Lie down face up on an
                      incline bench and lift thee barbells slowly upward toward
                      chest
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>

              <Card sx={{ maxWidth: "345" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    sx={{backgroundColor: getRandomColor()}}
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
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Push Ups/Push Ups/:</Typography>
                    <Typography paragraph>
                      Pretty sure you know what to do!,Pretty sure you know what
                      to do!
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Box>
          </Box>

        { !user.token ? 
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              mt: 6,
              mb: 6,
              pt: 6,
              backgroundColor: "#FFDDD2",
            }}
          >
            <Box>
              <a id="signin">
                <Typography variant="h4" sx={{ color: "white" }}>
                  Sign In / Sign Up
                </Typography>
              </a>
              <Box component="form" sx={{ color: "white" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="Username"
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      
                      <Button
                        type="submit"
                        variant="text"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLoginSubmit}
                      >
                        Log In
                      </Button>
                      <Button
                        type="submit"
                        variant="text"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleRegisterSubmit}
                      >
                        Register
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box> : null }
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
