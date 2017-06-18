/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Activities` FROM `activities`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `getAllActivities-Short`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_activity) {
    var Employee = "";

    if (_activity.EmployeeId === "")
        Employee = null;
    else
        Employee = _activity.EmployeeId;

    db.connection.query("INSERT INTO `activities` (`Title`, `WorkCode`, `PriorityId`, `Deadline`, `StatusId`, " +
        "`TypeId`, `EmployeeId`, `Description`, `Editable`) VALUES (?,?,?,?,?,?,?,?,?);",
        [_activity.Title, _activity.WorkCode, _activity.PriorityId, _activity.Deadline,
            _activity.StatusId, _activity.TypeId, Employee, _activity.Description, _activity.Editable],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `activities` WHERE `Id`=?;", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _activity) {
    db.connection.query("UPDATE `activities` SET `Title`=?, `WorkCode`=?, `PriorityId`=?, `Deadline`=DATE(?), " +
        "`StatusId`=?, `TypeId`=?, `EmployeeId`=?, `Description`=?, `Editable`=? WHERE `Id`=?;",
        [_activity.Title, _activity.WorkCode, _activity.PriorityId, _activity.Deadline,
            _activity.StatusId, _activity.TypeId, _activity.EmployeeId, _activity.Description, _activity.Editable, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `activities` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `getAllActivities-Short` " +
        "WHERE `Title` LIKE CONCAT('%',?,'%') OR " +
        "`WorkCode` LIKE CONCAT('%',?,'%') OR " +
        "`PriorityName` LIKE CONCAT('%',?,'%') OR " +
        "`Deadline` LIKE CONCAT('%',?,'%') OR " +
        "`StatusName` LIKE CONCAT('%',?,'%') OR " +
        "`TypeName` LIKE CONCAT('%',?,'%') OR "+
        "`Employee` LIKE CONCAT('%',?,'%');",
        [_text, _text, _text, _text, _text, _text, _text], function(err, rows) {
            if (err) throw err;
            else callback(rows);
        }
    );
};
