var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer({
  dest: 'uploads'
});

const DbUser = require('../database/users');
var storage = require('../database/storage');
var skillsRef = require('../database/skills');
let utilies = require('../database/utilies');
const DbPost = require('../database/posts');

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
  let bool = utilies.checkSession(req);

  res.render('HR', { logged: bool });
});

router.get('/admin', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('admin', { logged: bool });
});

router.get('/profile', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('profile', { logged: bool });
});

router.get('/addpost', async (req, res, next) => {
  let bool = utilies.checkSession(req);

  let data = await skillsRef.getSkills();
  if (bool) {
    if (utilies.checkHr(bool))
      res.render('addpost', { logged: bool, data: data });
  }
  res.render('index', { logged: bool });
});

router.get('/about', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('about', { logged: bool });
});

router.get('/contact-us', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('contact-us', { logged: bool });
});

router.get('/adress_html', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('adress_html', { logged: bool });
});
router.get('/search', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('search', { logged: bool });
});

router.get('/ten', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('topten', { logged: bool });
});

router.get('/editjobpost', async (req, res, next) => {
  let data = await skillsRef.getSkills();
  let bool = utilies.checkSession(req);

  if (bool) {
    var post = await DbPost.getPost(1);
   
    res.render('editJobPost', { logged: bool, data: data , post : post });
  }
  else {
    res.render('login', { err: '' });
  }
});

router.post('/editjobpost', async (req, res, next) => {
  let bool = utilies.checkSession(req);

  await DbPost.updatePost(1, req.body);

  res.render('index', { logged: bool });
});


router.get('/editprofile', async (req, res, next) => {
  let bool = utilies.checkSession(req);
  if (bool) {
    let data = await skillsRef.getSkills();

    res.render('editprofile', { logged: bool, data: data });
  } else {
    res.render('login', { err: '' });
  }

});

router.post('/editprofile', upload.single(), async (req, res, next) => {
  let bool = utilies.checkSession(req);
  var files = req.files;
  console.log(bool);

  let data = req.body;
  if (files) {
    console.log(files[0]);
    await storage.uploadProfilePic(bool.uid, files[0]);
    data.img = await storage.getPicUrl(bool.uid);
  }
  console.log(data);

  await DbUser.userUpdate(bool.uid, data);

  res.render('profile', { logged: bool });
});

router.get('/applied', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('applicants-applied', { logged: bool });
});

router.get('/details', async (req, res, next) => {
  let bool = utilies.checkSession(req);
  var post = await DbPost.getPost(1);

  res.render('job-details', { data: post, logged: bool });
});

router.post('/addpost', function (req, res, next) {
  var valu = req.body;
  var user = req.session.user;
  valu.HrEmail = user.email;
  valu.userId = user.uid;

  DbPost.pushPost(valu);

  res.render('index');
});

module.exports = router;