/**
 * Created by Daniel on 05/05/17.
 */

const router = require('../../configuration/router');
const cn = require('../../configuration/db');

router.get('/inventory/distributors/', function (req, res) {
    cn.query('SELECT * FROM distributors;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/inventory/distributors/', function (req, res) {
    cn.query("INSERT INTO distributors (Name, Website) " +
        "VALUES ('" + req.body.Name + "', '" + req.body.Website + "');", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/distributors/:id', function (req, res) {
    cn.query("SELECT * FROM distributors WHERE Id = "+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/inventory/distributors/:id', function (req, res) {
    cn.query("UPDATE distributors SET Name = '" + req.body.Name + "', Website = '" + req.body.Website + "' " +
        "WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/inventory/distributors/:id', function (req, res) {
    cn.query("DELETE FROM distributors WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

module.exports = router;
