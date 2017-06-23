/**
 * Created by Daniel on 10/06/2017.
 */

const Api = require('../../../configuration/api');
const Board = require('../../models/board/board');
const Messages = require('../../messages/messages');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/boards/count/', Check.isLoggedIn, function (req, res) {
        Board.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/boards/', Check.isLoggedIn, function (req, res) {
        Board.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/boards/', Check.isLoggedIn, function (req, res) {

        var board = req.body;
        if (board.Name === "" ||
            board.Revision === "" ||
            board.Particular === "")
            res.status(400).json(Messages.inputError);
        else {
            Board.insert(board);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/boards/:id', Check.isLoggedIn, function (req, res) {
        Board.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/boards/:id', Check.isLoggedIn, function (req, res) {

        var board = req.body;
        var id = req.params.id;
        if (id === "" ||
            id === 0 ||
            board.Name === "" ||
            board.Revision === "" ||
            board.Particular === "")
            res.status(400).json(Messages.inputError);
        else {
            Board.update(id, board);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.delete(Api.version+'/boards/:id', Check.isLoggedIn, function (req, res) {

        var id = req.params.id;
        if (id === "" &&
            id === 0)
            res.status(400).json(Messages.inputError);
        else {
            Board.delete(id);
            res.status(202).json(Messages.inputAccepted);
        }
    });

    router.get(Api.version+'/boards/search/:text', Check.isLoggedIn, function (req, res) {
        Board.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
};
