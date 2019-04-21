var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login' , {err:null});
});

router.all('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/signup', function (req, res, next) {
    res.render('signUp' , {err:null});
});

module.exports = router;
