var express = require('express');
const { rawListeners } = require('../lib/db');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  email=req.body.email;
  password=req.body.password;

  dbConn.query("SELECT * FROM users WHERE email='"+email+"' AND password='"+password+"'",function(err,rows)     {
 
    if(err) {
        req.flash('error', err);  
        console.log(err);
    } else {
        console.log(rows);
        if(rows.length){
          //console.log(rows[0]["nombre"]);
          req.session.idu=rows[0]["id"];
          req.session.user=rows[0]["nombre"];
          req.session.email=rows[0]["email"];
          res.redirect("/dashboard");
        }else{
          req.flash('success', 'El usuario no existe'); 
          res.redirect("/");
        }
        
        //res.render('books',{data:rows});
    }
  });

  
});
router.get('/dashboard', function(req, res, next) {
  if(!req.session.idu){
    res.render('login/index');
  }else{
    // Ok, el usuario tiene permiso
    res.locals.idu=req.session.idu;
    res.locals.user=req.session.user;
    res.locals.email=req.session.email;
    res.render('login/dashboard');
  }
  
});

// Logout endpoint
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.render('login/index');
});

module.exports = router;
