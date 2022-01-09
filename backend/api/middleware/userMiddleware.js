const jwt = require('jsonwebtoken');//To create a JSON web token using a combination of a server-side-secret and our user-supplied data
const { getUserById } = require('../../db/users');
const { JWT_SECRET } = process.env;

const userMiddleware = async (req,res, next)=> {// authentication func
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');//checking user logged in 
    console.error(req.originalUrl)
    if(!auth) {//IF: The Authorization header wasn't set -- user not logged in
        
        next();// go next middleware
    }else if(auth.startsWith(prefix)){//ELSE IF: It was set, and begins with Bearer followed by a space
        const token = auth.slice(prefix.length);//recover the token
        
        try{//On successful verify, try to read the user from the database
            const { id } = jwt.verify(token,JWT_SECRET);//recover the data

            if(id){
                req.user = await getUserById(id);//get the user from the database
                console.log("GOT USER", req.user)
                next();
            }
        }catch({ name,message }) {//We read the name and message on the error and pass it to next().
            next( {name, message });
        }
    }else {//ELSE: A user set the header, but it wasn't formed correctly. We send a name and message to next()
        next({
            name: 'AuthorizationHeaderError', 
            message: `Authorization token must start with ${ prefix }`
        });
    }
}

module.exports= userMiddleware;