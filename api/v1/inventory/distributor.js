/**
 * Created by Daniel on 05/05/17.
 */

const Api = require('../../../configuration/api');
const Distributor = require('../../models/inventory/distributor');

module.exports = function(router) {

    router.get(Api.version+'/inventory/distributors/count/', function (req, res) {
        Distributor.count(function(data) {
            res.json(data);
        });
    });

    router.get(Api.version+'/inventory/distributors/', function (req, res) {
        Distributor.getAll(function(data) {
            res.json(data);
        });
    });

    router.post(Api.version+'/inventory/distributors/', function (req, res) {
        Distributor.insert(req.body);
        res.json({});
    });

    router.get(Api.version+'/inventory/distributors/:id', function (req, res) {
        Distributor.getById(req.params.id, function(data) {
            res.json(data);
        });
    });

    router.put(Api.version+'/inventory/distributors/:id', function (req, res) {
        Distributor.update(req.params.id, req.body);
        res.json({});
    });

    router.delete(Api.version+'/inventory/distributors/:id', function (req, res) {
        Distributor.delete(req.params.id);
        res.json({});
    });

    router.get(Api.version+'/inventory/distributors/search/:text', function (req, res) {
        Distributor.search(req.params.text, function(data) {
            res.json(data);
        });
    });
};
