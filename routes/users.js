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



router.post('/login', async (req, res, next) => {
    var response = await DbUser.login({ email: req.body.email, password: req.body.password });
    console.log(response);

    if (response.user) {
        req.session.uid = response.user.uid;
        req.session.user = response.user;

        var bool = utilies.checkSession(req);
        res.render('index', { title: response.user.name, logged: response.user });
    } else {
        res.render('login', { err: response.err });
    }
});


router.post('/signup', upload.any(), async (req, res, next) => {
    var val = req.body;
    var files = req.files;
    let data = await skillsRef.getSkills();

    console.log(files);

    let user = {
        name: val.name,
        email: val.email,
        password: val.password,
        gender: val.Gender,
        country: val.country,
        city: val.city,
        address: val.address,
        major_skill: val.user_job,
        experience_years: val.experience,
        description: val.description,
        skills: val.skills,
        Phone: val.phone,
        Hourly_Rate: val.Hourly_Rate,
        role: 2,
        files: files
    };

    router.all('/editprofile', function (req, res, next) {
        var dd = req.body;
        var edit = {
            First_name: dd.user_job,
            Last_name: dd.Last_name,
            Company: dd.Company,
            Email: dd.Email,
            Skills: dd.Skills,
            Edit_Work_Link: dd.JEdit_Work_Link,
            Edit_Description: dd.Edit_Description
        };
        // console.log(data)
        console.log(edit);

        DbPost.pushPost(dd);

        res.render('index', { title: 'done' });

    });
    var err = await DbUser.signUp(user);
    console.log("err = " + err)

    if (err) {
        return res.render('signUp', { err: err, data: data });
    }
    res.render('login', { err: '' });
});

router.post('/signupcompany', upload.any(), async (req, res, next) => {
    console.log('here');
    var val = req.body;
    var files = req.files;
    console.log(files);

    let user = {
        name: val.name,
        email: val.email,
        password: val.password,
        company_name: val.company_name,
        country: val.country,
        city: val.city,
        address: val.address,
        Phone: val.phone,
        Foundation: val.Foundation,
        description: val.description,
        role: 3,
        files: files
    };

    var err = await DbUser.CompanysignUp(user);
    console.log("err = " + err)

    if (err) {
        return res.render('signUpCompany', { err: err });
    }
    res.render('login', { err: '' });
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();

    res.render('login', { err: null });
});


router.get('/posts', (req, res, next) => {
    let bool = utilies.checkSession(req);


    res.render('login', { err: null });
});




module.exports = router;
