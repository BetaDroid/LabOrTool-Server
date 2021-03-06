/**
 * Created by Daniel on 11/06/2017.
 */

const Api = require('../../../configuration/api');
const NoteType = require('../../models/note/note-type');
const Check = require('../../models/authentication');

module.exports = function(router) {

    router.get(Api.version+'/notes/types/count/', Check.isLoggedIn, function (req, res) {
        NoteType.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/notes/types/', Check.isLoggedIn, function (req, res) {
        NoteType.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/notes/types/:id', Check.isLoggedIn, function (req, res) {
        NoteType.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });
};
