/**
 * Created by Daniel on 14/05/17.
 */

const router = require('../../configuration/router');
const Api = require('../../configuration/api');
const Activity = require('../models/activity');
const Bot = require('../models/telegram-bot');

router.get(Api.version+'/activities/count/', function (req, res) {
    Activity.count(function(data) {
        res.json(data);
    });
});

router.get(Api.version+'/activities/', function (req, res) {
    Activity.getAll(function(data) {
        res.json(data);
    });
});

router.post(Api.version+'/activities/', function (req, res) {
    Activity.insert(req.body);
    res.json({});

    Bot.sendMessage('259695544', 'New activity was created!');
});

router.get(Api.version+'/activities/:id', function (req, res) {
    Activity.getById(req.params.id, function(data) {
        res.json(data);
    });
});

router.put(Api.version+'/activities/:id', function (req, res) {
    Activity.update(req.params.id, req.body);
    res.json({});
});

router.delete(Api.version+'/activities/:id', function (req, res) {
    Activity.delete(req.params.id);
    res.json({});
});

router.get(Api.version+'/activities/search/:text', function (req, res) {
    Activity.search(req.params.text, function(data) {
        res.json(data);
    });
});

module.exports = router;
