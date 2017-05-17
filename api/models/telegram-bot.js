/**
 * Created by Daniel on 17/05/17.
 */

const Bot = require('../../configuration/telegram-bot');
const request = require('request');

const headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};



exports.sendMessage = function (_chatId, _message) {
    var options = {
        url: Bot.url+Bot.token+'/sendMessage',
        method: 'POST',
        headers: headers,
        form: {'chat_id': _chatId, 'text': _message}
    };
    request.post(options);
};
