/**
 * Created by Daniel on 05/05/17.
 */

'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'labortool'
});

module.exports = connection;
