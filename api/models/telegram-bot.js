/**
 * Created by Daniel on 17/05/17.
 */

const Bot = require('../../configuration/telegram-bot');
const request = require('request'); // to make http calls
const Priority = require('./priority');
const Status = require('./status');
const Type = require('./type');
const Employee = require('./user/employee');

exports.getMe = function () {

};

exports.sendActivity = function (_chatId, _title, _data) {
    var PriorityName = "", StatusName = "", TypeName = "", EmployeeName = "";

    Priority.getById(_data.PriorityId, function(data) {
        PriorityName = data.Name;

        Status.getById(_data.StatusId, function(data) {
            StatusName = data.Name;

            Type.getById(_data.TypeId, function(data) {
                TypeName = data.Name;

                if (_data.EmployeeId === "")
                    createActivity(_chatId, _title, _data.Title, _data.WorkCode, PriorityName, _data.Deadline, StatusName, TypeName, "", _data.Description);
                else {
                    Employee.getById(_data.EmployeeId, function(data) {
                        EmployeeName = data.Name + " " + data.Surname;

                        createActivity(_chatId, _title, _data.Title, _data.WorkCode, PriorityName, _data.Deadline, StatusName, TypeName, EmployeeName, _data.Description);
                    });
                }
            });
        });

    });
};

function createActivity(_chatId, _messageTitle, _activityTitle, _workCode, _priority, _deadline, _status, _type, _employee, _description) {
    var text = "<b>\uD83D\uDC49"+_messageTitle+"\uD83D\uDC48</b>" +
        "\n<b>Title: </b>" + _activityTitle +
        "\n<b>Work code: </b>" + _workCode +
        "\n<b>Priority: </b>" + _priority +
        "\n<b>Deadline: </b>" + _deadline +
        "\n<b>Status: </b>" + _status +
        "\n<b>Type: </b>" + _type +
        "\n<b>Employee: </b>" + _employee +
        "\n<b>Description: </b>" + _description;
    request.post({
        url: Bot.url+Bot.token+'/sendMessage',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        json: {
            'chat_id': _chatId,
            'text': text,
            'parse_mode': 'HTML',
            'disable_notification': true
        }
    }, function (error, response) {
        if (error !== null)
            return error;
        else
            return response && response.statusCode;
    });
}

exports.sendMessage = function (_chatId, _message) {
    request.post({
        url: Bot.url+Bot.token+'/sendMessage',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        json: {
            'chat_id': _chatId,
            'text': _message
        }
    }, function (error, response) {
        if (error !== null)
            return error;
        else
            return response && response.statusCode;
    });
};

exports.getUpdates = function () {

};
