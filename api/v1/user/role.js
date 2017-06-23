/**
 * Created by Daniel on 14/05/17.
 */

const Api = require('../../../configuration/api');
const Role = require('../../models/user/role');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/user/roles/', Check.isLoggedIn, function (req, res) {
        Role.getAll(function(data) {
            res.json(data);
        });
    });

    router.get(Api.version+'/user/roles/:id', Check.isLoggedIn, function (req, res) {
        Role.getById(req.params.id, function(data) {
            res.json(data);
        });
    });
};
