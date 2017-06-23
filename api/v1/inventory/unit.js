/**
 * Created by Daniel on 06/05/17.
 */

const Api = require('../../../configuration/api');
const Unit = require('../../models/inventory/unit');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/inventory/units/', Check.isLoggedIn, function (req, res) {
        Unit.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/inventory/units/:id', Check.isLoggedIn, function (req, res) {
        Unit.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });
};
