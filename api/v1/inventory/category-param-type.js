/**
 * Created by Daniel on 07/05/17.
 */

const router = require('../../../configuration/router');
const Api = require('../../../configuration/api');
const CPT = require('../../models/inventory/category-param-type');

router.get(Api.version+'/inventory/category-param-types/', function (req, res) {
    CPT.getAll(function(data) {
        res.json(data);
    });
});

router.post(Api.version+'/inventory/category-param-types/', function (req, res) {
    CPT.insert(req.body);
    res.json({});
});

router.get(Api.version+'/inventory/category-param-types/:id', function (req, res) {
    CPT.getById(req.params.id, function(data) {
        res.json(data);
    });
});

router.put(Api.version+'/inventory/category-param-types/:id', function (req, res) {
    CPT.update(req.params.id, req.body);
    res.json({});
});

router.delete(Api.version+'/inventory/category-param-types/:id', function (req, res) {
    CPT.delete(req.params.id);
    res.json({});
});

router.get(Api.version+'/inventory/category-param-types/search/:text', function (req, res) {
    CPT.search(req.params.text, function(data) {
        res.json(data);
    });
});

module.exports = router;
