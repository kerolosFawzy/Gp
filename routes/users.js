var express = require('express');
var router = express.Router();
const DbUser = require('../database/users');
const bodyParser = require('body-parser');
const firebase = require('firebase');

router.use(bodyParser.json());

router.use('/', (req, res, next) => {
    res.render('index', {title: user.displayName});
});

router.post('/login', (req, res, next) => {
    console.log('in login');

    DbUser.login({email: req.email, password: req.password});
    var user = firebase
        .auth()
        .currentUser;

    res.render('index', {title: user.displayName});
});

module.exports = router;
