/**
 * Created by Daniel on 06/05/17.
 */

const router = require('../../../configuration/router');
const Api = require('../../../configuration/api');
const Prefix = require('../../models/inventory/prefix');

router.get(Api.version+'/inventory/prefixes/', function (req, res) {
    Prefix.getAll(function(data) {
        res.json(data);
    });
});

router.post(Api.version+'/inventory/prefixes/', function (req, res) {
    Prefix.insert(req.body);
    res.json({});
});

router.get(Api.version+'/inventory/prefixes/:id', function (req, res) {
    Prefix.getById(req.params.id, function(data) {
        res.json(data);
    });
});

router.put(Api.version+'/inventory/prefixes/:id', function (req, res) {
    Prefix.update(req.params.id, req.body);
    res.json({});
});

router.delete(Api.version+'/inventory/prefixes/:id', function (req, res) {
    Prefix.delete(req.params.id);
    res.json({});
});

module.exports = router;
