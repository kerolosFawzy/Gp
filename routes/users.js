var express = require('express');
var router = express.Router();
const DbUser = require('../database/users');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/login', async (req, res, next) => {
    var response = await DbUser.login({ email: req.body.email, password: req.body.password });
    console.log(response);

    if (response.user) {
        res.render('index', { title: response.user.name });
    } else {
        res.render('login', { err: response.err });
    }

});

router.get('/profile', function (req, res, next) {
    res.render('profile');
});

router.use('/signup', async (req, res, next) => {
    var val = req.body;
    let user = {
        name: val.name,
        email: val.email,
        password: val.password,
        gender: val.Gender,
        country: val.country,
        city: val.city,
        address: val.address,
        role: val.user_job,
        experience_years: val.experience,
        description: val.description,
        skills: val.skills,
        cv: val.cv,
        profile_pic: val.pic
    };

    await DbUser.signUp(user);
    res.render('index', { title: 'done' });
});

module.exports = router;
