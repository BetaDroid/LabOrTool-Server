/**
 * Created by Daniel on 05/05/17.
 */

const Api = require('../../../configuration/api');
const Distributor = require('../../models/inventory/distributor');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/inventory/distributors/count/', Check.isLoggedIn, function (req, res) {
        Distributor.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/inventory/distributors/', Check.isLoggedIn, function (req, res) {
        Distributor.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/inventory/distributors/', Check.isLoggedIn, function (req, res) {
        Distributor.insert(req.body);
        res.status(202).json({});
    });

    router.get(Api.version+'/inventory/distributors/:id', Check.isLoggedIn, function (req, res) {
        Distributor.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/inventory/distributors/:id', Check.isLoggedIn, function (req, res) {
        Distributor.update(req.params.id, req.body);
        res.status(202).json({});
    });

    router.delete(Api.version+'/inventory/distributors/:id', Check.isLoggedIn, function (req, res) {
        Distributor.delete(req.params.id);
        res.status(202).json({});
    });

    router.get(Api.version+'/inventory/distributors/search/:text', Check.isLoggedIn, function (req, res) {
        Distributor.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
