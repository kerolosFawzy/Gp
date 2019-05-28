var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

/* GET home page. */
router.get('/login', function (req, res, next) {
    return res.render('login', { err: null });
});

router.all('/', function (req, res, next) {
    return res.render('index', { title: 'Express' });
});

router.get('/signupapplicant', function (req, res, next) {
    return res.render('signUp', { err: null });
});

router.get('/signup', function (req, res, next) {
    return res.render('signupSwitch', { err: null });
});

router.get('/signupcompany', function (req, res, next) {
    return res.render('signUpCompany', { err: null });
});

module.exports = router;
