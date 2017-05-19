/**
 * Created by Daniel on 18/05/17.
 */

const db = require('../../../configuration/db');

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `roles`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `roles` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};
