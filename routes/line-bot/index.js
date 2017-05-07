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
    // .get(function(req, res, next) {
    //     res.render('index', { title: 'Express', data: 'line' });
    // })
    .post(function(req, res, next) {
        res.end();
    });

module.exports = router;
var text = [];

var fourMagic = new cron('00 35 07 * * *', function() {
        /*
         * Runs everyday
         * at 07:35:00 AM.
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
    true,
    'Asia/Bangkok'
);

var goodMorning = new cron('00 02 07 * * 1-5', function() {
        /*
         * Runs every weekday (Monday through Sunday)
         * at 07:02:00 AM.
         */
        text = [];
        text.push(robert.msgText("Morning, wake up :O"));
        robert.pushMsg(define.SPNV_LINE_ID, text);

    }, function() {
        /* This function is executed when the job stops */
    },
    true,
    'Asia/Bangkok'
);

var goodNight = new cron('00 25 20 * * *', function() {
        /*
         * Runs everyday
         * at 20:25:00 AM.
         */
        text = [];
        text.push(robert.msgText("do  u still there? sleep yet?"));
        text.push(robert.msgText("what r u doing ?"));
        robert.pushMsg(define.SPNV_LINE_ID, text);

    }, function() {
        /* This function is executed when the job stops */
    },
    true,
    'Asia/Bangkok'
);

var afterWork = new cron('00 45 17 * * 1-5', function() {
        /*
         * Runs everyday
         * at 20:25:00 AM.
         */
        text = [];
        text.push(robert.msgText("TIME IS UP !"));
        text.push(robert.msgText("it's a LONGGGG day here X|"));
        text.push(robert.msgText("how bout ur?"));
        robert.pushMsg(define.SPNV_LINE_ID, text);

    }, function() {
        /* This function is executed when the job stops */
    },
    true,
    'Asia/Bangkok'
);
