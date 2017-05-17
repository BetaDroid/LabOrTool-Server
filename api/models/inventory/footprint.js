/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `footprints`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_footprint) {
    db.connection.query("INSERT INTO `footprints` (`Name`, `Link`) VALUES (?,?);",
        [_footprint.Name, _footprint.Link],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `footprints` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _footprint) {
    db.connection.query("UPDATE `footprints` SET `Name`=?, `Link`=? WHERE `Id`=?;",
        [_footprint.Name, _footprint.ManufacturerId, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `footprints` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `footprints` WHERE `Name` LIKE CONCAT('%',?,'%');", [_text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
