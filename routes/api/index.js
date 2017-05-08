var express = require('express');
var lineLogin = require('line-login-spnv');
var router = express.Router();

var login = new lineLogin({
    name: "Rosie's right ear",
    channelId: '1514179965',
    channelSecret: '07b0e6d8dd81aa9244568204abbb6f37'
});

router.get('/login-hook', function(req, res, next) {
    login.signIn(req.query.code,
        req.query.state,
        'https://rosie.chat/api/login-hook',
        function(data) {
            res.cookie('userId', data.userId);
            res.redirect('/');
        });
});