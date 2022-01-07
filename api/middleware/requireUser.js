const express = require('express');

const requireUser = (req, res,next) => {
    // console.log(req)
    
    if(!req.user) {
    //if the req.user hasn't been set(which means a correct auth token wasn't sent in with the request)
    //send error
        next({
            name:"MissingUserError",
            message: "You must be logged in to perform this action",
            status: 401
        });
    }

    next();
}

module.exports = requireUser;