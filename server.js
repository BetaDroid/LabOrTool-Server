/*
var express = require('express');
var app = express();
*/

const api = require('./configuration/config');
const distributor = require('./api/v1/distributor');
const manufacturer = require('./api/v1/manufacturer');

api.use(distributor);
api.use(manufacturer);

const server = api.listen(8081, function () {
    const port = server.address().port;
    console.log("Running on port: " + port);
});


