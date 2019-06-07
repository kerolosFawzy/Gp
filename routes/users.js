var express = require('express');
var router = express.Router();
const DbUser = require('../database/users');
const DbPosts = require('../database/posts');

const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/login', async (req, res, next) => {
    var response = await DbUser.login({ email: req.body.email, password: req.body.password });
    console.log(response);

    if (response.user) {
        res.render('index', { title: response.user.name });
    } else {
        res.render('login', { err: response.err });
    }

});

router.get('/profile', function (req, res, next) {
    res.render('profile');
});
router.post('/addpost', function (req, res, next) {
    console.log(req.body);
    var valu = req.body;
     var data = {
         role: valu.user_job,
         majorSkills : valu.skills,
         position : valu.position,
        jopTypw : valu.jop-type,
         location : valu.location,    
         jop_description : valu.Job_Description,   
         salary : valu.Salary    
    
        
     };
     console.log(valu)
    DbPosts.pushPost(valu);
   
    res.render('index', { title: 'done' });

});
router.use('/signup', (req, res, next) => {
    var val = req.body;
    DbUser.signUp({
        name: val.name,
        age: 30,
        email: val.email,
        password: val.password,
        gender: val.val.gender,
        country: val.country,
        city: val.city,
        address: val.address,
        role: val.user_job,
        experience_years: val.experience,
        description: val.description
    });
    res.render('index', { title: 'done' });
});

module.exports = router;
