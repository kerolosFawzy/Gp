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

    var err = await DbUser.signUp(user);

    if (err) {
        return res.render('signUp', { err: err, data: data });
    }
    res.render('login', { err: '' });
});

router.post('/signupcompany', upload.any(), async (req, res, next) => {
    console.log('here');
    var val = req.body;
    var files = req.files;

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

    if (err) {
        return res.render('signUpCompany', { err: err });
    }
    res.render('login', { err: '' });
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();

    res.render('login', { err: null });
});


router.get('/posts', async (req, res, next) => {
    let bool = utilies.checkSession(req);
    if (bool.role == 3) {
        var data = await DbPost.getAllHrPosts(bool.uid);
        console.log(data);
        res.render('hrPostList', {
            logged: bool, data: data
        });
    } else {
        res.render('404');
    }

});

router.post('/viewapplied', async (req, res, next) => {
    let bool = utilies.checkSession(req);
    if (bool) {
        if (utilies.checkHr(bool)) {
            var data = await DbPost.getPost(req.body.id);
            console.log(data);
            var applied = [];
            var users = [];

            applied = data.applied;

            console.log(applied);
            if (applied) {
                for (i = 0; i < applied.length; i++) {
                    let user = await DbUser.getUser(applied[i]);
                    user.uid = applied[i];
                    users.push(user);
                }
                console.log(users);
                res.render('applicants-applied', {
                    logged: bool, data: users
                });

            } else {
                res.render('applicants-applied', {
                    logged: bool, data: users
                });
            }

        } else {
            res.render('404');
        }
    } else {
        res.render('login', { err: null });
    }

});

router.post('/viewprofile', async (req, res, next) => {
    let id = req.body.user;
    let bool = utilies.checkSession(req);
    let user = await DbUser.getUser(id);

    if (user) {
        if (user.role == 2) {

            user.Edit_Work_Link = ' www.www.com ';
            console.log(user);
            res.render('profile', { logged: bool, user: user });
        } else {
            res.render('404');
        }
    }

});

router.post('/topten', async (req, res, next) => {
    let users = await DbUser.getAllUsers();
    let bool = utilies.checkSession(req);
    var data = [];
    var result = [];

    let post = await DbPost.getPost(req.body.id);
    //let post = await DbPost.getPost("-LhLJIWDVMxHEamSV215");

    for (var i in users)
        data.push([i, users[i]]);

    for (i = 0; i < data.length; i++) {
        if (data[i][1].role == 2) {
            result.push(data[i]);
        }
    }

    for (i = 0; i < result.length; i++) {
        let score = 0;
        for (j = 0; j < post.skills.length; j++) {

            for (k = 0; k < result[i][1].skills.length; k++) {
                if (result[i][1].skills[k] == post.skills[j]) {
                    score++;
                }
                if (result[i][1].major_skill == post.user_job) {
                    score = +3;
                }

            }

        }
        result[i][1].score = ((score / (post.skills.length + 3)) * 100).toFixed(1);
    }
    result.sort((a, b) => {
        return b[1].score - a[1].score;
    });

    res.render('topten', { logged: bool, users: result });

});

module.exports = router;