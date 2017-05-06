/**
 * Created by Daniel on 06/05/17.
 */

const router = require('../../configuration/router');
const cn = require('../../configuration/db');

router.get('/inventory/locations/', function (req, res) {
    cn.query('SELECT * FROM locations;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/inventory/locations/', function (req, res) {
    cn.query("INSERT INTO locations (Position, Container, SubContainer) " +
        "VALUES ('" + req.body.Position + "', '" + req.body.Container + "', '" + req.body.SubContainer + "');",
        function(err, rows) {
            if (err) throw err;
            else res.json(true);
    });
});

router.get('/inventory/locations/:id', function (req, res) {
    cn.query("SELECT * FROM locations WHERE Id = "+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/inventory/locations/:id', function (req, res) {
    cn.query("UPDATE locations SET Position = '" + req.body.Position + "', Container = '" + req.body.Container + "', " +
        "SubContainer = " + req.body.SubContainer + " WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/inventory/locations/:id', function (req, res) {
    cn.query("DELETE FROM locations WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/locations/search/:text', function (req, res) {
    cn.query("SELECT * FROM locations WHERE Position LIKE '%"+ req.params.text +"%' OR " +
        "Container LIKE '%"+ req.params.text +"%' OR SubContainer LIKE '%"+ req.params.text +"%';", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

module.exports = router;
