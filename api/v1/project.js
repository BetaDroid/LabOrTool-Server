/**
 * Created by Daniel on 11/06/2017.
 */

const Api = require('../../configuration/api');
const Project = require('../models/project');
const Messages = require('../messages/messages');
const Check = require('../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/projects/count/', Check.isLoggedIn, function (req, res) {
        Project.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/projects/', Check.isLoggedIn, function (req, res) {
        Project.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/projects/', Check.isLoggedIn, function (req, res) {
        Project.insert(req.body);
        res.json({});
    });

    router.get(Api.version+'/projects/:id', Check.isLoggedIn, function (req, res) {
        Project.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/projects/:id', Check.isLoggedIn, function (req, res) {
        Project.update(req.params.id, req.body);
        res.json({});
    });

    router.delete(Api.version+'/projects/:id', function (req, res) {
        Project.delete(req.params.id);
        res.json({});
    });

    router.get(Api.version+'/projects/search/:text', Check.isLoggedIn, function (req, res) {
        Project.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
