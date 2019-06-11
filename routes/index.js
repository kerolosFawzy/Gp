var express = require('express');
var router = express.Router();
const DbPost = require('../database/posts');
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer({
  dest: 'uploads'
});

var storage = require('../database/storage');
var skillsRef = require('../database/skills');
let utilies = require('../database/utilies');

router.use(bodyParser.json());

/* GET home page. */
router.get('/login', function (req, res, next) {
  let bool = utilies.checkSession(req);
  res.render('login', { err: null });
});

router.all('/', function (req, res, next) {
  let bool = utilies.checkSession(req);
  res.render('index', {
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
  let bool =  utilies.checkSession(req);

  res.render('HR', { logged: bool });
});

router.get('/admin', function (req, res, next) {
  let bool =  utilies.checkSession(req);

  res.render('admin', { logged: bool });
});

router.get('/profile', function (req, res, next) {
  let bool = utilies. checkSession(req);

  res.render('profile', { logged: bool });
});

router.get('/addpost', async (req, res, next) => {
  let bool =  utilies.checkSession(req);

  let data = await skillsRef.getSkills();
  if (bool) {
    if ( utilies.checkHr(bool))
      res.render('addpost', { logged: bool, data: data });
  }
  res.render('index', { logged: bool });
});

router.get('/about', function (req, res, next) {
  let bool =  utilies.checkSession(req);

  res.render('about', { logged: bool });
});

router.get('/contact-us', function (req, res, next) {
  let bool =  utilies.checkSession(req);

  res.render('contact-us', { logged: bool });
});

router.get('/adress_html', function (req, res, next) {
  let bool =  utilies.checkSession(req);

  res.render('adress_html', { logged: bool });
});
router.get('/search', function (req, res, next) {
  let bool =  utilies.checkSession(req);

  res.render('search', { logged: bool });
});

router.get('/ten', function (req, res, next) {
  let bool =  utilies.checkSession(req);

  res.render('topten', { logged: bool });
});

router.get('/editpost', function (req, res, next) {
  res.render('editpost');
});




router.get('/applied', function (req, res, next) {
  let bool =  utilies.checkSession(req);

  res.render('applicants-applied', { logged: bool });
});

router.get('/details', async (req, res, next) => {
  let bool =  utilies.checkSession(req);
  var post = await DbPost.getPost(1);

  res.render('job-details', { data: post, logged: bool });
});

router.get('/editJobPost', async (req, res, next) => {
  var edit = await DbPost.updatePost(1);
  console.log(edit);
  res.render('editJobPost', {select:skills});
});


router.get('/applied', function (req, res, next) {
  res.render('applicants-applied');
});

router.get('/editprofile', function (req, res, next) {
  res.render('editprofile');
});

router.all('/editprofile', function (req, res, next) {
  var dd = req.body;
  
  console.log(edit);

  DbPost.pushPost(dd);
 
  res.render('index', { title: 'done' });

});

module.exports = router;
