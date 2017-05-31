/**
 * Created by Daniel on 31/05/17.
 */

const db = require('../../../configuration/db');

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `notetypes`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `notetypes` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};
