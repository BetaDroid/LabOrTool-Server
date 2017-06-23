/**
 * Created by Daniel on 06/05/17.
 */

const Api = require('../../../configuration/api');
const Manufacturer = require('../../models/inventory/manufacturer');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/inventory/manufacturers/count/', Check.isLoggedIn, function (req, res) {
        Manufacturer.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/inventory/manufacturers/', Check.isLoggedIn, function (req, res) {
        Manufacturer.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/inventory/manufacturers/', Check.isLoggedIn, function (req, res) {
        Manufacturer.insert(req.body);
        res.status(202).json({});
    });

    router.get(Api.version+'/inventory/manufacturers/:id', Check.isLoggedIn, function (req, res) {
        Manufacturer.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/inventory/manufacturers/:id', Check.isLoggedIn, function (req, res) {
        Manufacturer.update(req.params.id, req.body);
        res.status(202).json({});
    });

    router.delete(Api.version+'/inventory/manufacturers/:id', Check.isLoggedIn, function (req, res) {
        Manufacturer.delete(req.params.id);
        res.status(202).json({});
    });

    router.get(Api.version+'/inventory/manufacturers/search/:text', Check.isLoggedIn, function (req, res) {
        Manufacturer.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
