/**
 * Created by Daniel on 11/06/2017.
 */

const Api = require('../../../configuration/api');
const NoteType = require('../../models/note/note-type');

module.exports = function(router) {

    router.get(Api.version+'/notes/types/count/', function (req, res) {
        NoteType.count(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/notes/types/', function (req, res) {
        NoteType.getAll(function(data) {
            res.status(200).json(data);
        });
    });

    router.get(Api.version+'/notes/types/:id', function (req, res) {
        NoteType.getById(req.params.id, function(data) {
            res.status(200).json(data);
        });
    });
};
