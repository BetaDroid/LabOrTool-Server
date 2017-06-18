/**
 * Created by Daniel on 18/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Companies` FROM `companies`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `companies`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_company) {
    db.connection.query("INSERT INTO `companies` (`Name`,`Note`) VALUES (?,?);",
        [_company.Name, _company.Note],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `companies` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _company) {
    db.connection.query("UPDATE `companies` SET `Name`=?, `Note`=? WHERE `Id`=?;",
        [_company.Name, _company.Note, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `companies` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};
