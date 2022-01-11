import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputLabel, Typography } from "@mui/material";
import { Box, width } from "@mui/system";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import RoutineCard from "./RoutineCard";
import {
  fetchAllActivities,
  fetchMyRoutines,
  getMe,
  updateRoutine,
  deleteRoutine,
  createNewRoutine
} from "../API/index";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const MyRoutines = (props) => {
  const { username, password, routineId, activities, setActivities, user } = props;
  const [ userId, setUserId ] = useState(null);
  const [myRoutines, setMyRoutines] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    fetchMyRoutines().then((myRoutines) => {
      setMyRoutines(myRoutines);
    });
  }, [setMyRoutines]);

  useEffect(() => {
    getMe().then((response) => {
      console.log("ME RESPONSE", response.id);
      setUserId(response.id);
    });
  }, [setUserId]);

  console.log(userId)

  useEffect(() => {
    fetchAllActivities().then((activities) => {
      setActivities(activities);
    });
  }, [setActivities]);
  // console.log(activities)

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const response = await updateRoutine(username, password);

    if (!response) {
      alert("An unknown error occurred, please try again later.");
    } else if (response.token) {
      const token = response.token;
      console.log(token);
      if (!token) {
        return;
      }
      const user = {
        token: token,
        username: username,
      };
    } else if (response.error) {
      alert(response.error.message);
    }
  };
  const handleChange = (event) => {
    setMyRoutines(event.target.value);
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    deleteRoutine(routineId);
  };

  return (
    <Container component="main" maxWidth="false">
      <Box sx={{
        display:"flex",
        justifyContent:"center",
        mt:6,
        mb:6
      }}>
        <Avatar sx={{ bgcolor: deepOrange[500], width: 200, height: 200 }}>
          {user.username}
        </Avatar>
        
      </Box>

      <Box sx={{
        display:"flex",
        justifyContent:"center"
      }}>
      <Typography variant="h2">My Routines</Typography>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row" }}>
        { 
            myRoutines ? 
            myRoutines.map((routine) => <RoutineCard routine={routine} allActivities={activities}/>)
            : null
        }
      </Box>

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
      <Typography variant="h4">Create Your Routine</Typography>
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
            label="Routine Name"
            autoFocus
            variant="standard"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />

          <Grid item xs={12} sm={12}>
            <TextField
              name="goal"
              required
              fullWidth
              id="goal"
              label="Goal"
              variant="standard"
              value={goal}
              onChange={(e) => setGoal(e.currentTarget.value)}
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
              onClick={async (e) => {
                e.preventDefault();
                await createNewRoutine(userId, name, goal);
                fetchMyRoutines().then((myRoutines) => {
                  setMyRoutines(myRoutines);
                });
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


    
  
  );
};

export default MyRoutines;
