var express = require('express');
var lineLogin = require('line-login-spnv');
var AWS = require("aws-sdk");
var router = express.Router();

var login = new lineLogin({
    name: "Rosie's left ear",
    channelId: '1514179965',
    channelSecret: '07b0e6d8dd81aa9244568204abbb6f37'
});

AWS.config.region = process.env.REGION;
var ddb = new AWS.DynamoDB();
var ddbTable = "Users";


/* GET home page. */
router.route('/')
    .get(
        login.isLogin({
            response_type: 'code',
            redirect_uri: 'https://rosie.chat/api/login-hook',
            state: 'abc1412'
        }),
        function (req, res, next) {
            res.render('index', {
                title: 'Rosie'
            });
        });

router.route('/page')
    .get(function (req, res, next) {
            res.render('index', {
                title: 'Rosie'
            });
        });

module.exports = router;