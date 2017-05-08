var express = require('express');
var lineLogin = require('line-login-spnv');
var router = express.Router();

var login = new lineLogin({
    name: "Rosie's left ear",
    channelId: '1514179965',
    channelSecret: '07b0e6d8dd81aa9244568204abbb6f37'
});

/* GET home page. */
router.route('/')
    .get(
        login.isLogin({
            response_type: 'code',
            redirect_uri: 'https://rosie.chat/api/login-hook',
            state: 'abc1412'
        }),
        function(req, res, next) {
            res.render('index', { title: 'Robert' });
        });

module.exports = router;
