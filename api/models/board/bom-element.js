/**
 * Created by Daniel on 31/05/17.
 */

exports.count = function(callback) {
    db.connection.query("SELECT COUNT(`Id`) AS `Boms` FROM `bomelements`;", function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.getAll = function(callback) {
    db.connection.query("SELECT * FROM `getAllBomElements-Short`;", function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};

exports.insert = function(_bomelement) {
    db.connection.query("INSERT INTO `bomelements` (`ComponentId`,`SchemeReference`,`BomId`,`Mounted`,`Supplied`) " +
        "VALUES (?,?,?,?,?);",
        [_bomelement.ComponentId, _bomelement.SchemeReference, _bomelement.BomId, _bomelement.Mounted, _bomelement.Supplied],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.getById = function(_id, callback) {
    db.connection.query("SELECT * FROM `bomelements` WHERE `Id`=?", [_id], function(err, rows) {
        if (err) throw err;
        else callback(rows[0]);
    });
};

exports.update = function(_id, _bomelement) {
    db.connection.query("UPDATE `bomelements` SET `ComponentId`=?, `SchemeReference`=?, `BomId`=?, `Mounted`=?, `Supplied`=? " +
        "WHERE `Id`=?;",
        [_bomelement.ComponentId, _bomelement.SchemeReference, _bomelement.BomId, _bomelement.Mounted, _bomelement.Supplied, _id],
        function(err) {
            if (err) throw err;
        }
    );
};

exports.delete = function(_id) {
    db.connection.query("DELETE FROM `bomelements` WHERE `Id`=?;", [_id], function(err) {
        if (err) throw err;
    });
};

exports.search = function(_text, callback) {
    db.connection.query("SELECT * FROM `getAllBomElements-Short` " +
        "WHERE `ComponentName` LIKE CONCAT('%',?,'%') OR " +
        "`SchemeReference` LIKE CONCAT('%',?,'%') OR " +
        "`BomId` LIKE CONCAT('%',?,'%') OR " +
        "`Mounted` LIKE CONCAT('%',?,'%') OR " +
        "`Supplied` LIKE CONCAT('%',?,'%');", [_text, _text, _text, _text, _text], function(err, rows) {
        if (err) throw err;
        else callback(rows);
    });
};
