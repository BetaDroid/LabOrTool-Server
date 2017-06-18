/**
 * Created by Daniel on 06/05/17.
 */

const Api = require('../../../configuration/api');
const Location = require('../../models/inventory/location');

module.exports = function(router) {

    router.get(Api.version+'/inventory/locations/count/', function (req, res) {
        Location.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/inventory/locations/', function (req, res) {
        Location.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/inventory/locations/', function (req, res) {
        Location.insert(req.body);
        res.status(202).json({});
    });

    router.get(Api.version+'/inventory/locations/:id', function (req, res) {
        Location.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/inventory/locations/:id', function (req, res) {
        Location.update(req.params.id, req.body);
        res.status(202).json({});
    });

    router.delete(Api.version+'/inventory/locations/:id', function (req, res) {
        Location.delete(req.params.id);
        res.status(202).json({});
    });

    router.get(Api.version+'/inventory/locations/search/:text', function (req, res) {
        Location.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
