/**
 * Created by Daniel on 31/05/17.
 */

const db = require('../../../configuration/db');

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Boards` FROM `boards`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `getAllBoards-Short`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_board) {
    db.connection.query("INSERT INTO `boards` (`Name`,`Revision`,`Particular`,`ProjectId`,`Description`) " +
        "VALUES (?,?,?,?,?);",
        [_board.Name, _board.Revision, _board.Particular, _board.ProjectId, _board.Description],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `boards` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _board) {
    db.connection.query("UPDATE `boards` SET `Name`=?, `Revision`=?, `Particular`=?, `ProjectId`=?, `Description`=? " +
        "WHERE `Id`=?;",
        [_board.Name, _board.Revision, _board.Particular, _board.ProjectId, _board.Description, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `boards` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `getAllBoards-Short` " +
        "WHERE `Name` LIKE CONCAT('%',?,'%') OR " +
        "`Revision` LIKE CONCAT('%',?,'%') OR " +
        "`Particular` LIKE CONCAT('%',?,'%') OR " +
        "`ProjectName` LIKE CONCAT('%',?,'%');", [_text, _text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
