/**
 * Created by Daniel on 11/06/2017.
 */

const Api = require('../../configuration/api');
const Production = require('../models/production');
const Messages = require('../messages/messages');
const Check = require('../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/productions/count/', Check.isLoggedIn, function (req, res) {
        Production.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/productions/', Check.isLoggedIn, function (req, res) {
        Production.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/productions/', Check.isLoggedIn, function (req, res) {
        Production.insert(req.body);
        res.json({});
    });

    router.get(Api.version+'/productions/:id', Check.isLoggedIn, function (req, res) {
        Production.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/productions/:id', Check.isLoggedIn, function (req, res) {
        Production.update(req.params.id, req.body);
        res.json({});
    });

    router.delete(Api.version+'/productions/:id', Check.isLoggedIn, function (req, res) {
        Production.delete(req.params.id);
        res.json({});
    });

    router.get(Api.version+'/productions/search/:text', Check.isLoggedIn, function (req, res) {
        Production.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
