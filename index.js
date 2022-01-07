// create the express server here
require('dotenv').config();
const { PORT = 3000 } = process.env;

const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

const cors = require('cors')
server.use(cors())

server.use(express.json());

const client = require('./db/client');
client.connect();

const { app } = require('./api/index')
server.use('/api', app);

server.listen(PORT,() => {
    console.log('The server is up on port', PORT)
});

