/**
 * Created by Daniel on 31/05/17.
 */

const db = require('../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Productions` FROM `productions`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `getAllProductions-Short`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_production) {
    db.connection.query("INSERT INTO `productions` (`ActivityId`, `Description`, `BoardId`, `Quantity`, " +
        "`WorkCode`, `OutputCode`, `Deadline`, `StatusId`, `EmployeeId`, `ManufacturerId`) " +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?);",
        [_production.ActivityId, _production.Description, _production.BoardId, _production.Quantity,
            _production.WorkCode, _production.OutputCode, _production.Deadline, _production.StatusId,
            _production.EmployeeId, _production.ManufacturerId],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `productions` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _production) {
    db.connection.query("UPDATE `productions` SET `ActivityId`=?, `Description`=?, `BoardId`=?, `Quantity`=?, " +
        "`WorkCode`=?, `OutputCode`=?, `Deadline`=?, `StatusId`=?, `EmployeeId`=?, `ManufacturerId`=? WHERE `Id`=?;",
        [_production.ActivityId, _production.Description, _production.BoardId, _production.Quantity,
            _production.WorkCode, _production.OutputCode, _production.Deadline, _production.StatusId,
            _production.EmployeeId, _production.ManufacturerId, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `components` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `getAllProductions-Short` " +
        "WHERE `ActivityTitle` LIKE CONCAT('%',?,'%') OR " +
        "`BoardName` LIKE CONCAT('%',?,'%') OR " +
        "`Quantity` LIKE CONCAT('%',?,'%') OR " +
        "`WorkCode` LIKE CONCAT('%',?,'%') OR " +
        "`Deadline` LIKE CONCAT('%',?,'%') OR " +
        "`StatusName` LIKE CONCAT('%',?,'%') OR " +
        "`Employee` LIKE CONCAT('%',?,'%');", [_text, _text, _text, _text, _text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
