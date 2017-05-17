/**
 * Created by Daniel on 24/04/17.
 */

const db = require('../../../configuration/db');

exports.getById = function(_id, cb) {
    process.nextTick(function() {
        db.connection.query("SELECT * FROM `accounts` WHERE `Id`=?;", [_id], function(err, rows) {
            if (err) throw err;
            else {
                if (rows[0])
                    return cb(null, rows[0]);
                else
                    cb(new Error('User ' + _id + ' does not exist'));
            }
        });
    });
};

exports.getByUsername = function(_username, cb) {
    db.connection.query("SELECT * FROM `accounts` WHERE `Username`=?;", [_username], function(err, rows) {
        if (err) throw err;
        else {
            if (rows[0].Username === _username)
                return cb(null, rows[0]);
            else
                return cb(null, null);
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

