const express = require("express");
const activitiesRouter = express.Router();
const requireUser = require('./middleware/requireUser');
const { getPublicRoutinesByActivity } = require('../db/routines')
const {
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivity
} = require('../db/activities');


activitiesRouter.get('/', async(req,res) => {
    
    const activities = await getAllActivities();
    // console.log(activities)
    res.send({
        activities
    })
});


activitiesRouter.post('/', requireUser,async(req,res,next) => {

    const { name, description } = req.body;
    console.log("name",name)
    try{

        const activity = await createActivity({ name, description })

        res.send(
            activity
        )

    }catch ({ name, message }) {
        next({ name, message });
    }
})

// activitiesRouter.patch('/:activityId',requireUser, async(req,res,next) => {
//     const { activityId } = req.params;
//     const { name, description } = req.body;

//     const updateFields = {
//         id:activityId,
//         name:name,
//         description:description
//     }

//     const activity = await updateActivity(updateFields);

//     res.send({
//         activity
//     })

// })

activitiesRouter.get('/:activityId/routines', async(req,res,next) => {
    const { activityId } = req.params;

    try{
        const publicRoutines = await getPublicRoutinesByActivity({ id: activityId })
        
        res.send(
            publicRoutines
        )

    }catch ({ name, message }) {
    next({ name, message });
    }
})



module.exports = activitiesRouter;