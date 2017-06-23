/**
 * Created by Daniel on 14/05/17.
 */

const Api = require('../../../configuration/api');
const Employee = require('../../models/user/employee');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/user/employees/count', Check.isLoggedIn, function (req, res) {
        Employee.count(function(data) {
            res.json(data);
        });
    });

    router.get(Api.version+'/user/employees/', Check.isLoggedIn, function (req, res) {
        Employee.getAll(function(data) {
            res.json(data);
        });
    });

    router.post(Api.version+'/user/employees/', Check.isLoggedIn, function (req, res) {
        Employee.insert(req.body);
        res.json({});
    });

    router.get(Api.version+'/user/employees/:id', Check.isLoggedIn, function (req, res) {
        Employee.getById(req.params.id, function(data) {
            res.json(data);
        });
    });

    router.put(Api.version+'/user/employees/:id', Check.isLoggedIn, function (req, res) {
        Employee.update(req.params.id, req.body);
        res.json({});
    });

    router.delete(Api.version+'/user/employees/:id', Check.isLoggedIn, function (req, res) {
        Employee.delete(req.params.id);
        res.json({});
    });

    router.get(Api.version+'/user/employees/search/:text', Check.isLoggedIn, function (req, res) {
        Employee.search(req.params.text, function(data) {
            res.json(data);
        });
    });
};
