/**
 * Created by Daniel on 10/05/17.
 */

const router = require('../../configuration/router');
const cn = require('../../configuration/db');

router.get('/inventory/component-params/:id', function (req, res) {
    cn.query("SELECT `componentparams`.`Id`, `componentparams`.`ComponentId`, `categoriesparamtypes`.`Name` AS `CPT`, " +
             "`componentparams`.`Value`, `prefixes`.`Name` AS `Prefix`, `componentparams`.`Note` " +
             "FROM `componentparams` " +
             "INNER JOIN `categoriesparamtypes` ON `categoriesparamtypes`.`Id` = `componentparams`.`CategoryParamTypeId` " +
             "INNER JOIN `prefixes` ON `prefixes`.`Id` = `componentparams`.`PrefixId` " +
             "WHERE `componentparams`.`ComponentId` = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.get('/inventory/component-param/:id', function (req, res) {
    cn.query("SELECT * FROM `componentparams` WHERE `Id` = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});


router.post('/inventory/component-param/', function (req, res) {
    cn.query("INSERT INTO `componentparams` (`ComponentId`, `CategoryParamTypeId`, `Value`, `PrefixId`, `Note`) " +
            "VALUES (" + req.body.Component + ", " + req.body.CPT + ", " + req.body.Value + ", " + req.body.Prefix +
            ", '" + req.body.Note + "');", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.put('/inventory/component-param/:id', function (req, res) {
    cn.query("UPDATE `componentparams` SET `ComponentId` = " + req.body.ComponentId + ", `CategoryParamTypeId` = " +
             req.body.CategoryParamTypeId + ", `Value` = " + req.body.Value + ", `PrefixId` = " +
             req.body.PrefixId + ", `Note` = '" + req.body.Note + "' WHERE `Id` = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/inventory/component-param/:id', function (req, res) {
    cn.query("DELETE FROM `componentparams` WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

module.exports = router;
