/**
 * Created by Daniel on 06/05/17.
 */

const router = require('../../../configuration/router');
const Api = require('../../../configuration/api');
const Category = require('../../models/inventory/category');

router.get(Api.version+'/inventory/categories/', function (req, res) {
    Category.getAll(function(data) {
        res.json(data);
    });
});

router.post(Api.version+'/inventory/categories/', function (req, res) {
    Category.insert(req.body);
    res.json({});
});

router.get(Api.version+'/inventory/categories/:id', function (req, res) {
    Category.getById(req.params.id, function(data) {
        res.json(data);
    });
});

router.put(Api.version+'/inventory/categories/:id', function (req, res) {
    Category.update(req.params.id, req.body);
    res.json({});
});

router.delete(Api.version+'/inventory/categories/:id', function (req, res) {
    Category.delete(req.params.id);
    res.json({});
});

router.get(Api.version+'/inventory/categories/search/:text', function (req, res) {
    Category.search(req.params.text, function(data) {
        res.json(data);
    });
});

module.exports = router;

