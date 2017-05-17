/**
 * Created by Daniel on 05/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) as `nDis` FROM `distributors`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `distributors`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_distributor) {
    db.connection.query("INSERT INTO `distributors` (`Name`, `Website`) VALUES (?,?);",
        [_distributor.Name, _distributor.Website],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `distributors` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _distributor) {
    db.connection.query("UPDATE `distributors` SET `Name`=?, `Website`=? WHERE `Id`=?;",
        [_distributor.Name, _distributor.Website, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `distributors` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `distributors` WHERE `Name` LIKE CONCAT('%',?,'%');", [_text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
