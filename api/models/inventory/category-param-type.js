/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `CategoryParamTypes` FROM `categoryparamtypes`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `getAllCPT-Short`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_cpt) {
    db.connection.query("INSERT INTO `categoryparamtypes` (`Name`, `CategoryId`, `UnitId`, `Note`) " +
        "VALUES (?,?,?,?);",
        [_cpt.Name, _cpt.CategoryId, _cpt.UnitId, _cpt.Note],
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
    db.connection.query("UPDATE `categoryparamtypes` SET `Name`=?, `CategoryId`=?, `UnitId`=?, `Note`=? " +
        "WHERE `Id`=?;",
        [_cpt.Name, _cpt.CategoryId, _cpt.UnitId, _cpt.Note, _id],
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
    db.connection.query("SELECT * FROM `getAllCPT-Short` " +
        "WHERE `Name` LIKE CONCAT('%',?,'%') OR " +
        "`CategoryName` LIKE CONCAT('%',?,'%') OR " +
        "`UnitName` LIKE CONCAT('%',?,'%');", [_text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
