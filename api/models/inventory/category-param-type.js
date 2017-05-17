/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.getAll = function(callback) {
    db.connection.query("SELECT `categoryparamtypes`.`Id`, `categoryparamtypes`.`Name`, " +
        "`categories`.`Name` AS `CategoryName`, `units`.`Name` AS `UnitName`, `categoryparamtypes`.`Order` " +
        "FROM `categoryparamtypes` " +
        "INNER JOIN `categories` ON `categories`.`Id` = `categoryparamtypes`.`CategoryId` " +
        "INNER JOIN `units` ON `units`.`Id` = `categoryparamtypes`.`UnitId`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_cpt) {
    db.connection.query("INSERT INTO `categoryparamtypes` (`Name`, `CategoryId`, `UnitId`, `Order`, `Note`) " +
        "VALUES (?,?,?,?,?);",
        [_cpt.Name, _cpt.CategoryId, _cpt.UnitId, _cpt.Order , _cpt.Note],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `categoryparamtypes` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _cpt) {
    db.connection.query("UPDATE `categoryparamtypes` SET `Name`=?, `CategoryId`=?, `UnitId`=?, `Order`=?, `Note`=? " +
        "WHERE `Id`=?;",
        [_cpt.Name, _cpt.CategoryId, _cpt.UnitId, _cpt.Order , _cpt.Note, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `categoryparamtypes` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT `categoryparamtypes`.`Id`, `categoryparamtypes`.`Name`, " +
        "`categories`.`Name` AS `CategoryName`, `units`.`Name` AS `UnitName`, `categoryparamtypes`.`Order` " +
        "FROM `categoryparamtypes` " +
        "INNER JOIN `categories` ON `categories`.`Id` = `categoryparamtypes`.`CategoryId` " +
        "INNER JOIN `units` ON `units`.`Id` = `categoryparamtypes`.`UnitId` " +
        "WHERE `categoryparamtypes`.`Name` LIKE CONCAT('%',?,'%') OR " +
        "`categories`.`Name` LIKE CONCAT('%',?,'%') OR " +
        "`units`.`Name` LIKE CONCAT('%',?,'%') OR " +
        "`categoryparamtypes`.`Order` LIKE CONCAT('%',?,'%');", [_text, _text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
