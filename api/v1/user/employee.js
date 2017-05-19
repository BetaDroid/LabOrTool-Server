/**
 * Created by Daniel on 14/05/17.
 */

const cn = require('../../../configuration/db');

module.exports = function(router) {

    router.get('/user/employees/', function (req, res) {
        cn.query("SELECT `employees`.`Id`, `employees`.`Name`, `employees`.`Surname`, `companies`.`Name` AS `Company`, "+
            "`roles`.`Name` AS `Role` FROM `employees` "+
            "INNER JOIN `companies` ON `companies`.`Id` = `employees`.`CompanyId` "+
            "INNER JOIN `roles` ON `roles`.`Id` = `employees`.`RoleId`;", function(err, rows) {
            if (err) throw err;
            else res.json(rows);
        });
    });

    router.post('/user/employees/', function (req, res) {
        // TODO: generate the employee ID
        var EmployeeId = '';
        cn.query("INSERT INTO `employees` (`Id`, `Name`, `Surname`, `CompanyId`, `RoleId`, `Email`, `Note`) "+
            "VALUES ('"+EmployeeId+"', '"+req.body.Name+"', '"+req.body.Surname+"', "+req.body.CompanyId+
            ", "+req.body.RoleId + ", '"+req.body.Email+"', '"+req.body.Note + "');",
            function(err, rows) {
                if (err) throw err;
                else res.json(true);
            });
    });

    router.get('/user/employees/:id', function (req, res) {
        cn.query("SELECT * FROM `employees` WHERE `Id` = '"+ req.params.id +"';", function(err, rows) {
            if (err) throw err;
            else res.json(rows[0]);
        });
    });

    router.put('/user/employees/:id', function (req, res) {
        cn.query("UPDATE `employees` SET `Name`='"+req.body.Name+"', `Surname`='"+req.body.Surname+"', "+
            "`CompanyId`="+req.body.CompanyId+", `RoleId`="+req.body.RoleId+", `Email`='"+req.body.Email+
            "', `Note`='"+req.body.Note+"' WHERE `Id`='"+req.params.id+"';", function(err, rows) {
            if (err) throw err;
            else res.json(true);
        });
    });

    router.delete('/user/employees/:id', function (req, res) {
        cn.query("DELETE FROM `employees` WHERE `Id`='"+req.params.id+"';", function(err, rows) {
            if (err) throw err;
            else res.json(true);
        });
    });

    router.get('/user/employees/search/:text', function (req, res) {
        cn.query("SELECT `employees`.`Id`, `employees`.`Name`, `employees`.`Surname`, `companies`.`Name` AS `Company`, "+
            "`roles`.`Name` AS `Role` FROM `employees` "+
            "INNER JOIN `companies` ON `companies`.`Id` = `employees`.`CompanyId` "+
            "INNER JOIN `roles` ON `roles`.`Id` = `employees`.`RoleId` "+
            "WHERE `employees`.`Id` LIKE '%"+req.params.text+"%' OR `employees`.`Name` LIKE '%"+req.params.text+"%' " +
            "OR `employees`.`Surname` LIKE '%"+req.params.text+"%' OR `companies`.`Name` LIKE '%"+req.params.text+"%' " +
            "OR `roles`.`Name` LIKE '%"+req.params.text+"%';", function(err, rows) {
            if (err) throw err;
            else res.json(rows);
        });
    });
};
