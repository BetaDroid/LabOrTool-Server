/**
 * Created by Daniel on 06/05/17.
 */

const Api = require('../../../configuration/api');
const Footprint = require('../../models/inventory/footprint');

module.exports = function(router) {

    router.get(Api.version+'/inventory/footprints/', function (req, res) {
        Footprint.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/inventory/footprints/', function (req, res) {
        Footprint.insert(req.body);
        res.status(202).json({});
    });

    router.get(Api.version+'/inventory/footprints/:id', function (req, res) {
        Footprint.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/inventory/footprints/:id', function (req, res) {
        Footprint.update(req.params.id, req.body);
        res.status(202).json({});
    });

    router.delete(Api.version+'/inventory/footprints/:id', function (req, res) {
        Footprint.delete(req.params.id);
        res.status(202).json({});
    });

    router.get(Api.version+'/inventory/footprints/search/:text', function (req, res) {
        Footprint.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
