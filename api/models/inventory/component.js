/**
 * Created by Daniel on 17/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Components` FROM `components`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `getAllComponents-Short`;", function(err, rows) {
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
    db.connection.query("SELECT * FROM `getAllComponents-Short` " +
    "WHERE `Name` LIKE CONCAT('%',?,'%') OR " +
    "`ManufacturerName` LIKE CONCAT('%',?,'%') OR " +
    "`PartNumber` LIKE CONCAT('%',?,'%') OR " +
    "`DistributorCode` LIKE CONCAT('%',?,'%') OR " +
    "`Price` LIKE CONCAT('%',?,'%') OR " +
    "`FootprintName` LIKE CONCAT('%',?,'%') OR " +
    "`CategoryName` LIKE CONCAT('%',?,'%');", [_text, _text, _text, _text, _text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
