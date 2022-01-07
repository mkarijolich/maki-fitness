const express = require("express");
const routinesActivityRouter = express.Router();
const requireUser = require('./middleware/requireUser');

const{
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine,
    destroyRoutineActivityByRoutineId
} = require('../db/routine_activities')

routinesActivityRouter.patch('/:routineActivityId',requireUser, async(req,res,next) => {
    try{
        const { routineActivityId } = req.params;
        const { count, duration } = req.body;
    
        const updateFields = {
            id:routineActivityId,
            count:count,
            duration:duration
        }
    
        const routine = await updateRoutineActivity(updateFields);
    
        res.send({
            routine
        })
    }catch ({ name, message }) {
        next({ name, message });
    }
})

routinesActivityRouter.delete('/:routineActivityId',requireUser, async(req,res,next) => {
    try{
        const id = req.params.routineActivityId
        const routine = await destroyRoutineActivity(id);
    
        res.send({
            routine
        })
    }catch ({ name, message }) {
        next({ name, message });
    }
})



module.exports = routinesActivityRouter;