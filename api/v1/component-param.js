/**
 * Created by Daniel on 10/05/17.
 */

const router = require('../../configuration/router');
const cn = require('../../configuration/db');

router.get('/inventory/component-params/:id', function (req, res) {
    cn.query("SELECT `componentparams`.`Id`, `componentparams`.`ComponentId`, `categoriesparamtypes`.`Name`, " +
             "`componentparams`.`Value`, `prefixes`.`Name`, `componentparams`.`Note` " +
             "FROM `componentparams` " +
             "INNER JOIN `categoriesparamtypes` ON `categoriesparamtypes`.`Id` = `componentparams`.`CategoryParamTypeId` " +
             "INNER JOIN `prefixes` ON `prefixes`.`Id` = `componentparams`.`PrefixId` " +
             "WHERE `componentparams`.`ComponentId` = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/inventory/component-params/', function (req, res) {
    cn.query("INSERT INTO components (Name, ManufacturerId, PartNumber, DistributorId, DistributorCode, Price, Code, " +
        "LocationId, Datasheet, FootprintId, CategoryId, Note) VALUES ('" + req.body.Name + "', " +
        req.body.ManufacturerId + ", '" + req.body.PartNumber + "', " + req.body.DistributorId + ", " +
        "'" + req.body.DistributorCode + "', " + req.body.Price + ", '" + req.body.Code +"', " + req.body.LocationId +
        ", '" + req.body.Datasheet + "', " + req.body.FootprintId + ", " + req.body.CategoryId + ", '" + req.body.Note +
        "');", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.put('/inventory/component-params/:id', function (req, res) {
    cn.query("UPDATE components SET Name = '" + req.body.Name + "', ManufacturerId = " + req.body.ManufacturerId +
        ", PartNumber = '" + req.body.PartNumber + "', DistributorId = " + req.body.DistributorId + ", " +
        "DistributorCode = '" + req.body.DistributorCode + "', Price = " + req.body.Price + ", Code = '" +
        req.body.Code +"', LocationId = " + req.body.LocationId + ", Datasheet = '" + req.body.Datasheet + "', " +
        "FootprintId = " + req.body.FootprintId + ", CategoryId = " + req.body.CategoryId + ", Note = '" +
        req.body.Note + "' WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/inventory/component-params/:id', function (req, res) {
    cn.query("DELETE FROM components WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

module.exports = router;
