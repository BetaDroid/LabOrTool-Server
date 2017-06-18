/**
 * Created by Daniel on 06/05/17.
 */

const Api = require('../../../configuration/api');
const Category = require('../../models/inventory/category');
const Messages = require('../../messages/messages');

module.exports = function(router) {

    router.get(Api.version+'/inventory/categories/count/', function (req, res) {
        Category.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/inventory/categories/', function (req, res) {
        Category.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/inventory/categories/', function (req, res) {

        var category = req.body;
        if (category.Name === "")
            res.status(400).json(Messages.inputError);
        else {
            Category.insert(category);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/inventory/categories/:id', function (req, res) {
        Category.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/inventory/categories/:id', function (req, res) {

        var category = req.body;
        var id = req.params.id;
        if (id === "" ||
            id === 0 ||
            category.Name === "")
            res.status(400).json(Messages.inputError);
        else {
            Category.update(id, category);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.delete(Api.version+'/inventory/categories/:id', function (req, res) {

        var id = req.params.id;
        if (id === "" &&
            id === 0)
            res.status(400).json(Messages.inputError);
        else {
            Category.delete(id);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/inventory/categories/search/:text', function (req, res) {
        Category.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
