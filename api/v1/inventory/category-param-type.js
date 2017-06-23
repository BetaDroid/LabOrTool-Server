/**
 * Created by Daniel on 07/05/17.
 */

const Api = require('../../../configuration/api');
const CPT = require('../../models/inventory/category-param-type');
const Messages = require('../../messages/messages');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/inventory/category-param-types/count/', Check.isLoggedIn, function (req, res) {
        CPT.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/inventory/category-param-types/', Check.isLoggedIn, function (req, res) {
        CPT.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/inventory/category-param-types/', Check.isLoggedIn, function (req, res) {

        var cpt = req.body;
        if (cpt.Name === "" ||
            !cpt.CategoryId ||
            !cpt.UnitId)
            res.status(400).json(Messages.inputError);
        else {
            CPT.insert(cpt);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/inventory/category-param-types/:id', Check.isLoggedIn, function (req, res) {
        CPT.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/inventory/category-param-types/:id', Check.isLoggedIn, function (req, res) {

        var cpt = req.body;
        var id = req.params.id;
        if (id === "" ||
            id === 0 ||
            cpt.Name === "" ||
            !cpt.CategoryId ||
            !cpt.UnitId)
            res.status(400).json(Messages.inputError);
        else {
            CPT.update(id, cpt);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.delete(Api.version+'/inventory/category-param-types/:id', Check.isLoggedIn, function (req, res) {

        var id = req.params.id;
        if (id === "" &&
            id === 0)
            res.status(400).json(Messages.inputError);
        else {
            CPT.delete(id);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/inventory/category-param-types/search/:text', Check.isLoggedIn, function (req, res) {
        CPT.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
