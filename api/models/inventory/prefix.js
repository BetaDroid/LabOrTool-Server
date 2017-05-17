/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `prefixes`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_prefix) {
    db.connection.query("INSERT INTO `prefixes` (`Name`) VALUES (?);", [_prefix.Name], function(err) {
        if (err) throw err;
    });
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `prefixes` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _prefix) {
    db.connection.query("UPDATE `prefixes` SET `Name`=? WHERE `Id`=?;", [_prefix.Name, _id], function(err) {
        if (err) throw err;
    });
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `prefixes` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};
