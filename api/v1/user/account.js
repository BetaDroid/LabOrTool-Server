/**
 * Created by Daniel on 14/05/17.
 */

const router = require('../../../configuration/router');
const cn = require('../../../configuration/db');

router.get('/user/accounts/', function (req, res) {
    cn.query("SELECT `accounts`.`Id`, `accounts`.`Username`, `roles`.`Name` AS `Role`, "+
        "CASE WHEN `accounts`.`Status`=0 THEN 'Inactive' ELSE 'Active' END AS `Status`, `accounts`.`EmployeeId`"+
        "FROM `accounts` INNER JOIN `roles` ON `roles`.`Id`=`accounts`.`RoleId`;", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/user/accounts/', function (req, res) {
    cn.query("INSERT INTO `accounts` (`Username`, `Password`, `RoleId`, `Status`, `EmployeeId`) "+
        "VALUES ('"+req.body.Username+"', '"+req.body.Password+"', "+req.body.RoleId+", "+req.body.Status+
        ", '"+req.body.EmployeeId+"');",
        function(err, rows) {
            if (err) throw err;
            else res.json(true);
        });
});

router.get('/user/accounts/:id', function (req, res) {
    cn.query("SELECT * FROM `accounts` WHERE `Id`="+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/user/accounts/:id', function (req, res) {
    cn.query("UPDATE `accounts` SET `Username`='"+req.body.Name+"', `Password`='"+req.body.Password+
        ", `RoleId`="+req.body.RoleId+", `Status`="+req.body.Status+", `EmployeeId`="+req.body.EmployeeId+
        " WHERE `Id`="+req.params.id+";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/user/accounts/:id', function (req, res) {
    cn.query("DELETE FROM `accounts` WHERE `Id`="+req.params.id+";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/user/accounts/search/:text', function (req, res) {
    cn.query("SELECT `accounts`.`Username`, `roles`.`Name` AS `Role`, "+
        "CASE WHEN `accounts`.`Status`=0 THEN 'Inactive' ELSE 'Active' END AS `Status`, `accounts`.`EmployeeId`"+
        "FROM `accounts` INNER JOIN `roles` ON `roles`.`Id`=`accounts`.`RoleId` WHERE `accounts`.`Username` LIKE '%"+
        req.params.text+"%' OR `roles`.`Name` LIKE '%"+req.params.text+"%' OR `accounts`.`EmployeeId` LIKE '%"+
        req.params.text+"%';", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

module.exports = router;
