/**
 * Created by Daniel on 31/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Boms` FROM `boms`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `getAllBoms-Short`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_bom) {
    db.connection.query("INSERT INTO `boms` (`BoardId`,`Revision`,`Date`,`Description`) " +
        "VALUES (?,?,?,?);",
        [_bom.BoardId, _bom.Revision, _bom.Date, _bom.Description],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `boms` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _bom) {
    db.connection.query("UPDATE `boards` SET `BoardId`=?, `Revision`=?, `Date`=?, `Description`=? " +
        "WHERE `Id`=?;",
        [_bom.BoardId, _bom.Revision, _bom.Date, _bom.Description, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `boms` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `getAllBoms-Short` " +
        "WHERE `BoardName` LIKE CONCAT('%',?,'%') OR " +
        "`Revision` LIKE CONCAT('%',?,'%') OR " +
        "`Date` LIKE CONCAT('%',?,'%');", [_text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
