/**
 * Created by Daniel on 24/04/17.
 */

'use strict';

const db = require('../../../configuration/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

exports.getByUsername = function(_username, callback) {
    db.connection.query("SELECT * FROM `accounts` WHERE `Username`=?;", [_username], function(err, rows) {
        if (err) throw err;
        else {
            if (rows[0].Username === _username)
                return callback(rows[0]);
            else
                return callback(null);
        }
    });
};

exports.getAllChatId = function (callback) {
    db.connection.query("SELECT `TelegramChatId`, `EmployeeId` FROM `accounts`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT `accounts`.`Id`, `accounts`.`Username`, `roles`.`Name` AS `Role`, "+
        "CASE WHEN `accounts`.`Status`=0 THEN 'Inactive' ELSE 'Active' END AS `Status`, `accounts`.`EmployeeId`"+
        "FROM `accounts` INNER JOIN `roles` ON `roles`.`Id`=`accounts`.`RoleId`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.validatePassword = function (_password, _hash, callback) {
    bcrypt.compare(_password, _hash, function(err, res) {
        callback(res);
    });
};

exports.hashPassword = function (_password) {
    bcrypt.hash(_password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
    });
};
