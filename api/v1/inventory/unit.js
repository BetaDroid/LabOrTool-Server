/**
 * Created by Daniel on 06/05/17.
 */

const router = require('../../../configuration/router');
const cn = require('../../../configuration/db');

router.get('/inventory/units/', function (req, res) {
    cn.query('SELECT * FROM units;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/inventory/units/', function (req, res) {
    cn.query("INSERT INTO units (Name, ShortName, Note) " +
        "VALUES ('" + req.body.Name + "', '" + req.body.ShortName + "', '" + req.body.Note + "');",
        function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/units/:id', function (req, res) {
    cn.query("SELECT * FROM units WHERE Id = "+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/inventory/units/:id', function (req, res) {
    cn.query("UPDATE units SET Name = '" + req.body.Name + "', ShortName = '" + req.body.ShortName + "', " +
        "Note = '" + req.body.Note + "' WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/inventory/units/:id', function (req, res) {
    cn.query("DELETE FROM units WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/units/search/:text', function (req, res) {
    cn.query("SELECT * FROM units WHERE Name LIKE '%"+ req.params.text +"%' OR " +
        "ShortName LIKE '%"+ req.params.text +"%';", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

module.exports = router;
