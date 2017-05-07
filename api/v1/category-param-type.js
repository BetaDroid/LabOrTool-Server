/**
 * Created by Daniel on 07/05/17.
 */

const router = require('../../configuration/router');
const cn = require('../../configuration/db');

router.get('/inventory/categories-param-types/', function (req, res) {
    cn.query('SELECT `categoriesparamtypes`.`Name`, `categories`.`Name` AS `CategoryName`, `units`.`Name` AS `UnitName`' +
        ', `categoriesparamtypes`.`Order`  FROM `categoriesparamtypes` ' +
        'INNER JOIN `categories` ON `categories`.`Id` = `categoriesparamtypes`.`CategoryId` ' +
        'INNER JOIN `units` ON `units`.`Id` = `categoriesparamtypes`.`UnitId`;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/inventory/categories-param-types/', function (req, res) {
    cn.query("INSERT INTO categoriesparamtypes (Name, CategoryId, UnitId, Order, Note) " +
        "VALUES ('" + req.body.Name + "', " + req.body.CategoryId + ", " + req.body.UnitId + ", " +
        "'" + req.body.Order + "', '" + req.body.Note + "');", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/categories-param-types/:id', function (req, res) {
    cn.query("SELECT * FROM categoriesparamtypes WHERE Id = "+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/inventory/categories-param-types/:id', function (req, res) {
    cn.query("UPDATE categoriesparamtypes SET Name = '" + req.body.Name + "', CategoryId = " + req.body.CategoryId +
        ", UnitId = " + req.body.UnitId + ", Order = '" + req.body.Order + "', Note = '" + req.body.Note + "' " +
        "WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/inventory/categories-param-types/:id', function (req, res) {
    cn.query("DELETE FROM categoriesparamtypes WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/categories-param-types/search/:text', function (req, res) {
    cn.query("SELECT `categoriesparamtypes`.`Name`, `categories`.`Name` AS `CategoryName`, `units`.`Name` AS `UnitName`" +
        ", `categoriesparamtypes`.`Order` FROM `categoriesparamtypes` " +
        "INNER JOIN `categories` ON `categories`.`Id` = `categoriesparamtypes`.`CategoryId` " +
        "INNER JOIN `units` ON `units`.`Id` = `categoriesparamtypes`.`UnitId`" +
        "WHERE `categoriesparamtypes`.`Name` LIKE '%" + req.params.text + "%' OR " +
        "`categories`.`Name` LIKE '%" + req.params.text + "%' OR " +
        "`units`.`Name` LIKE '%" + req.params.text + "%' OR " +
        "`categoriesparamtypes`.`Order` LIKE '%" + req.params.text + "%';", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

module.exports = router;
