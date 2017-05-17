/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `nCom` FROM `components`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT `components`.`Id`, `components`.`Name`, `manufacturers`.`Name` AS `ManufacturerName`, " +
    "`components`.`PartNumber`, `components`.`DistributorCode`,`components`.`Price`, `components`.`Datasheet`, " +
    "`footprints`.`Name` AS `FootprintName`, `footprints`.`Name` AS `Footprintname`, `categories`.`Name` AS `CategoryName` " +
    "FROM `components` " +
    "INNER JOIN `manufacturers` ON `manufacturers`.`Id`=`components`.`ManufacturerId` " +
    "INNER JOIN `footprints` ON `footprints`.`Id`=`components`.`FootprintId` " +
    "INNER JOIN `categories` ON `categories`.`Id`=`components`.`CategoryId`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_component) {
    db.connection.query("INSERT INTO `components` (`Name`, `ManufacturerId`, `PartNumber`, `DistributorId`, " +
        "`DistributorCode`, `Price`, `Code`, `LocationId`, `Datasheet`, `FootprintId`, `CategoryId`, `Note`) " +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?);",
        [_component.Name, _component.ManufacturerId, _component.PartNumber, _component.DistributorId,
            _component.DistributorCode, _component.Price, _component.Code, _component.LocationId, _component.Datasheet,
            _component.FootprintId, _component.CategoryId, _component.Note],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `components` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _component) {
    db.connection.query("UPDATE `components` SET `Name`=?, `ManufacturerId`=?, `PartNumber`=?, `DistributorId`=?, " +
    "`DistributorCode`=?, `Price`=?, `Code`=?, `LocationId`=?, `Datasheet`=?, `FootprintId`=?, `CategoryId`=?, " +
        "`Note`=? WHERE `Id`=?;",
        [_component.Name, _component.ManufacturerId, _component.PartNumber, _component.DistributorId,
            _component.DistributorCode, _component.Price, _component.Code, _component.LocationId, _component.Datasheet,
            _component.FootprintId, _component.CategoryId, _component.Note, _id],
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
    db.connection.query("SELECT `components`.`Id`, `components`.`Name`, `manufacturers`.`Name` AS `ManufacturerName`, " +
    "`components`.`PartNumber`, `components`.`DistributorCode`,`components`.`Price`, `components`.`Datasheet`, " +
    "`footprints`.`Name` AS `FootprintName`, `footprints`.`Name` AS `Footprintname`, `categories`.`Name` AS `CategoryName` " +
    "FROM `components` " +
    "INNER JOIN `manufacturers` ON `manufacturers`.`Id`=`components`.`ManufacturerId` " +
    "INNER JOIN `footprints` ON `footprints`.`Id`=`components`.`FootprintId` " +
    "INNER JOIN `categories` ON `categories`.`Id`=`components`.`CategoryId` " +
    "WHERE `components`.`Name` LIKE CONCAT('%',?,'%') OR " +
    "`manufacturers`.`Name` LIKE CONCAT('%',?,'%') OR " +
    "`components`.`PartNumber` LIKE CONCAT('%',?,'%') OR " +
    "`components`.`DistributorCode` LIKE CONCAT('%',?,'%') OR " +
    "`components`.`Price` LIKE CONCAT('%',?,'%') OR " +
    "`footprints`.`Name` LIKE CONCAT('%',?,'%') OR " +
    "`categories`.`Name` LIKE CONCAT('%',?,'%');", [_text, _text, _text, _text, _text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
