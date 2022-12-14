import React, { useEffect, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box, width } from "@mui/system";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { fetchAllActivities, createNewActivity } from "../API/index"
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';


const theme = createTheme();

const Activities = (props) => {
  const { activities, setActivities, user } = props;
  const [featuredActivity, setFeaturedActivity] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchAllActivities().then((activities) => {
      setActivities(activities);

      const featured = activities[(activities.length * Math.random()) << 0];
      setFeaturedActivity(featured);
    });
  }, [setActivities]);

  let getRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="false">
        <CssBaseline />
        <Box
          sx={{
            height: "20vh",
            backgroundColor: "#6eb5b4",
            color: "white",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            pr: "20px"
          }}
        >
          <Typography fontSize="2rem">Discover Activities</Typography>
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
            <Typography variant="h4">All Activities</Typography>
          </Box>

          <Container
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 15,
            }}
          >
            {activities
              ? activities.map((activity) => (
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        sx={{backgroundColor: getRandomColor()}}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {activity.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {activity.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))
              : null}
          </Container>
        </Container>

        <Container
        sx={{
          mb: 6
        }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 6,
              mb: 6,
            }}
          >
            <Typography variant="h4">Featured Activities</Typography>
          </Box>

          <Card sx={{ maxWidth: "345" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                sx={{backgroundColor: getRandomColor()}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {featuredActivity.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {featuredActivity.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Container>

        {Object.keys(user).length > 0 ? (
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 6,
                mb: 6,
              }}
            >
              <Typography variant="h4">Create Your Activity</Typography>
            </Box>

            <Box component="form">
              <Paper>
              <Grid container spacing={2} mb={6}>
                <Grid item xs={12} sm={12} mx={6}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Activity Name"
                    autoFocus
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />

                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="description"
                      required
                      fullWidth
                      id="description"
                      label="Activity Description"
                      variant="standard"
                      value={description}
                      onChange={(e) => setDescription(e.currentTarget.value)}
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
                      onClick={(e) => {
                        e.preventDefault();
                        createNewActivity(name, description);
                        // navigate('/posts')
                      }}
                    >
                      Create!
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              </Paper>
            </Box>
          </Container>
        ) : null}
      </Container>
    </ThemeProvider>
  );
};

export default Activities;
