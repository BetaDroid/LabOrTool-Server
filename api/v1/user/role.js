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

router.get('/user/roles/:id', function (req, res) {
    cn.query("SELECT * FROM `roles` WHERE `Id`="+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

module.exports = router;
