/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `nComPar` FROM `componentparams`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(_id, callback) {
    db.connection.query("SELECT `componentparams`.`Id`, `componentparams`.`ComponentId`, `categoryparamtypes`.`Name` AS `CPTName`, " +
        "`componentparams`.`Value`, `prefixes`.`Name` AS `PrefixName` " +
        "FROM `componentparams` " +
        "INNER JOIN `categoryparamtypes` ON `categoryparamtypes`.`Id`=`componentparams`.`CategoryParamTypeId` " +
        "INNER JOIN `prefixes` ON `prefixes`.`Id`=`componentparams`.`PrefixId` " +
        "WHERE `componentparams`.`ComponentId`=?;", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_componentparams) {
    db.connection.query("INSERT INTO `componentparams` (`ComponentId`, `CategoryParamTypeId`, `Value`, `PrefixId`, `Note`) " +
        "VALUES (?,?,?,?,?);",
        [_componentparams.ComponentId, _componentparams.CategoryParamTypeId, _componentparams.Value,
            _componentparams.PrefixId, _componentparams.Note],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `componentparams` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _componentparams) {
    db.connection.query("UPDATE `componentparams` SET `ComponentId`=?, `CategoryParamTypeId`= ?, `Value`=?, " +
        "`PrefixId`=?, `Note`=? WHERE `Id`=?;",
        [_componentparams.ComponentId, _componentparams.CategoryParamTypeId, _componentparams.Value,
            _componentparams.PrefixId, _componentparams.Note, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `componentparams` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};
