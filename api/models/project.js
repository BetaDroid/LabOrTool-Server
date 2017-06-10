/**
 * Created by Daniel on 31/05/17.
 */

const db = require('../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Projects` FROM `projects`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `projects`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_project) {
    db.connection.query("INSERT INTO `projects` (`Name`, `Description`) " +
        "VALUES (?,?);", [_project.Name, _project.Description], function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `projects` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _project) {
    db.connection.query("UPDATE `projects` SET `Name`=?, `Description`=? WHERE `Id`=?;",
        [_project.Name, _project.Description, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `projects` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `projects` " +
        "WHERE `Name` LIKE CONCAT('%',?,'%');", [_text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
