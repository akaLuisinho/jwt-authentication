const express = require('express');
const routes = require('./routes')

const server = express();

server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(routes.router);

server.listen(2000)