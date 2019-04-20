var express = require('express');
var router = express.Router();
const DbUser = require('../database/users');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// router.use('/', (req, res, next) => {
//     res.render('index', {title: 'true'});
// });

router.post('/login', (req, res, next) => {
    var user = DbUser.login({ email: req.body.email, password: req.body.password });
    console.log(user);
    res.render('index', {title: user.name});

});

router.use('/signup', (req, res, next) => {
    DbUser.signUp({name: 'kero', age: 30, email: "kerofawzy2055@gmail.com", password: "123456789"});
    res.render('index', {title: 'done'});
});
module.exports = router;
