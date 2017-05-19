/**
 * Created by Daniel on 14/05/17.
 */

const Api = require('../../../configuration/api');
const Role = require('../../models/user/role');

module.exports = function(router) {

    router.get(Api.version+'/user/roles/', function (req, res) {
        Role.getAll(function(data) {
            res.json(data);
        });
    });

    router.get(Api.version+'/user/roles/:id', function (req, res) {
        Role.getById(req.params.id, function(data) {
            res.json(data);
        });
    });
};
