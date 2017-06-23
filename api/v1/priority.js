/**
 * Created by Daniel on 30/05/17.
 */

const Api = require('../../configuration/api');
const Priority = require('../models/priority');
const Check = require('../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/priorities/', Check.isLoggedIn, function (req, res) {
        Priority.getAll(function(data) {
            res.json(data);
        });
    });

    router.get(Api.version+'/priorities/:id', Check.isLoggedIn, function (req, res) {
        Priority.getById(req.params.id, function(data) {
            res.json(data);
        });
    });
};
