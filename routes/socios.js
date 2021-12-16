var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display books page
router.get('/', function(req, res, next) {
    if(!req.session.idu){
        res.render('login/index');
    }else{
        dbConn.query('SELECT * FROM socios ORDER BY socio_id desc',function(err,rows)     {
 
            if(err) {
                req.flash('error', err);
                // render to views/books/index.ejs
                res.render('socios',{data:''});   
                console.log(rows);
            } else {
                // render to views/books/index.ejs
                res.locals.idu=req.session.idu;
                res.locals.user=req.session.user;
                res.locals.email=req.session.email;
    
                res.render('socios',{data:rows});
            }
        });
    }
});

// display add book page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('socios/add', {
        socio_codigo: '',
        socio_persona_id: ''        
    })
})

// add a new book
router.post('/add', function(req, res, next) {    

    let socio_codigo = req.body.socio_codigo;
    let socio_persona_id = req.body.socio_persona_id;
    let errors = false;

    if(socio_codigo.length === 0 || socio_persona_id.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter socio_codigo and socio_persona_id");
        // render to add.ejs with flash message
        res.render('socios/add', {
            socio_codigo: socio_codigo,
            socio_persona_id:socio_persona_id
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            socio_codigo: socio_codigo,
            socio_persona_id: socio_persona_id
        }
        
        // insert query
        dbConn.query('INSERT INTO socios SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('socios/add', {
                    socio_codigo: form_data.socio_codigo,
                    socio_persona_id: form_data.socio_persona_id                   
                })
            } else {                
                req.flash('success', 'Book successfully added');
                res.redirect('/socios');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:socio_id)', function(req, res, next) {

    let socio_id = req.params.socio_id;
   
    dbConn.query('SELECT * FROM socios WHERE socio_id = ' + socio_id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with socio_id = ' + socio_id)
            res.redirect('/socios')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('socios/edit', {
                title: 'Edit Book', 
                socio_id: rows[0].socio_id,
                socio_codigo: rows[0].socio_codigo,
                socio_persona_id: rows[0].socio_persona_id
            })
        }
    })
})

// update book data
router.post('/update/:socio_id', function(req, res, next) {

    let socio_id = req.params.socio_id;
    let socio_codigo = req.body.socio_codigo;
    let socio_persona_id = req.body.socio_persona_id;
    let errors = false;

    if(socio_codigo.length === 0 || socio_persona_id.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter socio_codigo and socio_persona_id");
        // render to add.ejs with flash message
        res.render('socios/edit', {
            socio_id: req.params.socio_id,
            socio_codigo:socio_codigo,
            socio_persona_id: socio_persona_id
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            socio_codigo: socio_codigo,
            socio_persona_id: socio_persona_id
        }
        // update query
        dbConn.query('UPDATE socios SET ? WHERE socio_id = ' + socio_id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('socios/edit', {
                    socio_id: req.params.socio_id,
                    socio_codigo: form_data.socio_codigo,
                    socio_persona_id: form_data.socio_persona_id
                })
            } else {
                req.flash('success', 'Book successfully updated');
                res.redirect('/socios');
            }
        })
    }
})
   
// delete book
router.get('/delete/(:socio_id)', function(req, res, next) {

    let socio_id = req.params.socio_id;
     
    dbConn.query('DELETE FROM socios WHERE socio_id = ' + socio_id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/socios')
        } else {
            // set flash message
            req.flash('success', 'Book successfully deleted! ID = ' + socio_id)
            // redirect to books page
            res.redirect('/socios')
        }
    })
})

module.exports = router;