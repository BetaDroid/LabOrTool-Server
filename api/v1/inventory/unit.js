/**
 * Created by Daniel on 06/05/17.
 */

const router = require('../../../configuration/router');
const Api = require('../../../configuration/api');
const Unit = require('../../models/inventory/unit');

router.get(Api.version+'/inventory/units/', function (req, res) {
    Unit.getAll(function(data) {
        res.json(data);
    });
});

router.post(Api.version+'/inventory/units/', function (req, res) {
    Unit.insert(req.body);
    res.json({});
});

router.get(Api.version+'/inventory/units/:id', function (req, res) {
    Unit.getById(req.params.id, function(data) {
        res.json(data);
    });
});

router.put(Api.version+'/inventory/units/:id', function (req, res) {
    Unit.update(req.params.id, req.body);
    res.json({});
});

router.delete(Api.version+'/inventory/units/:id', function (req, res) {
    Unit.delete(req.params.id);
    res.json({});
});

module.exports = router;
