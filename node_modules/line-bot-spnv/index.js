/**

repo : https://supanatvee@bitbucket.org/supanatve/line-bot.git
description : DON'T write to this file . This file contain a source code that using in
interface with LINE bot in line application 
author : spnv

**/


// import module
var request = require('request');
// var btoa = require('btoa');

// private
var PUSH_URL = 'https://api.line.me/v2/bot/message/push';
var REPLY_URL = 'https://api.line.me/v2/bot/message/reply';
var PROF_URL = 'https://api.line.me/v2/bot/profile/';

// public
// constructor
function LINE_SPNV(channeltoken, name) {
    this.channeltoken = channeltoken;
    this.name = name;
    console.log(" LINE_BOT_SPNV Console : " + name + " start working ");
    /* Example =>
    var bot = new lineBot(define.CHANNELTOKEN, "bot-name");
    */
}

/******** LINE HTTP ********/
LINE_SPNV.prototype.linePostReq = function(_url, _body) {
    request.post({
        headers: {
            'content-type': 'application/json',
            'Authorization': " Bearer " + this.channeltoken
        },
        url: _url,
        body: _body
    });
    /* Example => 
    this.linePostReq(PUSH_URL, _jsonBody);
    */
};

/******** Deliver-message ********/
LINE_SPNV.prototype.pushMsg = function(_rev, _jsonMsg) {
    /* about _jsonMsg goto Build-message section */
    var _jsonBody = JSON.stringify({ "to": _rev, "messages": _jsonMsg });
    this.linePostReq(PUSH_URL, _jsonBody);
    /* Example => 
    app.post('/line-hook', function(req, res) {

        var data = req.body.events[0];
        var text = [];
        text.push(bot.msgText("Hello world"));
        bot.pushMsg(data.source.userId, text);

        res.end();
    });
    */
    /* more info https://devdocs.line.me/en/#push-message */
};
// LINE_SPNV.prototype.getProf = function(userId) {
//     /* about _jsonMsg goto Build-message section */
//     var req = request.get({
//         headers: {
//             'Authorization': " Bearer " + this.channeltoken
//         },
//         url: PROF_URL,
//     });
//     return req.pictureUrl;
//     /* more info https://devdocs.line.me/en/#get-profile */
// };
LINE_SPNV.prototype.replyMsg = function(_token, _jsonMsg) {
    /* about _jsonMsg goto Build-message section */
    var _jsonBody = JSON.stringify({ "replyToken": _token, "messages": _jsonMsg });
    this.linePostReq(REPLY_URL, _jsonBody);
    /* more info https://devdocs.line.me/en/#reply-message */
};

/******** Build-template ********/
LINE_SPNV.prototype.tmpButton = function(_alt, _thumbnail, _title, _text, _jsonAct) {
    /* about _jsonAct goto Build-action section */
    return {
        "type": "template",
        "altText": _alt,
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": _thumbnail,
            "title": _title,
            "text": _text,
            "actions": _jsonAct
        }
    };
    /* Example => 
    var lstAct = [];
    lstAct.push(bot.act('message', 'message', 'message'));
    lstAct.push(bot.act('postback', 'postback', 'data=1'));
    lstAct.push(bot.act('uri', 'uri', 'https://devdocs.line.me/en/#template-messages'));
    var tmpMsg = [];
    tmpMsg.push(bot.tmpButton('Hello , world',
        'https://example.com/bot/images/image.jpg',
        'Hello , world',
        'Im Api teset bot',
        lstAct));
    bot.pushMsg(data.source.userId, tmpMsg);
    */
    /* more info https://devdocs.line.me/en/#template-messages */
};

LINE_SPNV.prototype.tmpConfirm = function(_alt, _text, _jsonAct) {
    /* about _jsonAct goto Build-action section */
    return {
        "type": "template",
        "altText": _alt,
        "template": {
            "type": "confirm",
            "text": _text,
            "actions": _jsonAct
        }
    };
    /* Example => 
    var lstAct = [];
    lstAct.push(bot.act('message', 'ok', 'ok'));
    lstAct.push(bot.act('message', 'cancel', 'cancel'));
    var tmpMsg = [];
    tmpMsg.push(bot.tmpConfirm('Confirm',
        'Confirm',
        lstAct));
    bot.pushMsg(data.source.userId, tmpMsg);
    */
    /* more info https://devdocs.line.me/en/#template-messages */
};

LINE_SPNV.prototype.tmpCarousel = function(_alt, _jsonCol) {
    /* about _jsonAct goto Build-column section */
    return {
        "type": "template",
        "altText": _alt,
        "template": {
            "type": "carousel",
            "columns": _jsonCol
        }
    };
    /* Example => 
    var lstAct = [];
    lstAct.push(bot.act('message', 'ok', 'ok'));
    lstAct.push(bot.act('message', 'cancel', 'cancel'));
    var lstCol = [];
    lstCol.push(bot.col('https://example.com/bot/images/image.jpg',
        'Col 1',
        'This is column 1',
        lstAct));
    lstCol.push(bot.col('https://example.com/bot/images/image.jpg',
        'Col 2',
        'This is column 2',
        lstAct));
    lstCol.push(bot.col('https://example.com/bot/images/image.jpg',
        'Col 3',
        'This is column 3',
        lstAct));
    var tmpMsg = [];
    tmpMsg.push(bot.tmpCarousel('List',
        lstCol));
    bot.pushMsg(data.source.userId, tmpMsg);
    */
    /* more info https://devdocs.line.me/en/#template-messages */
};

/******** Build-column ********/
LINE_SPNV.prototype.col = function(_thumbnail, _title, _text, _jsonAct) {
    /* about _jsonAct goto Build-action section */
    return {
        "thumbnailImageUrl": _thumbnail,
        "title": _title,
        "text": _text,
        "actions": _jsonAct
    };
    /* Example => 
    var lstAct = [];
    lstAct.push(bot.act('message', 'ok', 'ok'));
    lstAct.push(bot.act('message', 'cancel', 'cancel'));
    var lstCol = [];
    lstCol.push(bot.col('https://example.com/bot/images/image.jpg',
        'Col 1',
        'This is column 1',
        lstAct));
    lstCol.push(bot.col('https://example.com/bot/images/image.jpg',
        'Col 2',
        'This is column 2',
        lstAct));
    lstCol.push(bot.col('https://example.com/bot/images/image.jpg',
        'Col 3',
        'This is column 3',
        lstAct));
    var tmpMsg = [];
    tmpMsg.push(bot.tmpCarousel('List',
        lstCol));
    bot.pushMsg(data.source.userId, tmpMsg);
    */
    /* more info https://devdocs.line.me/en/#template-messages */
    /* more info https://devdocs.line.me/en/#template-messages */
};

/******** Build-message ********/
LINE_SPNV.prototype.msgText = function(_txt) {
    return {
        "type": "text",
        "text": _txt
    };
    /* Example => 
    app.post('/line-hook', function(req, res) {

        var data = req.body.events[0];
        var text = [];
        text.push(bot.msgText("Hello world"));
        bot.pushMsg(data.source.userId, text);

        res.end();
    });
    */
    /* more info https://devdocs.line.me/en/#send-message-object */
};

/******** Build-action ********/
LINE_SPNV.prototype.act = function(_type, _label, _data) {

    switch (_type) {
        case 'postback':
            return {
                "type": _type,
                "label": _label,
                'data': _data
            };
        case 'uri':
            return {
                "type": _type,
                "label": _label,
                'uri': _data
            };
        case 'message':
            return {
                "type": _type,
                "label": _label,
                'text': _data
            };
        default:
            console.log(" LINE_SPNV Console : " + name + " -> act : err _type ");
            return { "err": 'action wrong type' };
    }
    /* Example => 
    var lstAct = [];
    lstAct.push(bot.act('message', 'message', 'message'));
    lstAct.push(bot.act('postback', 'postback', 'data=1'));
    lstAct.push(bot.act('uri', 'uri', 'https://devdocs.line.me/en/#template-messages'));
    var tmpMsg = [];
    tmpMsg.push(bot.tmpButton('Hello , world',
        'https://example.com/bot/images/image.jpg',
        'Hello , world',
        'Im Api teset bot',
        lstAct));
    bot.pushMsg(data.source.userId, tmpMsg);
    */
    /* more info https://devdocs.line.me/en/#template-messages */
};

// export the class
module.exports = LINE_SPNV;
