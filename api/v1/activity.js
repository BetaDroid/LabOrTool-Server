/**
 * Created by Daniel on 14/05/17.
 */

const router = require('../../configuration/router');
const cn = require('../../configuration/db');

router.get('/activities/', function (req, res) {
    cn.query("SELECT `activities`.`Id`, `activities`.`Title`, `activities`.`WorkCode`, `priorities`.`Name` AS `Priority`, "+
        "`activities`.`Deadline`, `statuses`.`Name` AS `Status`, `types`.`Name` AS `Type`, "+
        "CONCAT(`employees`.`Name`, ' ', `employees`.`Surname`) AS `Employee` FROM `activities`"+
        "INNER JOIN `priorities` ON `priorities`.`Id`=`activities`.`PriorityId` "+
        "INNER JOIN `statuses` ON `statuses`.`Id`=`activities`.`StatusId` "+
        "INNER JOIN `types` ON `types`.`Id`=`activities`.`TypeId` "+
        "INNER JOIN `employees` ON `employees`.`Id`=`activities`.`EmployeeId`;", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/activities/', function (req, res) {
    cn.query("INSERT INTO `activities` (`Title`, `WorkCode`, `PriorityId`, `Deadline`, `StatusId`, `TypeId`, "+
        "`EmployeeId`, `Description`, `Editable`) VALUES ('"+req.body.Title+"', '"+req.body.Workcode+"', "+
        req.body.PriorityId+", DATE('"+req.body.Deadline+"'), "+req.body.StatusId+", "+req.body.TypeId+", "+
        req.body.EmployeeId+", '"+req.body.Description+"', "+req.body.Editable+");", function(err, rows) {
            if (err) throw err;
            else res.json(true);
        });
});

router.get('/activities/:id', function (req, res) {
    cn.query("SELECT * FROM `activities` WHERE `Id`="+req.params.id+";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/activities/:id', function (req, res) {
    cn.query("UPDATE `activities` SET `Title`='"+req.body.Title+"', `WorkCode`='"+req.body.Workcode+"', `PriorityId`="+
        req.body.PriorityId+", `Deadline`=DATE('"+req.body.Deadline+"'), `StatusId`="+req.body.StatusId+", `TypeId`="+
        req.body.TypeId+", `EmployeeId`="+req.body.EmployeeId+", `Description`='"+req.body.Description+"', `Editable`="+
        req.body.Editable+" WHERE `Id`="+req.params.id+";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/activities/:id', function (req, res) {
    cn.query("DELETE FROM `activities` WHERE `Id`="+req.params.id+";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/activities/search/:text', function (req, res) {
    cn.query("SELECT `activities`.`Id`, `activities`.`Title`, `activities`.`WorkCode`, `priorities`.`Name` AS `Priority`, "+
        "`activities`.`Deadline`, `statuses`.`Name` AS `Status`, `types`.`Name` AS `Type`, "+
        "CONCAT(`employees`.`Name`, ' ', `employees`.`Surname`) AS `Employee` FROM `activities`"+
        "INNER JOIN `priorities` ON `priorities`.`Id`=`activities`.`PriorityId` "+
        "INNER JOIN `statuses` ON `statuses`.`Id`=`activities`.`StatusId` "+
        "INNER JOIN `types` ON `types`.`Id`=`activities`.`TypeId` "+
        "INNER JOIN `employees` ON `employees`.`Id`=`activities`.`EmployeeId` WHERE `activities`.`Title` LIKE '%"+
        req.params.text+"%' OR `activities`.`WorkCode` LIKE '%"+req.params.text+"%' OR `priorities`.`Name` LIKE '%"+
        req.params.text+"%' OR `activities`.`Deadline` LIKE '%"+req.params.text+"%' OR `statuses`.`Name` LIKE '%"+
        req.params.text+"%' OR `types`.`Name` LIKE '%"+req.params.text+"%' OR "+
        "CONCAT(`employees`.`Name`, ' ', `employees`.`Surname`) LIKE '%"+req.params.text+"%';", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

module.exports = router;
