/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) as `Units` FROM `units`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `units`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `units` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};
