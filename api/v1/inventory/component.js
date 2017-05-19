/**
 * Created by Daniel on 06/05/17.
 */

const Api = require('../../../configuration/api');
const Component = require('../../models/inventory/component');

module.exports = function(router) {

    router.get(Api.version+'/inventory/components/count/', function (req, res) {
        Component.count(function(data) {
            res.json(data);
        });
    });

    router.get(Api.version+'/inventory/components/', function (req, res) {
        Component.getAll(function(data) {
            res.json(data);
        });
    });

    router.post(Api.version+'/inventory/components/', function (req, res) {
        Component.insert(req.body);
        res.json({});
    });

    router.get(Api.version+'/inventory/components/:id', function (req, res) {
        Component.getById(req.params.id, function(data) {
            res.json(data);
        });
    });

    router.put(Api.version+'/inventory/components/:id', function (req, res) {
        Component.update(req.params.id, req.body);
        res.json({});
    });

    router.delete(Api.version+'/inventory/components/:id', function (req, res) {
        Component.delete(req.params.id);
        res.json({});
    });

    router.get(Api.version+'/inventory/components/search/:text', function (req, res) {
        Component.search(req.params.text, function(data) {
            res.json(data);
        });
    });
};
