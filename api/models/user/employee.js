/**
 * Created by Daniel on 18/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Employees` FROM `employees`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `getAllEmployees-Short`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_employee) {
    var Id = '';
    db.connection.query("INSERT INTO `employees` (`Id`, `Name`, `Surname`, `CompanyId`, `RoleId`, `Email`, `Note`) " +
        "VALUES (?,?,?,?,?,?,?);",
        [Id, _employee.Name, _employee.Surname, _employee.CompanyId,
            _employee.RoleId, _employee.Email, _employee.Note],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `employees` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _employee) {
    db.connection.query("UPDATE `employees` SET `Name`=?, `Surname`=?, `CompanyId`=?, `RoleId`=?, `Email`=?, " +
        "`Note`=? WHERE `Id`=?;",
        [_employee.Name, _employee.Surname, _employee.CompanyId,
            _employee.RoleId, _employee.Email, _employee.Note, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `employees` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `getAllEmployees-Short` " +
        "WHERE `Name` LIKE CONCAT('%',?,'%') OR " +
        "`Surname` LIKE CONCAT('%',?,'%') OR " +
        "`CompanyName` LIKE CONCAT('%',?,'%') OR " +
        "`RoleName` LIKE CONCAT('%',?,'%') OR " +
        "`Email` LIKE CONCAT('%',?,'%');",
        [_text, _text, _text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
