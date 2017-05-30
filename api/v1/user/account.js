/**
 * Created by Daniel on 14/05/17.
 */

const Api = require('../../../configuration/api');
const Account = require('../../models/user/account');

module.exports = function(router) {

    router.get(Api.version+'/user/accounts/', function (req, res) {
        Account.getAll(function(data) {
            res.json(data);
        });
    });

    router.post(Api.version+'/user/accounts/', function (req, res) {
        Account.insert(req.body);
        res.json({});
    });

    router.get(Api.version+'/user/accounts/:id', function (req, res) {
        Account.getById(req.params.id, function(data) {
            res.json(data);
        });
    });

    router.put(Api.version+'/user/accounts/:id', function (req, res) {
        Account.update(req.params.id, req.body);
        res.json({});
    });

    router.delete(Api.version+'/user/accounts/:id', function (req, res) {
        Account.delete(req.params.id);
        res.json({});
    });

    router.get(Api.version+'/user/accounts/search/:text', function (req, res) {
        Account.search(req.params.text, function(data) {
            res.json(data);
        });
    });
};
