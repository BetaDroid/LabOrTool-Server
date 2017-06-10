/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) as `Manufacturers` FROM `manufacturers`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `manufacturers`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_manufacturers) {
    db.connection.query("INSERT INTO `manufacturers` (`Name`, `Website`) VALUES (?,?);",
        [_manufacturers.Name, _manufacturers.Website],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `manufacturers` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _manufacturers) {
    db.connection.query("UPDATE `manufacturers` SET `Name`=?, `Website`=? WHERE `Id`=?;",
        [_manufacturers.Name, _manufacturers.Website, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `manufacturers` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `manufacturers` WHERE `Name` LIKE CONCAT('%',?,'%');", [_text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
