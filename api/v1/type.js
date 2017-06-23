/**
 * Created by Daniel on 30/05/17.
 */

const Api = require('../../configuration/api');
const Type = require('../models/type');
const Check = require('../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/types/', Check.isLoggedIn, function (req, res) {
        Type.getAll(function(data) {
            res.json(data);
        });
    });

    router.get(Api.version+'/types/:id', Check.isLoggedIn, function (req, res) {
        Type.getById(req.params.id, function(data) {
            res.json(data);
        });
    });
};
