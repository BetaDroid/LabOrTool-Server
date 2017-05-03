var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'labortool'
});

app.use(bodyParser.json());

var api = '/api/v1';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get(api + '/inventory/distributors/', function (req, res, next) {
    connection.query('SELECT * FROM distributors;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

app.get(api + '/inventory/manufacturers/', function (req, res, next) {
    connection.query('SELECT * FROM manufacturers;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

app.get(api + '/users/', function (req, res) {
    connection.query('SELECT * FROM users AS Users;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

app.post(api + '/users/', function (req, res) {
    var user = req.body;
    var query = "INSERT INTO users (Username, Password) VALUES ('" + user.Username + "', '" + user.Password + "');";
    connection.connect();
    connection.query(query, function(err, rows) {
        if (err) throw err;
    });
    connection.end();
    res.send(true);
});


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Running at: http://" + host + ":" + port);
});