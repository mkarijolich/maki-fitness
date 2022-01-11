import React, { useState } from "react";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Button, CardActionArea } from "@mui/material";
import {
  updateRoutine,
  updateRoutineActivity,
  deleteRoutineActivity,
  createRoutineActivity
} from "../API/index";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';

const RoutineCard = (props) => {
  const { routine, allActivities } = props;

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(routine.name);
  const [goal, setGoal] = useState(routine.goal);
  const [isPublic, setIsPublic] = useState(routine.isPublic);
  const [activities, setActivities] = useState(routine.activities);

  const addActivityRow = () => {
    let newActivities = [...activities];
    newActivities.push({ id: 1, count: 10, duration: 10});
    setActivities(newActivities);
  }

  const removeActivityRow = (index) => {
    let newActivities = [...activities];
    newActivities.splice(index, 1)
    setActivities(newActivities);
  }

  const setActivityId = (index, activityId) => {
    let newActivities = [...activities];
    newActivities[index]['id'] = activityId;
    setActivities(newActivities);
  }

  const setActivityCount = (index, activityCount) => {
    let newActivities = [...activities];
    newActivities[index]['count'] = activityCount;
    setActivities(newActivities);
  }

  const setActivityDuration = (index, activityDuration) => {
    let newActivities = [...activities];
    newActivities[index]['duration'] = activityDuration;
    setActivities(newActivities);
  }

  const saveChanges = async () => {
    try {
      await updateRoutine(routine.id, name, goal, isPublic) ;
      await saveActivityChanges();
    } catch (error) {
      alert("An error occurred while saving your changes.");
    }
    
    setEditMode(!editMode)
  }

  const saveActivityChanges = async () => {

    // Update previously existing activities
    routine.activities.forEach(async (originalActivity) => {
      let isFound = false;
      for (let i = 0; i < activities.length; i ++) {
        let newActivity = activities[i];
        if (originalActivity.id === newActivity.id) {
          isFound = true;
          if (originalActivity.count !== newActivity.count || originalActivity.duration !== newActivity.duration) {
            await updateRoutineActivity(originalActivity.routineActivityId, newActivity.count, newActivity.duration)
          }
          break;
        }
      }
      if (!isFound) {
        await deleteRoutineActivity(originalActivity.routineActivityId);
      }
    });

    // Update newly added activities
    activities.forEach(async (newActivity) => {
      let isFound = false;
      routine.activities.forEach(originalActivity => {
        if (newActivity.id === originalActivity.id) {
          isFound = true;
        }
      })

      if (!isFound) {
        console.log("ADDING NEW ACITIVITY", newActivity.id);
        await createRoutineActivity(routine.id, newActivity.id, newActivity.count, newActivity.duration)
      }
    })
  }

  const deleteRoutine = () => {

  }

  return (

    <Box>
      <Card>
        <CardActionArea>
          <CardContent>
            <Stack container>
              <input 
                className="editField name" 
                name="name" 
                disabled={!editMode} 
                value={name} 
                onChange={(e) => setName(e.currentTarget.value)}>
              </input>


              <input 
                className="editField goal" 
                name="goal" 
                disabled={!editMode} 
                value={goal} 
                onChange={(e) => setGoal(e.currentTarget.value)}>
              </input>

              <FormGroup>
                <FormControlLabel control={<Switch disabled={!editMode} checked={isPublic} onChange={(e) => setIsPublic(!isPublic)}/>} label="Public" />
              </FormGroup>
            </Stack>

            <Stack>
              <h2> Activities </h2>
              { 
                activities ? activities.map((activity, index) => 
                  <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Select
                      sx={{flexGrow: 5}}
                      value={activity.id}
                      label="Activity"
                      onChange={(e) => { setActivityId(index, e.target.value)}}
                    >
                      {
                        allActivities ? allActivities.map(activityOption => (
                          <MenuItem disabled={!editMode} value={activityOption.id}>{activityOption.name}</MenuItem>
                        )) : undefined
                      }
                    </Select>
                    <input 
                      className="editField count" 
                      name="goal" 
                      disabled={!editMode} 
                      value={activity.count} 
                      onChange={(e) => setActivityCount(index, e.currentTarget.value)}>
                    </input>
                    <input 
                      className="editField duration" 
                      name="goal" 
                      disabled={!editMode} 
                      value={activity.duration} 
                      onChange={(e) => setActivityDuration(index, e.currentTarget.value)}>
                    </input>
                    <Button disabled={!editMode} onClick={()=> { removeActivityRow(index)}}> X </Button>
                  </Box>

                ) : undefined
              }

              <Button
                type="submit"
                variant="text"
                disabled={!editMode}
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={() => { addActivityRow() }}
              >
                Add Activity
              </Button>
              
            </Stack>

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
                    sx={{ mt: 3, mb: 2, display: editMode ? "none" : "inlineBlock" }}
                    onClick={() => { setEditMode(!editMode); }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="submit"
                    variant="text"
                    fullWidth
                    sx={{ mt: 3, mb: 2, display: editMode ? "inlineBlock" : "none" }}
                    onClick={() => { saveChanges() }}
                  >
                    Save
                  </Button>
                  <Button
                    type="submit"
                    variant="text"
                    fullWidth
                    sx={{ mt: 3, mb: 2, display: editMode ? "inlineBlock" : "none" }}
                    onClick={ deleteRoutine() }
                  >
                    Delete
                  </Button>
                </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )};
                
export default RoutineCard;
