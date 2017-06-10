/**
 * Created by Daniel on 31/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Notes` FROM `notes`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.countPerParent = function(_id, callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Notes` FROM `notes` WHERE `ParentId`=?;", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `getAllNotes`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_note) {
    db.connection.query("INSERT INTO `notes` (`NoteTypeId`, `ParentId`, `Body`, `EmployeeCreationId`, " +
        "`DateCreation`, `EmployeeModificationId`, `DateModification`) VALUES (?,?,?,?,?,?,?);",
        [_note.NoteTypeId, _note.ParentId, _note.Body, _note.EmployeeCreationId,
            _note.DateCreation, _note.EmployeeModificationId, _note.DateModification],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `getAllNotes` WHERE `ParentId`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _note) {
    db.connection.query("UPDATE `notes` SET `NoteTypeId`=?, `ParentId`=?, `Body`=?, `EmployeeModificationId`=?, " +
        "`DateModification`=? WHERE `Id`=?;",
        [_note.NoteTypeId, _note.ParentId, _note.Body, _note.EmployeeModificationId, _note.DateModification, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `notes` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

// TODO: search method
