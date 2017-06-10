/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(_id, callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `ComponentParams` FROM `componentparams`" +
        "WHERE `ComponentId`=?;", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(_id, callback) {
    db.connection.query("SELECT * FROM `getAllCP-Short` " +
        "WHERE `ComponentId`=?;", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_componentparam) {
    db.connection.query("INSERT INTO `componentparams` (`ComponentId`, `CategoryParamTypeId`, `Value`, `PrefixId`, `Note`) " +
        "VALUES (?,?,?,?,?);",
        [_componentparam.ComponentId, _componentparam.CategoryParamTypeId, _componentparam.Value,
            _componentparam.PrefixId, _componentparam.Note],
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

exports.update = function(_id, _componentparam) {
    db.connection.query("UPDATE `componentparams` SET `ComponentId`=?, `CategoryParamTypeId`= ?, `Value`=?, " +
        "`PrefixId`=?, `Note`=? WHERE `Id`=?;",
        [_componentparam.ComponentId, _componentparam.CategoryParamTypeId, _componentparam.Value,
            _componentparam.PrefixId, _componentparam.Note, _id],
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
