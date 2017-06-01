/**
 * Created by Daniel on 31/05/17.
 */

const db = require('../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `nPro` FROM `productions`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT `productions`.`Id`, `activities`.`Title`, `boards`.`Name`, `productions`.`Quantity`, " +
        "`productions`.`WorkCode`, `productions`.`Deadline`, `productions`.`StatusId`, " +
        "CONCAT(`employees`.`Name`, ' ', `employees`.`Surname`), `manufacturers`.`Name`" +
        "FROM `productions` " +
        "INNER JOIN `activities` ON `activities`.`Id`=`productions`.`ActivityId` " +
        "INNER JOIN `boards` ON `boards`.`Id`=`productions`.`BoardId` " +
        "INNER JOIN `employees` ON `employees`.`Id`=`productions`.`EmployeeId` " +
        "INNER JOIN `manufacturers` ON `manufacturers`.`Id`=`productions`.`ManufacturerId`;", function(err, rows) {
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
    db.connection.query("SELECT `productions`.`Id`, `activities`.`Title` AS `ActivityTitle`, " +
        "`boards`.`Name` AS `BoardName`, `productions`.`Quantity`, " +
        "`productions`.`WorkCode`, `productions`.`Deadline`, `statuses`.`Name` AS `StatusName`, " +
        "CONCAT(`employees`.`Name`, ' ', `employees`.`Surname`) AS `Employee`, `manufacturers`.`Name` AS `ManufacturerName` " +
        "FROM `productions` " +
        "INNER JOIN `activities` ON `activities`.`Id`=`productions`.`ActivityId` " +
        "INNER JOIN `boards` ON `boards`.`Id`=`productions`.`BoardId` " +
        "INNER JOIN `statuses` ON `statuses`.`Id`=`productions`.`StatusId` " +
        "INNER JOIN `employees` ON `employees`.`Id`=`productions`.`EmployeeId` " +
        "INNER JOIN `manufacturers` ON `manufacturers`.`Id`=`productions`.`ManufacturerId` " +
        "WHERE `activities`.`Title` LIKE CONCAT('%',?,'%') OR " +
        "`boards`.`Name` LIKE CONCAT('%',?,'%') OR " +
        "`productions`.`Quantity` LIKE CONCAT('%',?,'%') OR " +
        "`productions`.`WorkCode` LIKE CONCAT('%',?,'%') OR " +
        "`productions`.`Deadline` LIKE CONCAT('%',?,'%') OR " +
        "`statuses`.`Name` LIKE CONCAT('%',?,'%') OR " +
        "CONCAT(`employees`.`Name`, ' ', `employees`.`Surname`) LIKE CONCAT('%',?,'%')," +
        "`manufacturers`.`Name` LIKE CONCAT('%',?,'%');", [_text, _text, _text, _text, _text, _text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
