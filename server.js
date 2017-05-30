/*
var express = require('express');
var app = express();
*/

'use strict';

const express = require('express');
const api = module.exports = express();

const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./configuration/db');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({
    checkExpirationInterval: 180000, // every 3 minutes
    expiration: 1800000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'Id',
            expires: 'Expires',
            data: 'Data'
        }
    }
}, db.connection);
api.set('trust proxy', 1);
api.use(session({
    secret: 'TOPSECRET',
    name : 'sessionId',
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1800000 // 30 minutes in milliseconds
    }
}));

require('./configuration/passport')(passport);

api.use(cors());
api.disable('x-powered-by');

api.use(morgan('dev'));
api.use(express.static('dist')); // angular 4 client position
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(cookieParser());

api.use(passport.initialize());
api.use(passport.session());

const Api = require('./configuration/api');
require('.'+Api.version+'/authentication')(api, passport);

require('.'+Api.version+'/inventory/distributor')(api);
require('.'+Api.version+'/inventory/manufacturer')(api);
require('.'+Api.version+'/inventory/location')(api);
require('.'+Api.version+'/inventory/footprint')(api);
require('.'+Api.version+'/inventory/category')(api);
require('.'+Api.version+'/inventory/prefix')(api);
require('.'+Api.version+'/inventory/unit')(api);
require('.'+Api.version+'/inventory/component')(api);
require('.'+Api.version+'/inventory/category-param-type')(api);
require('.'+Api.version+'/inventory/component-param')(api);

require('.'+Api.version+'/user/account')(api);
require('.'+Api.version+'/user/company')(api);
require('.'+Api.version+'/user/employee')(api);
require('.'+Api.version+'/user/role')(api);

require('.'+Api.version+'/activity')(api);

api.get('*', function(req, res){
    res.redirect('/');
});

api.listen(8081, '127.0.0.1', function () { });


