/**
 * Created by Daniel on 10/05/17.
 */

const Api = require('../../../configuration/api');
const CP = require('../../models/inventory/component-param');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/inventory/component-params/count', Check.isLoggedIn, function (req, res) {
        CP.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/inventory/component-param/', Check.isLoggedIn, function (req, res) {
        CP.insert(req.body);
        res.status(202).json({});
    });

    router.get(Api.version+'/inventory/component-params/:id', Check.isLoggedIn, function (req, res) {
        CP.getAll(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/inventory/component-param/:id', Check.isLoggedIn, function (req, res) {
        CP.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/inventory/component-param/:id', Check.isLoggedIn, function (req, res) {
        CP.update(req.params.id, req.body);
        res.status(202).json({});
    });

    router.delete(Api.version+'/inventory/component-param/:id', Check.isLoggedIn, function (req, res) {
        CP.delete(req.params.id);
        res.status(202).json({});
    });
};
