var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

/* GET home page. */
<<<<<<< HEAD
router.get('/login', function(req, res, next) {
  res.render('login', { err: null });
});

router.all('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signUp', { err: null });
});
router.get('/profile', function(req, res, next) {
  res.render('profile', { err: null });
});
router.get('/search', function(req, res, next) {
  res.render('search', { err: null });
});
=======
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
>>>>>>> 73fa44836000f65d31df6ef747cafe247a037ed4

module.exports = router;
