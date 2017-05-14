/**
 * Created by Daniel on 06/05/17.
 */

const router = require('../../../configuration/router');
const cn = require('../../../configuration/db');

router.get('/inventory/manufacturers/count/', function (req, res) {
    cn.query('SELECT COUNT(`Id`) as `nMan` FROM `manufacturers`;', function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.get('/inventory/manufacturers/', function (req, res) {
    cn.query('SELECT * FROM manufacturers;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/inventory/manufacturers/', function (req, res) {
    cn.query("INSERT INTO manufacturers (Name, Website) " +
        "VALUES ('" + req.body.Name + "', '" + req.body.Website + "');", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/manufacturers/:id', function (req, res) {
    cn.query("SELECT * FROM manufacturers WHERE Id = "+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/inventory/manufacturers/:id', function (req, res) {
    cn.query("UPDATE manufacturers SET Name = '" + req.body.Name + "', Website = '" + req.body.Website + "' " +
        "WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/inventory/manufacturers/:id', function (req, res) {
    cn.query("DELETE FROM manufacturers WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/manufacturers/search/:text', function (req, res) {
    cn.query("SELECT * FROM manufacturers WHERE Name LIKE '%"+ req.params.text +"%';", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

module.exports = router;
