/**
 * Created by Daniel on 14/05/17.
 */

const Api = require('../../configuration/api');
const Activity = require('../models/activity');
const Bot = require('../models/telegram-bot');
const Account = require('../models/user/account');
const Check = require('../models/authentication');

module.exports = function(router) {

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
        Account.getAllChatId(function (data) {
            for (var i=0; i < data.length; i++) {
                if (data[i].EmployeeId === req.body.EmployeeId && data[i].EmployeeId !== null && data[i].TelegramChatId !== null) {
                    Bot.sendActivity(data[i].TelegramChatId, 'New activity was assigned to you!', req.body);
                }
                else if (data[i].TelegramChatId !== null) {
                    Bot.sendActivity(data[i].TelegramChatId, 'New activity was created!', req.body);
                }
            }
        });
        res.json({});
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
};
