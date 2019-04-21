var express = require('express');
var router = express.Router();
const DbUser = require('../database/users');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/login', (req, res, next) => {
    var user = DbUser.login({email: req.body.email, password: req.body.password});
    console.log(user);

    if (user) {
        res.render('index', {title: user.name});
    } else {
        res.render('login', {err: 'Email or Password is\'t right'});
    }

});

router.use('/signup', (req, res, next) => {
    DbUser.signUp({name: 'kero', age: 30, email: "kerofawzy2055@gmail.com", password: "123456789"});
    res.render('index', {title: 'done'});
});

module.exports = router;
