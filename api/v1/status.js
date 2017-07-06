/**
 * Created by Daniel on 30/05/17.
 */

const Api = require('../../configuration/api');
const Status = require('../models/status');
const Check = require('../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/statuses/count', Check.isLoggedIn, function (req, res) {
        Status.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/statuses/', Check.isLoggedIn, function (req, res) {
        Status.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/statuses/:id', Check.isLoggedIn, function (req, res) {
        Status.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });
};
