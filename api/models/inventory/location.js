/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) as `nLoc` FROM `locations`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `locations`", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_location) {
    db.connection.query("INSERT INTO `locations` (`Position`, `Container`, `SubContainer`) " +
        "VALUES (?,?,?);",
        [_location.Position, _location.Container, _location.SubContainer],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `locations` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _location) {
    db.connection.query("UPDATE `locations` SET `Position`=?, `Container`=?, `SubContainer`=? WHERE `Id`=?;",
        [_location.Position, _location.Container, _location.SubContainer, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `locations` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `locations` WHERE `Position` LIKE CONCAT('%',?,'%') OR " +
        "`Container` LIKE CONCAT('%',?,'%') OR `SubContainer` LIKE CONCAT('%',?,'%');", [_text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
