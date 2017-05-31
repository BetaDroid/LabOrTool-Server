/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `nAct` FROM `activities`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT `activities`.`Id`, `activities`.`Title`, `activities`.`WorkCode`, " +
        "`priorities`.`Name` AS `PriorityName`, DATE_FORMAT(`activities`.`Deadline`, '%d-%m-%Y') AS `Deadline`, `statuses`.`Name` AS `StatusName`, " +
        "`types`.`Name` AS `TypeName`, CONCAT(`employees`.`Name`, ' ', `employees`.`Surname`) AS `EmployeeNS` " +
        "FROM `activities`"+
        "INNER JOIN `priorities` ON `priorities`.`Id`=`activities`.`PriorityId` "+
        "INNER JOIN `statuses` ON `statuses`.`Id`=`activities`.`StatusId` "+
        "INNER JOIN `types` ON `types`.`Id`=`activities`.`TypeId` "+
        "INNER JOIN `employees` ON `employees`.`Id`=`activities`.`EmployeeId`;", function(err, rows) {
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
        "`TypeId`, `EmployeeId`, `Description`, `Editable`) VALUES (?,?,?,DATE(?),?,?,?,?,?);",
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
    db.connection.query("SELECT `activities`.`Id`, `activities`.`Title`, `activities`.`WorkCode`, " +
        "`priorities`.`Name` AS `PriorityName`, `activities`.`Deadline`, `statuses`.`Name` AS `StatusName`, " +
        "`types`.`Name` AS `TypeName`, CONCAT(`employees`.`Name`, ' ', `employees`.`Surname`) AS `EmployeeNS` " +
        "FROM `activities`"+
        "INNER JOIN `priorities` ON `priorities`.`Id`=`activities`.`PriorityId` "+
        "INNER JOIN `statuses` ON `statuses`.`Id`=`activities`.`StatusId` "+
        "INNER JOIN `types` ON `types`.`Id`=`activities`.`TypeId` "+
        "INNER JOIN `employees` ON `employees`.`Id`=`activities`.`EmployeeId` " +
        "WHERE `activities`.`Title` LIKE CONCAT('%',?,'%') OR `activities`.`WorkCode` LIKE CONCAT('%',?,'%') OR " +
        "`priorities`.`Name` LIKE CONCAT('%',?,'%') OR `activities`.`Deadline` LIKE CONCAT('%',?,'%') OR " +
        "`statuses`.`Name` LIKE CONCAT('%',?,'%') OR `types`.`Name` LIKE CONCAT('%',?,'%') OR "+
        "CONCAT(`employees`.`Name`, ' ', `employees`.`Surname`) LIKE CONCAT('%',?,'%');",
        [_text, _text, _text, _text, _text, _text, _text], function(err, rows) {
            if (err) throw err;
            else callback(rows);
        }
    );
};
