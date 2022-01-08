import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box, width } from "@mui/system";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { fetchAllRoutines,createNewRoutine } from "../src/API/index";


const theme = createTheme();

const Routines = (props) => {
  const { routines, setRoutines } = props;

  useEffect(() => {
    fetchAllRoutines().then((routines) => {
        setRoutines(routines);
    });
  }, [setRoutines]);

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
          }}
        >
          <Typography fontSize="2rem">Discover Routines</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 6,
            mb: 6,
          }}
        >
          <Typography variant="h4">All Routines</Typography>
        </Box>

        <Container
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 15,
          }}
        >
          {routines
            ? routines.map((routine) => (
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {routine.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {routine.goal}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Add to My Routine
                    </Button>
                  </CardActions>
                </Card>
              ))
            : null}
          
</Container>
<Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 6,
            mb: 6,
          }}
        >
          <Typography variant="h4">Featured Routine</Typography>
          
        </Box>
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
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
              Add to My Routine
              </Button>
            </CardActions>
          </Card>


            
          
        
      </Container>
    </ThemeProvider>
  );
};

export default Routines;
