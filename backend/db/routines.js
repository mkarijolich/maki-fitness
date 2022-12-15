const client = require("./client");
const { destroyRoutineActivityByRoutineId } = require('./routine_activities')



async function getRoutineById(id){
    try{
        const { rows: [routine]} = await client.query(`
           SELECT 
                routines.*,
                username AS "creatorName"
           FROM routines
           JOIN fitness_users ON fitness_users.id=routines."creatorId"
           WHERE routines.id=$1
        `,[id])
       
        const { rows: activities} = await client.query(`
            SELECT activities.*, count,duration, routine_activities.id as "routineActivityId"
            FROM activities
            JOIN routine_activities ON activities.id=routine_activities."activityId"
            WHERE routine_activities."routineId"=$1;
        `,[id])
        // console.log(activities)
        routine.activities=activities
       return routine;
    }catch(error){
        throw error;
    }
}

async function getRoutinesWithoutActivities(){
    try{
        const { rows:routines } = await client.query(`
            SELECT id, "creatorId", "isPublic", name, goal
            FROM routines
        `)
        // console.log(routines)
        return routines;
    }catch(error){
        throw error;
    }
}

async function getAllRoutines(){

    const {rows:allRoutines} = await client.query(`
       SELECT routines.id
       FROM routines
    `)

    console.log(await _getRoutineDetails(allRoutines))
    return await _getRoutineDetails(allRoutines)

}

async function _getRoutineDetails(allRoutines) {
    return await Promise.all(allRoutines.map(
        async routine => await getRoutineById(routine.id)
    ));
}

async function getAllPublicRoutines(){

    const {rows: allPublicRoutine } = await client.query(`
        SELECT routines.id
        FROM routines
        WHERE "isPublic"=true
        `)

        return await _getRoutineDetails(allPublicRoutine)

}

async function getAllRoutinesByUser({ username }){
    
    const {rows: allRoutines} = await client.query(`
        SELECT routines.id
        FROM routines
        JOIN fitness_users ON fitness_users.id=routines."creatorId"
        WHERE username=$1
    `,[username])

    return await _getRoutineDetails(allRoutines)  
    
}

async function getPublicRoutinesByUser({ username }){

    const {rows: allPublicRoutine} = await client.query(`
        SELECT routines.id
        FROM routines
        JOIN fitness_users ON fitness_users.id=routines."creatorId"
        WHERE "isPublic"=true
        AND username=$1
    `,[username])

    return await _getRoutineDetails(allPublicRoutine)
}

async function getPublicRoutinesByActivity({ id }){
    
    const {rows: allPublicRoutine} = await client.query(`
        SELECT routine_activities."routineId" as id
        FROM routine_activities
        JOIN routines ON routines.id=routine_activities."routineId"
        WHERE "isPublic"=true
        AND routine_activities."activityId"=$1
        `,[id])
    
    return await _getRoutineDetails(allPublicRoutine)
}


async function createRoutine({ creatorId, isPublic, name, goal }){
    try{
        const { rows:[routine]} = await client.query(`
            INSERT INTO routines( "creatorId", "isPublic", name, goal)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `,[creatorId, isPublic, name, goal])

        return await getRoutineById(routine.id);
    }catch(error){
        throw error;
    }
}

async function updateRoutine(fields = {}){
    const id = fields.id
    delete fields.id

    const setString=Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
      ).join(', ');

      if (setString.length === 0) {
        return;
      }

    const { rows: [routine]} = await client.query(`
        UPDATE routines
        SET ${setString}
        WHERE id=${id}
        RETURNING *
        `, Object.values(fields));
    // console.log(routine)
    return routine
}


async function destroyRoutine(id){
    
    await destroyRoutineActivityByRoutineId(id);

    const { rows: [routine]} = await client.query(`
        DELETE FROM routines
        WHERE routines.id=${id}
        RETURNING *
    `)
    // console.log(routine)
    return routine;
}


module.exports = {
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
}