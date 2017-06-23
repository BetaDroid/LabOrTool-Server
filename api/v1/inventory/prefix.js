/**
 * Created by Daniel on 06/05/17.
 */

const Api = require('../../../configuration/api');
const Prefix = require('../../models/inventory/prefix');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/inventory/prefixes/', Check.isLoggedIn, function (req, res) {
        Prefix.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/inventory/prefixes/:id', Check.isLoggedIn, function (req, res) {
        Prefix.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });
};
