/**
 * Created by Daniel on 14/05/17.
 */

const cn = require('../../../configuration/db');

module.exports = function(router) {

    router.get('/user/companies/', function (req, res) {
        cn.query("SELECT * FROM `companies`;", function(err, rows) {
            if (err) throw err;
            else res.json(rows);
        });
    });

    router.post('/user/companies/', function (req, res) {
        cn.query("INSERT INTO `companies` (`Name`, `Note`) " +
            "VALUES ('" + req.body.Name + "', '" + req.body.Note + "');",
            function(err, rows) {
                if (err) throw err;
                else res.json(true);
            });
    });

    router.get('/user/companies/:id', function (req, res) {
        cn.query("SELECT * FROM `companies` WHERE `Id` = " + req.params.id + ";", function(err, rows) {
            if (err) throw err;
            else res.json(rows[0]);
        });
    });

    router.put('/user/companies/:id', function (req, res) {
        cn.query("UPDATE `companies` SET `Name` = '" + req.body.Name + "', `Note` = '" + req.body.Note + "' " +
            "WHERE `Id` = " + req.params.id + ";", function(err, rows) {
            if (err) throw err;
            else res.json(true);
        });
    });

    router.delete('/user/companies/:id', function (req, res) {
        cn.query("DELETE FROM `companies` WHERE `Id` = " + req.params.id + ";", function(err, rows) {
            if (err) throw err;
            else res.json(true);
        });
    });

    router.get('/user/companies/search/:text', function (req, res) {
        cn.query("SELECT * FROM `companies` WHERE `Name` LIKE '%" + req.params.text + "%';", function(err, rows) {
            if (err) throw err;
            else res.json(rows);
        });
    });
};
