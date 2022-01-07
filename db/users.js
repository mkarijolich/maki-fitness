const { password } = require("pg/lib/defaults");
const client = require("./client");
const bcrypt = require('bcrypt');

async function _hashPassword(password) {
    const SALT_COUNT = 10;                   
    return await bcrypt.hash(password, 10);
}

async function createUser({username,password}){//make sure to hash the password before storing it to the database
    try{

        const hashedPassword = await _hashPassword(password);
        
        const { rows:[user] } = await client.query(`
            INSERT INTO users(username,password)
            VALUES($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `,[username, hashedPassword]);
        
        delete user.password;
        return user;
    }catch(error){
        throw error;
    }
}

async function getUser({ username,password}){
   try{
        const user = await getUserByUsername(username);
        const passwordsMatch = await bcrypt.compare(password, user.password);
        
        if (passwordsMatch) {
        // return the user object (without the password)
            delete user.password;
            return user;
        } else {
        throw 'You made a mistake';
        }
    }catch(error){
        console.log("wrong password")
    }
}

async function getUserById(id){
try{
    const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE id=$1
    `, [id])

    if(!user) {
        throw "User not found."
    }
    
    delete user.password;
    return user;
}catch(error){
    throw error;
}
}

async function getUserByUsername(username){
    try{
        const { rows:[user] } = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1
        `,[username])
        console.log(user)
        return user;
    }catch(error){
        throw error;
    }
}


module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername
}
