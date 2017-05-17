/**
 * Created by Daniel on 17/05/17.
 */

const Bot = require('../../configuration/telegram-bot');
const request = require('request');

exports.getMe = function () {

};

exports.sendMessage = function (_chatId, _title, _data) {
    var text = "<b>\uD83D\uDC49"+_title+"\uD83D\uDC48</b>" +
        "\n<b>Title: </b>" + _data.Title +
        "\n<b>Work code: </b>" + _data.WorkCode +
        "\n<b>Priority: </b>" + _data.PriorityId +
        "\n<b>Deadline: </b>" + _data.Deadline +
        "\n<b>Status: </b>" + _data.StatusId +
        "\n<b>Type: </b>" + _data.TypeId +
        "\n<b>Employee: </b>" + _data.EmployeeId +
        "\n<b>Description: </b>" + _data.Description;
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
};

exports.getUpdates = function () {

};
