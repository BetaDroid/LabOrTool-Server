/**
 * Created by Daniel on 06/05/17.
 */

const router = require('../../configuration/router');
const cn = require('../../configuration/db');

router.get('/inventory/categories/', function (req, res) {
    cn.query('SELECT * FROM categories;', function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

router.post('/inventory/categories/', function (req, res) {
    cn.query("INSERT INTO categories (Name, Note) " +
        "VALUES ('" + req.body.Name + "', '" + req.body.Note + "');", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/categories/:id', function (req, res) {
    cn.query("SELECT * FROM categories WHERE Id = "+ req.params.id +";", function(err, rows) {
        if (err) throw err;
        else res.json(rows[0]);
    });
});

router.put('/inventory/categories/:id', function (req, res) {
    cn.query("UPDATE categories SET Name = '" + req.body.Name + "', Note = '" + req.body.Note + "' " +
        "WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.delete('/inventory/categories/:id', function (req, res) {
    cn.query("DELETE FROM categories WHERE Id = " + req.params.id + ";", function(err, rows) {
        if (err) throw err;
        else res.json(true);
    });
});

router.get('/inventory/categories/search/:text', function (req, res) {
    cn.query("SELECT * FROM categories WHERE Name LIKE '%"+ req.params.text +"%';", function(err, rows) {
        if (err) throw err;
        else res.json(rows);
    });
});

module.exports = router;

