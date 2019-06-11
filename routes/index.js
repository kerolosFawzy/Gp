var express = require('express');
var router = express.Router();
const DbPost = require('../database/posts');
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer({
  dest: 'uploads'
});

router.use(bodyParser.json());

/* GET home page. */
router.get('/login', function (req, res, next) {
  res.render('login', { err: null });
});

router.all('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function (req, res, next) {
  res.render('signUp', { err: null });
});

router.get('/companysignup', function (req, res, next) {
  res.render('signUpCompany', { err: null });
});

router.get('/switch', function (req, res, next) {
  res.render('signupSwitch' , {err:null});
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
router.get('/search', function (req, res, next) {
  res.render('search');
});

router.get('/editpost', function (req, res, next) {
  res.render('editpost');
});


router.get('/details', async (req, res, next) => {
  var post = await DbPost.getPost(1);
  console.log(post);
  res.render('job-details' , {data:post});
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
