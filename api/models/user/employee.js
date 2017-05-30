/**
 * Created by Daniel on 18/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `nEmp` FROM `employees`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT `employees`.`Id`, `employees`.`Name`, `employees`.`Surname`, " +
        "`companies`.`Name` AS `CompanyName`, `roles`.`Name` AS `RoleName`, `employees`.`Email` " +
        "FROM `employees` " +
        "INNER JOIN `companies` ON `companies`.`Id` = `employees`.`CompanyId` " +
        "INNER JOIN `roles` ON `roles`.`Id` = `employees`.`RoleId`;", function(err, rows) {
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
    // TODO: generate the employee ID
    var newId = '';
    db.connection.query("UPDATE `employees` SET `Id`=?, `Name`=?, `Surname`=?, `CompanyId`=?, `RoleId`=?, `Email`=?, " +
        "`Note`=? WHERE `Id`=?;",
        [newId, _employee.Name, _employee.Surname, _employee.CompanyId,
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
    db.connection.query("SELECT `employees`.`Id`, `employees`.`Name`, `employees`.`Surname`, " +
        "`companies`.`Name` AS `CompanyName`, `roles`.`Name` AS `RoleName`, `employees`.`Email` " +
        "FROM `employees` " +
        "INNER JOIN `companies` ON `companies`.`Id` = `employees`.`CompanyId` " +
        "INNER JOIN `roles` ON `roles`.`Id` = `employees`.`RoleId` " +
        "WHERE `employees`.`Id` LIKE CONCAT('%',?,'%') OR " +
        "`employees`.`Name` LIKE CONCAT('%',?,'%') OR " +
        "`employees`.`Surname` LIKE CONCAT('%',?,'%') OR " +
        "`companies`.`Name` LIKE CONCAT('%',?,'%') OR " +
        "`roles`.`Name` LIKE CONCAT('%',?,'%') OR " +
        "`employees`.`Email` LIKE CONCAT('%',?,'%');",
        [_text, _text, _text, _text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
