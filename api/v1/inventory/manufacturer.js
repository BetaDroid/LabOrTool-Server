/**
 * Created by Daniel on 06/05/17.
 */

const Api = require('../../../configuration/api');
const Manufacturer = require('../../models/inventory/manufacturer');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/inventory/manufacturers/count/', function (req, res) {
        Manufacturer.count(function(data) {
            res.json(data);
        });
    });

    router.get(Api.version+'/inventory/manufacturers/', function (req, res) {
        Manufacturer.getAll(function(data) {
            res.json(data);
        });
    });

    router.post(Api.version+'/inventory/manufacturers/', function (req, res) {
        Manufacturer.insert(req.body);
        res.json({});
    });

    router.get(Api.version+'/inventory/manufacturers/:id', function (req, res) {
        Manufacturer.getById(req.params.id, function(data) {
            res.json(data);
        });
    });

    router.put(Api.version+'/inventory/manufacturers/:id', function (req, res) {
        Manufacturer.update(req.params.id, req.body);
        res.json({});
    });

    router.delete(Api.version+'/inventory/manufacturers/:id', function (req, res) {
        Manufacturer.delete(req.params.id);
        res.json({});
    });

    router.get(Api.version+'/inventory/manufacturers/search/:text', function (req, res) {
        Manufacturer.search(req.params.text, function(data) {
            res.json(data);
        });
    });
};
