/**
 * Created by Daniel on 14/05/17.
 */

const router = require('../../../configuration/router');
const cn = require('../../../configuration/db');

router.get('/user/roles/', function (req, res) {
    cn.query("SELECT * FROM `roles`;", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/user/roles/', function (req, res) {
    cn.query("INSERT INTO `roles` (Name, System) " +
        "VALUES ('" + req.body.Name + "', " + req.body.System + ");",
        function(err, rows) {
            if (err) throw err;
            else res.json(true);
        });
});

router.get('/user/roles/:id', function (req, res) {
    cn.query("SELECT * FROM `roles` WHERE `Id` = "+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/user/roles/:id', function (req, res) {
    cn.query("UPDATE `roles` SET `Name` = '" + req.body.Name + "', System = " + req.body.System +
        " WHERE `Id` = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/user/roles/:id', function (req, res) {
    cn.query("DELETE FROM `roles` WHERE `Id` = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/user/roles/search/:text', function (req, res) {
    cn.query("SELECT * FROM `roles` WHERE `Name` LIKE '%"+ req.params.text +"%';", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

module.exports = router;
