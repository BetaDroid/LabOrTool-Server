/**
 * Created by Daniel on 10/05/17.
 */

const router = require('../../../configuration/router');
const Api = require('../../../configuration/api');
const CP = require('../../models/inventory/component-param');

router.get(Api.version+'/inventory/component-params/', function (req, res) {
    CP.count(function(data) {
        res.json(data);
    });
});

router.post(Api.version+'/inventory/component-param/', function (req, res) {
    CP.insert(req.body);
    res.json({});
});

router.get(Api.version+'/inventory/component-params/:id', function (req, res) {
    CP.getAll(req.params.id, function(data) {
        res.json(data);
    });
});

router.get(Api.version+'/inventory/component-param/:id', function (req, res) {
    CP.getById(req.params.id, function(data) {
        res.json(data);
    });
});

router.put(Api.version+'/inventory/component-param/:id', function (req, res) {
    CP.update(req.params.id, req.body);
    res.json({});
});

router.delete(Api.version+'/inventory/component-param/:id', function (req, res) {
    CP.delete(req.params.id);
    res.json({});
});

module.exports = router;
