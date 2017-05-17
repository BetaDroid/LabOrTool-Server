/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `units`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_unit) {
    db.connection.query("INSERT INTO `units` (`Name`, `ShortName`, `Note`) VALUES (?,?,?);",
        [_unit.Name, _unit.ShortName, _unit.Note],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `units` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _unit) {
    db.connection.query("UPDATE `units` SET `Name`=?, `ShortName`=?, `Note`=? WHERE `Id`=?;",
        [_unit.Name, _unit.ShortName, _unit.Note, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `units` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};
