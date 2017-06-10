/**
 * Created by Daniel on 16/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Categories` FROM `categories`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `categories`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_category) {
    db.connection.query("INSERT INTO `categories` (`Name`,`Note`) VALUES (?,?);",
        [_category.Name, _category.Note],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `categories` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _category) {
    db.connection.query("UPDATE `categories` SET `Name`=?, `Note`=? WHERE `Id`=?;",
        [_category.Name, _category.Note, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `categories` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `categories` WHERE `Name` LIKE CONCAT('%',?,'%');", [_text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
