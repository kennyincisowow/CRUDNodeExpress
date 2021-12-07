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
  
    dbConn.query('SELECT SUM(saldo) as total FROM clients',function(err,rows1)     {
      if(err) {
          req.flash('error', err);  
          console.log(rows1);
      } else {
        dbConn.query('SELECT * FROM clients WHERE saldo=0',function(err,rows2)     {
          if(err) throw err;
          
          res.render('login/dashboard',{data1:rows1,data2:rows2});
        });
        
      }
    });
  }
  
});

router.get('/api1', function(req, res, next) {
  if(!req.session.idu){
    res.render('login/index');
  }else{
    dbConn.query('SELECT marca, COUNT(*) as cantidad FROM clients GROUP BY marca',function(err,rows)     {
      if(err) {
          req.flash('error', err);  
          console.log(rows);
      } else {
        res.send(JSON.stringify(rows));
        //res.render('login/dashboard',{data:JSON.stringify(rows)});
      }
    });
  }
});

router.get('/api2', function(req, res, next) {
  if(!req.session.idu){
    res.render('login/index');
  }else{
    dbConn.query('SELECT marca, SUM(saldo) as importe FROM clients GROUP BY marca;',function(err,rows)     {
      if(err) {
          req.flash('error', err);  
          console.log(rows);
      } else {
        res.send(JSON.stringify(rows));
        //res.render('login/dashboard',{data:JSON.stringify(rows)});
      }
    });
  }
});

// Logout endpoint
router.get('/logout', function (req, res) {
  req.session.destroy();
  //res.render('login/index');
  res.redirect("/");
});

module.exports = router;
