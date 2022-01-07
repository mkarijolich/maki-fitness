const client = require("./client")

async function getRoutineActivityById(id){
    try{
        const {rows: [routineActivity] } = await client.query(`
            SELECT *
            FROM routine_activities
            WHERE id=$1
        `,[id]) 
        // console.log(routineActivity)
        return routineActivity
    }catch(error){
        throw error;
    }
}

async function addActivityToRoutine({ routineId, activityId, count, duration}){
    const {rows: [activityToRoutine]} = await client.query(`
        INSERT INTO routine_activities ("routineId", "activityId", count, duration)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `,[routineId, activityId, count, duration])

    return activityToRoutine
}

async function updateRoutineActivity(fields = {}){
    const id = fields.id

    const filteredFields = {}
    Object.keys(fields).forEach(key => {
        if (key !== 'id') {
            filteredFields[key] = fields[key];
        }
    });

    const setString = Object.keys(filteredFields).map(
        (key, index) => `"${key}"=$${index + 1}`
      ).join(', ');

        if (setString.length === 0) {
        return;
      }

      const { rows: [routineActivity]} = await client.query(`
        UPDATE routine_activities
        SET ${setString}
        WHERE id=${id}
        RETURNING *
        `, Object.values(filteredFields));

    return routineActivity
}

async function destroyRoutineActivity(id){
    
    const {rows:[routineActivities]} = await client.query(`
    DELETE FROM routine_activities
    WHERE routine_activities.id=${id}
    RETURNING *
    `)
    // console.log(routineActivities)
    return routineActivities
}

async function destroyRoutineActivityByRoutineId(routineId){
    
    const {rows:[routineActivities]} = await client.query(`
    DELETE FROM routine_activities
    WHERE routine_activities."routineId"=${routineId}
    RETURNING *
    `)

    return routineActivities
}


async function getRoutineActivitiesByRoutine({id}){
    
    const { rows } = await client.query(`
    SELECT *
    FROM routine_activities
    WHERE "routineId"=${id}
    `)

    return rows
}

module.exports = {
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine,
    destroyRoutineActivityByRoutineId
}