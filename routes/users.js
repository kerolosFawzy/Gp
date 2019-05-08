var express = require('express');
var router = express.Router();
const DbUser = require('../database/users');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/login', (req, res, next) => {
    var user = DbUser.login({ email: req.body.email, password: req.body.password });
    console.log(user);

    if (user) {
        res.render('index', { title: user.name });
    } else {
        res.render('login', { err: 'Email or Password is\'t right' });
    }

});

router.get('/profile', function (req, res, next) {
    res.render('profile');
});

router.use('/signup', (req, res, next) => {
    var val = req.body;
    DbUser.signUp({
        name: val.name,
        age: 30,
        email: val.email,
        password: val.password,
        gender: val.val.gender,
        country: val.country,
        city: val.city,
        address: val.address,
        role: val.user_job,
        experience_years: val.experience,
        description: val.description
    });
    res.render('index', { title: 'done' });
});

module.exports = router;
