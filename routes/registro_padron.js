var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display books page
router.get('/', function(req, res, next) {
    if(!req.session.idu){
        res.render('login/index');
    }else{
        dbConn.query('SELECT * FROM registro_padron ORDER BY registro_padron_id desc',function(err,rows)     {
 
            if(err) {
                req.flash('error', err);
                // render to views/books/index.ejs
                res.render('registro_padron',{data:''});   
                console.log(rows);
            } else {
                // render to views/books/index.ejs
                res.locals.idu=req.session.idu;
                res.locals.user=req.session.user;
                res.locals.email=req.session.email;
    
                res.render('registro_padron',{data:rows});
            }
        });
    }
});

// display add book page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('registro_padron/add', {
        registro_padron_periodo_id: '',
        registro_padron_descripcion: '',
        stand_id:'',
        socio_id:''        
    })
})

// add a new book
router.post('/add', function(req, res, next) {    

    let registro_padron_periodo_id = req.body.registro_padron_periodo_id;
    let registro_padron_descripcion = req.body.registro_padron_descripcion;
    let stand_id =req.body.stand_id;
    let socio_id =req.body.socio_id;
    let errors = false;

    if(registro_padron_periodo_id.length === 0 || registro_padron_descripcion === 0|| stand_id.length === 0|| socio_id.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter socio_codigo and socio_persona_id");
        // render to add.ejs with flash message
        res.render('registro_padron/add', {
            registro_padron_periodo_id: '',
            registro_padron_descripcion: '',
            stand_id:'',
            socio_id:'' 
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            registro_padron_periodo_id: '',
            registro_padron_descripcion: '',
            stand_id:'',
            socio_id:'' 
        }
        
        // insert query
        dbConn.query('INSERT INTO registro_padron SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('registro_padron/add', {
                    registro_padron_periodo_id: form_data.registro_padron_periodo_id,
                    registro_padron_descripcion: form_data.registro_padron_descripcion,
                    stand_id:form_data.stand_id,
                    socio_id:form_data.stand_id                
                })
            } else {                
                req.flash('success', 'Book successfully added');
                res.redirect('/registro_padron');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:socio_id)', function(req, res, next) {

    let socio_id = req.params.socio_id;
   
    dbConn.query('SELECT * FROM registro_padron WHERE socio_id = ' + socio_id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with socio_id = ' + socio_id)
            res.redirect('/registro_padron')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('registro_padron/edit', {
                title: 'Edit Book', 
                registro_padron_periodo_id: rows[0].registro_padron_periodo_id,
                registro_padron_descripcion: rows[0].registro_padron_descripcion,
                stand_id: rows[0].stand_id,
                socio_id: rows[0].socio_id

            })
        }
    })
})

// update book data
router.post('/update/:socio_id', function(req, res, next) {

    let socio_id = req.params.socio_id;
    let registro_padron_periodo_id = req.body.registro_padron_periodo_id;
    let registro_padron_descripcion = req.body.registro_padron_descripcion;
    let stand_id = req.body.stand_id;
    let socio_id = req.body.socio_id;
    let errors = false;

    if(registro_padron_periodo_id.length === 0 || registro_padron_descripcion.length === 0|| stand_id.length === 0||socio_id.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter socio_codigo and socio_persona_id");
        // render to add.ejs with flash message
        res.render('registro_padron/edit', {
            socio_id: req.params.socio_id,
            registro_padron_periodo_id: form_data.registro_padron_periodo_id,
            registro_padron_descripcion: form_data.registro_padron_descripcion,
            stand_id:'', 
            socio_id:'' 
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            registro_padron_periodo_id: form_data.registro_padron_periodo_id,
            registro_padron_descripcion: form_data.registro_padron_descripcion,
            stand_id:form_data.stand_id,
            socio_id:form_data.stand_id 
        }
        // update query
        dbConn.query('UPDATE registro_padron SET ? WHERE socio_id = ' + socio_id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('registro_padron/edit', {
                    socio_id: req.params.socio_id,
                    registro_padron_periodo_id: form_data.registro_padron_periodo_id,
                    registro_padron_descripcion: form_data.registro_padron_descripcion,
                    stand_id:form_data.stand_id,
                    socio_id:form_data.stand_id
                })
            } else {
                req.flash('success', 'Book successfully updated');
                res.redirect('/registro_padron');
            }
        })
    }
})
   
// delete book
router.get('/delete/(:socio_id)', function(req, res, next) {

    let socio_id = req.params.socio_id;
     
    dbConn.query('DELETE FROM registro_padron WHERE socio_id = ' + socio_id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/registro_padron')
        } else {
            // set flash message
            req.flash('success', 'Book successfully deleted! ID = ' + socio_id)
            // redirect to books page
            res.redirect('/registro_padron')
        }
    })
})

module.exports = router;