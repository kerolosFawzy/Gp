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
  res.render('login', { err: null });
});

router.all('/', function (req, res, next) {
  let bool = utilies.checkSession(req);
  res.render('index', {
    logged: bool
  });
});

router.post('/search', async (req, res, next) => {
  let data = await DbPost.getAllPosts();

  let result = await utilies.searchFilter(data, req.body.jopType, req.body.country, null);

  let bool = await utilies.checkSession(req);

  res.render('search', {
    logged: bool, data: result
  });

});

router.get('/search', async (req, res, next) => {
  let bool = await utilies.checkSession(req);
  let data = await DbPost.getAllPosts();
  console.log(data);

  var result = [];

  for (var i in data)
    result.push([i, data[i]]);

  console.log(result);

  res.render('search', { logged: bool, data: result });
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

// router.get('/addpost', async (req, res, next) => {
//   //let bool = utilies.checkSession(req);
//   let bool = {
//     Foundation: '1998',
//     address: 'asdfsf dfs gfd  ',
//     city: 'cario',
//     company_name: 'ibm',
//     country: 'EG',
//     description: 'fmkfd sfds   ',
//     email: 'kerofawzyhr@gmail.com',
//     img:
//       'https://firebasestorage.googleapis.com/v0/b/gp-project-9231d.appspot.com/o/pic%2FzN8QIT7RkHOZe5C8GXvRXItnIfE2?alt=media&token=0ac44c73-7d8a-464d-8891-a0409d423386',
//     name: 'hr ',
//     role: 3,
//     uid: 'zN8QIT7RkHOZe5C8GXvRXItnIfE2'
//   };

//   let data = await skillsRef.getSkills();

//   res.render('addpost', { logged: bool, data: data });

// });

router.get('/addpost', async (req, res, next) => {
  let bool = utilies.checkSession(req);

  let data = await skillsRef.getSkills();
  if (bool) {
    if (utilies.checkHr(bool))
      res.render('addpost', { logged: bool, data: data });
  }
  res.render('index', { logged: bool });
});

router.post('/addpost', async (req, res, next) => {
  let bool = utilies.checkSession(req);
  var data = req.body;
  data.HrEmail = bool.email;
  data.img = bool.img;
  data.company_name = bool.company_name;
  console.log(data);
  let id = await DbPost.pushPost(data);

  var post = await DbPost.getPost(id);
  console.log(post);
  res.render('job-details', { data: post, logged: bool });

});



router.get('/about', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('about', { logged: bool });
});

router.get('/contact-us', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('contact-us', { logged: bool });
});

router.get('/profile', function (req, res, next) {
  let bool = utilies.checkSession(req);
  if (bool) {
    if (bool.role == 2) {

      bool.Edit_Work_Link = ' www.www.com ';
      console.log(bool);
      res.render('profile', { logged: bool });
    } else {
      res.render('404');
    }
  } else {
    res.render('login', { err: null });
  }
});

router.get('/hr', function (req, res, next) {
  let bool = utilies.checkSession(req);
  if (bool) {
    if (bool.role == 3) {
      var hr = {
        name: bool.name,
        Email: bool.email,
        Phone: '0114555',
        Company: bool.company_name,
        Profession: ' HR FOR ' + bool.company_name + ' Company ',
        Your_Bio: bool.description,
        Edit_Work_Link: ' www.www.com '
      };
      res.render('HR', { logged: bool, hr: hr });
    } else {
      res.render('404');
    }
  } else {
    res.render('login', { err: null });
  }

});


router.get('/adress_html', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('adress_html', { logged: bool });
});



router.get('/ten', function (req, res, next) {
  let bool = utilies.checkSession(req);

  res.render('topten', { logged: bool });
});

router.get('/editjobpost', async (req, res, next) => {
  let data = await skillsRef.getSkills();
  let bool = utilies.checkSession(req);

  if (bool) {
    var post = await DbPost.getPost("-LgyY7sRLxy2yZWqS4vv");
    console.log(post);
    res.render('editJobPost', { logged: bool, data: data, post: post });
  }
  else {
    res.render('login', { err: '' });
  }
});

router.post('/editjobpost', async (req, res, next) => {
  let bool = utilies.checkSession(req);
  console.log(req.body);
  await DbPost.updatePost("-LgyY7sRLxy2yZWqS4vv", req.body);

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

router.post('/details', async (req, res, next) => {

  let bool = utilies.checkSession(req);
  console.log(req.body);

  var post = await DbPost.getPost(req.body.id);
  console.log(post);
  res.render('job-details', { data: post, logged: bool });
});

router.get('/editJobPost', async (req, res, next) => {
  var edit = await DbPost.updatePost(1);
  console.log(edit);
  res.render('editJobPost', { select: skills });
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
