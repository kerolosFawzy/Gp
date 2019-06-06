var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

var storage = require('../database/storage');
var skillsRef = require('../database/skills');

router.use(bodyParser.json());

// router.all('/test', function (req, res, next) {
//   storage.getPicUrl('OzW16EmVGQMnOKRm0uCcQfw7eIE3');
//   return;
// });

/* GET home page. */
router.get('/login', function (req, res, next) {
  res.render('login', { err: null });
});

router.all('/', function (req, res, next) {
  var bool = false;
  if (req.session.uid)
    bool = true;
  res.render('index', {
    title: 'Express',
    logged: bool
  });
});

router.get('/signupapplicant', async (req, res, next) => {
  let data = await skillsRef.getSkills();
  console.log(data);
  res.render('signUp', { err: null, data: data });
});


router.get('/signupcompany', function (req, res, next) {
  res.render('signUpCompany', { err: null });
});

router.get('/switch', function (req, res, next) {
  res.render('signupSwitch', { err: null });
});


router.get('/hr', function (req, res, next) {
  res.render('HR');
});

router.get('/admin', function (req, res, next) {
  res.render('admin');
});

router.get('/profile', function (req, res, next) {
  res.render('profile');
});

router.get('/addpost', function (req, res, next) {
  res.render('addpost');
});

router.get('/about', function (req, res, next) {
  res.render('about');
});

router.get('/contact-us', function (req, res, next) {
  res.render('contact-us');
});
router.get('/index', function (req, res, next) {
  res.render('index');
});
router.get('/adress_html', function (req, res, next) {
  res.render('adress_html');
});
router.get('/search', function (req, res, next) {
  res.render('search');
});

router.get('/ten', function (req, res, next) {
  res.render('topten');
});

router.get('/editpost', function (req, res, next) {
  res.render('editpost');
});


router.get('/details', function (req, res, next) {
  res.render('job-details');
});

router.get('/applied', function (req, res, next) {
  res.render('applicants-applied');
});

module.exports = router;
