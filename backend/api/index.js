// create an api router
const express = require('express');
const app = express.Router()

const jwt = require('jsonwebtoken');
const { JWT_SECRET  = 'nevertell' } = process.env;

app.get('/health', function (req, res, next) {
  res.json({ 'message' : 'Looks good!'});
})

const userMiddleware = require('./middleware/userMiddleware')
app.use(userMiddleware);


// attach other routers from files in this api directory (users, activities...)
const usersRouter = require('./users');
app.use('/users', usersRouter);

const activitiesRouter = require('./activities');
app.use('/activities', activitiesRouter);

const routinesRouter = require('./routines');
app.use('/routines', routinesRouter);

const routinesActivityRouter = require('./routine_activities');
app.use('/routine_activities', routinesActivityRouter);

app.use((error, req, res, next) => {
  const status = error.status ? error.status : 500

  res.status(status);
  res.send({
    error: {
      name: error.name,
      message: error.message
    }
  });
});


// export the api router
module.exports ={
    app
}