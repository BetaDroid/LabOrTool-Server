/**
 * Created by Daniel on 06/05/17.
 */

const router = require('../../configuration/router');
const cn = require('../../configuration/db');

router.get('/inventory/prefixes/', function (req, res) {
    cn.query('SELECT * FROM prefixes;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/inventory/prefixes/', function (req, res) {
    cn.query("INSERT INTO prefixes (Name) " +
        "VALUES ('" + req.body.Name + "');", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/prefixes/:id', function (req, res) {
    cn.query("SELECT * FROM prefixes WHERE Id = "+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/inventory/prefixes/:id', function (req, res) {
    cn.query("UPDATE prefixes SET Name = '" + req.body.Name + "' " +
        "WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/inventory/prefixes/:id', function (req, res) {
    cn.query("DELETE FROM prefixes WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/prefixes/search/:text', function (req, res) {
    cn.query("SELECT * FROM prefixes WHERE Name LIKE '%"+ req.params.text +"%';", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

module.exports = router;
