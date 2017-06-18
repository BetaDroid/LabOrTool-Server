/**
 * Created by Daniel on 10/06/2017.
 */

const Api = require('../../../configuration/api');
const BomElement = require('../../models/board/bom');
const Messages = require('../../messages/messages');

module.exports = function(router) {

    router.get(Api.version+'/board/boms/bomelement/count/', function (req, res) {
        BomElement.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/board/boms/bomelement/', function (req, res) {
        BomElement.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/board/boms/bomelement/', function (req, res) {

        var bomElement = req.body;
        if (!bomElement.ComponentId ||
            bomElement.SchemeReference === "" ||
            !bomElement.BoardId ||
            bomElement.Mounted === "" ||
            bomElement.Supplied === "")
            res.status(400).json(Messages.inputError);
        else {
            BomElement.insert(bom);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/board/boms/bomelement/:id', function (req, res) {
        BomElement.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/board/boms/bomelement/:id', function (req, res) {

        var bomElement = req.body;
        var id = req.params.id;
        if (id === "" ||
            id === 0 ||
            !bomElement.ComponentId ||
            bomElement.SchemeReference === "" ||
            !bomElement.BoardId ||
            bomElement.Mounted === "" ||
            bomElement.Supplied === "")
            res.status(400).json(Messages.inputError);
        else {
            BomElement.update(id, bom);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.delete(Api.version+'/board/boms/bomelement/:id', function (req, res) {

        var id = req.params.id;
        if (id === "" &&
            id === 0)
            res.status(400).json(Messages.inputError);
        else {
            BomElement.delete(id);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/board/boms/bomelement/search/:text', function (req, res) {
        BomElement.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
