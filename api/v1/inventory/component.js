/**
 * Created by Daniel on 06/05/17.
 */

const Api = require('../../../configuration/api');
const Component = require('../../models/inventory/component');
const Messages = require('../../messages/messages');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/inventory/components/count/', Check.isLoggedIn, function (req, res) {
        Component.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/inventory/components/', Check.isLoggedIn, function (req, res) {
        Component.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/inventory/components/', Check.isLoggedIn, function (req, res) {

        var component = req.body;
        if (component.Name === "" ||
            !component.ManufacturerId ||
            component.PartNumber === "" ||
            !component.DistributorId ||
            component.DistributorCode === "" ||
            component.Price === "" ||
            component.Code === "" ||
            !component.LocationId ||
            component.Datasheet === "" ||
            !component.FootprintId ||
            !component.CategoryId)
            res.status(400).json(Messages.inputError);
        else {
            Component.insert(component);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/inventory/components/:id', Check.isLoggedIn, function (req, res) {
        Component.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/inventory/components/:id', Check.isLoggedIn, function (req, res) {

        var component = req.body;
        var id = req.params.id;
        if (id === "" ||
            id === 0 ||
            component.Name === "" ||
            !component.ManufacturerId ||
            component.PartNumber === "" ||
            !component.DistributorId ||
            component.DistributorCode === "" ||
            component.Price === "" ||
            component.Code === "" ||
            !component.LocationId ||
            component.Datasheet === "" ||
            !component.FootprintId ||
            !component.CategoryId)
            res.status(400).json(Messages.inputError);
        else {
            Component.update(id, component);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.delete(Api.version+'/inventory/components/:id', Check.isLoggedIn, function (req, res) {

        var id = req.params.id;
        if (id === "" &&
            id === 0)
            res.status(400).json(Messages.inputError);
        else {
            Component.delete(id);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/inventory/components/search/:text', Check.isLoggedIn, function (req, res) {
        Component.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
