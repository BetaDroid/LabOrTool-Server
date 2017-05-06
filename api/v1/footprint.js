/**
 * Created by Daniel on 06/05/17.
 */

const router = require('../../configuration/router');
const cn = require('../../configuration/db');

router.get('/inventory/footprints/', function (req, res) {
    cn.query('SELECT * FROM footprints;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/inventory/footprints/', function (req, res) {
    cn.query("INSERT INTO footprints (Name, Link) " +
        "VALUES ('" + req.body.Name + "', '" + req.body.Link + "');", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/footprints/:id', function (req, res) {
    cn.query("SELECT * FROM footprints WHERE Id = "+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/inventory/footprints/:id', function (req, res) {
    cn.query("UPDATE footprints SET Name = '" + req.body.Name + "', Link = '" + req.body.Link + "' " +
        "WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/inventory/footprints/:id', function (req, res) {
    cn.query("DELETE FROM footprints WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/footprints/search/:text', function (req, res) {
    cn.query("SELECT * FROM footprints WHERE Name LIKE '%"+ req.params.text +"%';", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

module.exports = router;
