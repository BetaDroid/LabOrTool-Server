/**
 * Created by Daniel on 30/05/17.
 */

const db = require('../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Priorities` FROM `priorities`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `priorities`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `priorities` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};
