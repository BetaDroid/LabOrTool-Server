/**
 * Created by Daniel on 06/05/17.
 */

const router = require('../../../configuration/router');
const Api = require('../../../configuration/api');
const Footprint = require('../../models/inventory/footprint');

router.get(Api.version+'/inventory/footprints/', function (req, res) {
    Footprint.getAll(function(data) {
        res.json(data);
    });
});

router.post(Api.version+'/inventory/footprints/', function (req, res) {
    Footprint.insert(req.body);
    res.json({});
});

router.get(Api.version+'/inventory/footprints/:id', function (req, res) {
    Footprint.getById(req.params.id, function(data) {
        res.json(data);
    });
});

router.put(Api.version+'/inventory/footprints/:id', function (req, res) {
    Footprint.update(req.params.id, req.body);
    res.json({});
});

router.delete(Api.version+'/inventory/footprints/:id', function (req, res) {
    Footprint.delete(req.params.id);
    res.json({});
});

router.get(Api.version+'/inventory/footprints/search/:text', function (req, res) {
    Footprint.search(req.params.text, function(data) {
        res.json(data);
    });
});

module.exports = router;
