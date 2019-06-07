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
  let bool = checkSession(req);
  res.render('login', { err: null });
});

router.all('/', function (req, res, next) {
  let bool = checkSession(req);

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
  let bool = checkSession(req);

  res.render('HR', { logged: bool });
});

router.get('/admin', function (req, res, next) {
  let bool = checkSession(req);

  res.render('admin', { logged: bool });
});

router.get('/profile', function (req, res, next) {
  let bool = checkSession(req);

  res.render('profile', { logged: bool });
});

router.get('/addpost', function (req, res, next) {
  let bool = checkSession(req);

  res.render('addpost', { logged: bool });
});

router.get('/about', function (req, res, next) {
  let bool = checkSession(req);

  res.render('about', { logged: bool });
});

router.get('/contact-us', function (req, res, next) {
  let bool = checkSession(req);

  res.render('contact-us', { logged: bool });
});

router.get('/adress_html', function (req, res, next) {
  let bool = checkSession(req);

  res.render('adress_html', { logged: bool });
});
router.get('/search', function (req, res, next) {
  let bool = checkSession(req);

  res.render('search', { logged: bool });
});

router.get('/ten', function (req, res, next) {
  let bool = checkSession(req);

  res.render('topten', { logged: bool });
});

router.get('/editpost', function (req, res, next) {
  res.render('editpost');
});


router.get('/details', function (req, res, next) {
  let bool = checkSession(req);

  res.render('job-details', { logged: bool });
});

router.get('/applied', function (req, res, next) {
  let bool = checkSession(req);

  res.render('applicants-applied', { logged: bool });
});

function checkSession(req) {
  var bool = false;
  if (req.session.uid)
    bool = true;

  return bool;
}

module.exports = router;
