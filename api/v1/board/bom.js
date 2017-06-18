/**
 * Created by Daniel on 10/06/2017.
 */

const Api = require('../../../configuration/api');
const Bom = require('../../models/board/bom');
const Messages = require('../../messages/messages');

module.exports = function(router) {

    router.get(Api.version+'/board/boms/count/', function (req, res) {
        Bom.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/board/boms/', function (req, res) {
        Bom.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/board/boms/', function (req, res) {

        var bom = req.body;
        if (!bom.BoardId ||
            bom.Revision === "" ||
            bom.Date === "")
            res.status(400).json(Messages.inputError);
        else {
            Bom.insert(bom);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/board/boms/:id', function (req, res) {
        Bom.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/board/boms/:id', function (req, res) {

        var bom = req.body;
        var id = req.params.id;
        if (id === "" ||
            id === 0 ||
            !bom.BoardId ||
            bom.Revision === "" ||
            bom.Date === "")
            res.status(400).json(Messages.inputError);
        else {
            Bom.update(id, bom);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.delete(Api.version+'/board/boms/:id', function (req, res) {

        var id = req.params.id;
        if (id === "" &&
            id === 0)
            res.status(400).json(Messages.inputError);
        else {
            Bom.delete(id);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/board/boms/search/:text', function (req, res) {
        Bom.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
