const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const queryParser = require('express-query-int');
const dotenv = require('dotenv');
dotenv.config();
const server = express();
// const allowCors = require('./cors');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
// server.use(allowCors);
server.use(cors());
server.use(queryParser());

const port = process.env.PORT ? process.env.PORT : 3003;

server.listen(port, function() {
    console.log(`Backend is running on port ${port}.`);
});

module.exports = server;