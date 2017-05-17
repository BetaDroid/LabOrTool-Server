/*
var express = require('express');
var app = express();
*/

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const api = express();
api.use(express.static('dist')); // angular 4 client position
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const distributor = require('./api/v1/inventory/distributor');
const manufacturer = require('./api/v1/inventory/manufacturer');
const location = require('./api/v1/inventory/location');
const footprint = require('./api/v1/inventory/footprint');
const category = require('./api/v1/inventory/category');
const prefix = require('./api/v1/inventory/prefix');
const unit = require('./api/v1/inventory/unit');
const component = require('./api/v1/inventory/component');
const cpt = require('./api/v1/inventory/category-param-type');
const cp = require('./api/v1/inventory/component-param');

const account = require('./api/v1/user/account');
const company = require('./api/v1/user/company');
const employee = require('./api/v1/user/employee');
const role = require('./api/v1/user/role');

const activity = require('./api/v1/activity');

api.use(distributor);
api.use(manufacturer);
api.use(location);
api.use(footprint);
api.use(category);
api.use(prefix);
api.use(unit);
api.use(component);
api.use(cpt);
api.use(cp);

api.use(account);
api.use(company);
api.use(employee);
api.use(role);

api.use(activity);

api.get('*', function(req, res){
    res.redirect('/');
});

api.listen(8081, '127.0.0.1', function () { });


