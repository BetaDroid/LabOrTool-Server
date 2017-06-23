/**
 * Created by Daniel on 11/06/2017.
 */

const Api = require('../../../configuration/api');
const Note = require('../../models/note/note');
const Messages = require('../../messages/messages');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/notes/count/:id', Check.isLoggedIn, function (req, res) {
        Note.countPerParent(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/notes/count/', Check.isLoggedIn, function (req, res) {
        Note.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/notes/', Check.isLoggedIn, function (req, res) {
        Note.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.post(Api.version+'/notes/', Check.isLoggedIn, function (req, res) {
        Note.insert(req.body);
        res.json({});
    });

    router.get(Api.version+'/notes/:id', Check.isLoggedIn, function (req, res) {
        Note.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });

    router.put(Api.version+'/notes/:id', Check.isLoggedIn, function (req, res) {
        Note.update(req.params.id, req.body);
        res.json({});
    });

    router.delete(Api.version+'/notes/:id', Check.isLoggedIn, function (req, res) {
        Note.delete(req.params.id);
        res.json({});
    });

    /*
    router.get(Api.version+'/notes/search/:text', Check.isLoggedIn, function (req, res) {
        Note.search(req.params.text, function(data) {
            res.status(200).json(data);
        });
    });
    */
};
