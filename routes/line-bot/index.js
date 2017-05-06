// var express = require('express');
var lineBot = require('line-bot-spnv');
// var mongoose = require('mongoose');
var word = require('random-creative-word');
var express = require('express');
var cron = require('cron').CronJob;
var router = express.Router();

var define = require('./define.js');
// var dbUserManager = require('./modal/user-modal.js');
// var dbParaManager = require('./modal/paragraph-modal.js')

var robert = new lineBot(define.CHANNELTOKEN, "Robert");

/* GET home page. */
router.route('/')
    .get(function(req, res, next) {
        res.render('index', { title: 'Express', data: 'line' });
    })
    .post(function(req, res, next) {
        res.render('index', { title: 'Express', data: 'line' });
    });

module.exports = router;
var text = [];

var fourMagic = new cron('00 35 07 * * *', function() {
        /*
         * Runs everyday (Monday through Sunday)
         * at 07:20:00 AM.
         */
        word.getCreativeWord(4, function(data) {
            text = [];
            text.push(robert.msgText("4 Magic time !"));
            text.push(robert.msgText(data.join(', ')));
            text.push(robert.msgText("reply here, now or neverr ;p"));
            robert.pushMsg(define.SPNV_LINE_ID, text);
        });

    }, function() {
        /* This function is executed when the job stops */
    },
    true
);

var goodNight = new cron('00 02 07 * * 1-5', function() {
        /*
         * Runs everyday (Monday through Sunday)
         * at 07:20:00 AM.
         */
        text = [];
        text.push(robert.msgText("Morning, wake up :O"));
        robert.pushMsg(define.SPNV_LINE_ID, text);

    }, function() {
        /* This function is executed when the job stops */
    },
    true
);

var goodNight = new cron('00 25 20 * * *', function() {
        /*
         * Runs everyday (Monday through Sunday)
         * at 07:20:00 AM.
         */
        text = [];
        text.push(robert.msgText("Nigth timee, going to sleep. before dat ..."));
        text.push(robert.msgText("How bout u 2day ?"));
        robert.pushMsg(define.SPNV_LINE_ID, text);

    }, function() {
        /* This function is executed when the job stops */
    },
    true
);
