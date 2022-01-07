const express = require("express");
const routinesRouter = express.Router();
const requireUser = require('./middleware/requireUser');
const {addActivityToRoutine} = require('../db/routine_activities');
const {
    getRoutineById,
    getRoutinesWithoutActivities,
    createRoutine,
    getAllRoutines,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    updateRoutine,
    destroyRoutine
} = require('../db/routines');


routinesRouter.get('/', async(req,res) => {
    
    try{
        const routines = await getAllPublicRoutines();
        
        res.send(
            routines
        )
    }catch (error) {
        throw error;
    }
});

routinesRouter.post('/', requireUser, async(req,res,next) => {
    
    try{
        const { creatorId, isPublic, name, goal } = req.body;
        const routine = await createRoutine({ creatorId, isPublic, name, goal });
        // console.log("routineusers:", routine)
        res.send({
            routine
        })
    }catch ({ name, message }) {
        next({ name, message });
    }
});

routinesRouter.patch('/:routineId',requireUser, async(req,res,next) => {
    try{
        const { routineId } = req.params;
        const { name, goal } = req.body;
    
        const updateFields = {
            id:routineId,
            name:name,
            goal:goal
        }
    
        const routine = await updateRoutine(updateFields);
    
        res.send({
            routine
        })
    }catch ({ name, message }) {
        next({ name, message });
    }
})

routinesRouter.delete('/:routineId',requireUser, async(req,res,next) => {
    try{
        const id = req.params.routineId
        const routine = await destroyRoutine(id);
    
        res.send({
            routine
        })
    }catch ({ name, message }) {
        next({ name, message });
    }
})

routinesRouter.post('/:routineId/activities',requireUser, async(req,res,next) => {
    
    try{
        const routineId = req.params.routineId
        console.log("routineId:", routineId)
        const { activityId,count,duration} = req.body;
        const routine = await addActivityToRoutine({ routineId, activityId, count, duration})
    
        res.send({
            routine
        })
    }catch ({ name, message }) {
        next({ name, message });
    }
});





module.exports = routinesRouter;