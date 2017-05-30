/**
 * Created by Daniel on 30/05/17.
 */

const Api = require('../../configuration/api');
const Status = require('../models/status');

module.exports = function(router) {

    router.get(Api.version+'/statuses/', function (req, res) {
        Status.getAll(function(data) {
            res.json(data);
        });
    });

    router.get(Api.version+'/statuses/:id', function (req, res) {
        Status.getById(req.params.id, function(data) {
            res.json(data);
        });
    });
};
