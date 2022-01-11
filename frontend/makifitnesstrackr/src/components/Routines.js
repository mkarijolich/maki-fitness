import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box} from "@mui/system";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import { fetchAllRoutines} from "../API/index";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const theme = createTheme();

const Routines = (props) => {
  const { routines, setRoutines } = props;
  const [featuredRoutine, setFeaturedRoutine] = useState({});

  useEffect(() => {
    fetchAllRoutines().then((routines) => {
      setRoutines(routines);

      const featured = routines[(routines.length * Math.random()) >> 0];
      setFeaturedRoutine(featured);
    });
  }, [setRoutines]);

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
          <Typography fontSize="2rem">Discover Routines</Typography>
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
                        sx={{backgroundColor: getRandomColor()}}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {routine.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {routine.goal} by {routine.creatorName}
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
                          {routine.activities
                            ? routine.activities.map(
                                (activity) => activity.name + "/"
                              )
                            : null}
                          :
                        </Typography>
                        <Typography paragraph>
                          Description :
                          {routine.activities
                            ? routine.activities.map(
                                (activity) => activity.description + ","
                              )
                            : null}
                        </Typography>
                        <Typography paragraph>
                          Duration :
                          {routine.activities
                            ? routine.activities.map(
                                (activity) => activity.duration + ","
                              )
                            : null}
                        </Typography>
                        <Typography paragraph>
                          Count :
                          {routine.activities
                            ? routine.activities.map(
                                (activity) => activity.count + ","
                              )
                            : null}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                ))
              : null}
          </Container>
        </Container>

        <Container 
          sx={{
            mb:6
          }}>
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
                sx={{backgroundColor: getRandomColor()}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {featuredRoutine.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {featuredRoutine.goal} by {featuredRoutine.creatorName}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default Routines;
