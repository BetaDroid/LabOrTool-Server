/**
 * Created by Daniel on 24/04/17.
 */

'use strict';

const db = require('../../../configuration/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Accounts` FROM `accounts`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `getAllAccounts-Short`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.getAllChatId = function (callback) {
    db.connection.query("SELECT `TelegramChatId`, `EmployeeId` FROM `accounts`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.validatePassword = function (_password, _hash, callback) {
    bcrypt.compare(_password, _hash, function(err, res) {
        callback(res);
    });
};

exports.insert = function(_account) {
    var pass;
    bcrypt.hash(_account.Password, saltRounds, function(err, hash) {
        pass = hash;
    });

    db.connection.query("INSERT INTO `accounts` (`Username`, `Password`, `RoleId`, `Status`, `EmployeeId`, " +
        "`TelegramChatId`) VALUES (?,?,?,?,?,?);",
        [_account.Username, pass, _account.RoleId, _account.Status, _account.EmployeeId, _account.TelegramChatId],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `accounts` WHERE `Id`=?;", [_id], function(err, rows) {
        if (err) throw err;
        else {
            if (rows[0].Id === _id)
                return callback(rows[0]);
            else
                return callback(null);
        }
    });
};

exports.update = function(_id, _account) {
    var pass;
    bcrypt.hash(_account.Password, saltRounds, function(err, hash) {
        pass = hash;
    });
    db.connection.query("UPDATE `accounts` SET `Username`=?, `Password`=?, `RoleId`=?, `Status`=?, `EmployeeId`=?, " +
        "`TelegramChatId`=? WHERE `Id`=?;",
        [_account.Username, pass, _account.RoleId, _account.Status, _account.EmployeeId, _account.TelegramChatId, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `accounts` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `getAllAccounts-Short`" +
        "WHERE `accounts`.`Username` LIKE CONCAT('%',?,'%') OR `roles`.`Name` LIKE CONCAT('%',?,'%') OR " +
        "`accounts`.`EmployeeId` LIKE CONCAT('%',?,'%') OR `accounts`.`TelegramChatId` LIKE CONCAT('%',?,'%');",
        [_text, _text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.getByUsername = function(_username, callback) {
    db.connection.query("SELECT * FROM `accounts` WHERE `Username`=?;", [_username], function(err, rows) {
        if (err) throw err;
        else {
            if (rows.length > 0 && rows[0].Username === _username)
                return callback(rows[0]);
            else
                return callback(null);
        }
    });
};
