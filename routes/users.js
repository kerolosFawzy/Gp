var express = require('express');
var router = express.Router();
const DbUser = require('../database/users');
router.use('/adduser', function(req, res, next) {
  DbUser.userPush({ name: 'kero', age: 30 , gender: 'male' }); 
  
  res.render('test' , {userName: DbUser.getUser('-Lc0SVRVKT8Ox-S6GfqW')});
});



module.exports = router;
