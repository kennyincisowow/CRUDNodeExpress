var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display books page
router.get('/', function(req, res, next) {
    if(!req.session.idu){
        res.render('login/index');
    }else{
        dbConn.query('SELECT * FROM persona ORDER BY persona_id desc',function(err,rows)     {
 
            if(err) {
                req.flash('error', err);
                // render to views/persona/index.ejs
                res.render('persona',{data:''});   
                console.log(rows);
            } else {
                dbConn.query('SELECT * FROM rol',function(err,rol)     {
                    if(err) {
                        req.flash('error', err);
                        // render to views/persona/index.ejs
                        res.render('persona',{data:''});   
                        console.log(rows);
                    } else {
                        // render to views/books/index.ejs
                        res.locals.idu=req.session.idu;
                        res.locals.user=req.session.user;
                        res.locals.email=req.session.email;
                        res.render('persona',
                        {   data:rows,
                            rol:rol
                        }
                        );
                    }
                })
            }
        });
    }
});

// // display add book page
// router.get('/add', function(req, res, next) {    
//     dbConn.query('SELECT * FROM rol',function(err,rows)     {
 
//         if(err) {
//             req.flash('error', err);
//             // render to views/persona/index.ejs
//             res.render('persona',{data:''});   
//             console.log(rows);
//         } else {
//             // render to add.ejs
//             console.log(rows);
//             res.render('persona/add', {
//                 persona_nombres: '',
//                 persona_roles:'',
//                 persona_ap_materno: '', 
//                 persona_ap_paterno:'',
//                 persona_estado_civil:'',
//                 persona_ocupacion_profesion:'',
//                 persona_dni:'',
//                 persona_telefono:'',
//                 data:rows
//             })
//         }
//     });
    
// })

// add a new book
router.post('/add', function(req, res, next) {    
    let persona_usuario = req.body.persona_usuario
    let persona_clave = req.body.persona_clave
    let persona_rol = req.body.persona_rol
    let persona_nombres = req.body.persona_nombres
    let persona_ap_materno = req.body.persona_ap_materno
    let persona_ap_paterno = req.body.persona_ap_paterno
    let persona_estado_civil =req.body.persona_estado_civil
    let persona_ocupacion_profesion =req.body.persona_ocupacion_profesion
    let persona_dni =req.body.persona_dni
    
    let persona_telefono =req.body.persona_telefono;
    let errors = false;
    console.log(req.body.persona_nombres)
    var response = {
        status: 0
    }
    var formUsuario = {
        nombre: persona_nombres,
        email:persona_usuario,
        password: persona_clave,
        id_rol: persona_rol
    }
    var formPersona = {
        persona_nombres: persona_nombres,
        persona_ap_materno: persona_ap_materno,
        persona_ap_paterno: persona_ap_paterno,
        persona_estado_civil:persona_estado_civil,
        persona_ocupacion_profesion:persona_ocupacion_profesion,
        persona_dni: persona_dni,
        persona_telefono:persona_telefono  
    }
       handlerAgregar(formUsuario, formPersona, function(err, message) {
        if (err) {
            response.message = err.message
            res.send(response)
        } else {
            response.message = message
            response.status = 1
            res.send(response)
        }
    })
})
let handlerAgregar = function (formUsuario, formPersona, callback) {

    dbConn.query('INSERT INTO users SET ?', formUsuario, function(err, result) {
        //if(err) throw err
        if (err) {
            callback(err)
        } else {
            formPersona.id_usuario = result.insertId
            dbConn.query('INSERT INTO persona SET ?', formPersona, function(err, result) {
                //if(err) throw err
                if (err) {
                    callback(err)
                } else{
                  callback(null, 'Usuario registrado.')
                }
            })
        }
    })
}
// display edit book page
router.get('/edit/(:persona_id)', function(req, res, next) {

    let persona_id = req.params.persona_id;
   
    dbConn.query('SELECT * FROM persona WHERE persona_id = ' +persona_id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'persona not found with persona_id = ' + persona_id)
            res.redirect('/persona')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('persona/edit', {
                title: 'Edit persona', 
                persona_id: rows[0].persona_id,
                persona_nombres: rows[0].persona_nombres,
                persona_roles: rows[0].persona_roles,
                persona_ap_materno: rows[0]. persona_ap_materno,
                persona_ap_paterno: rows[0].persona_ap_paterno,
                persona_estado_civil: rows[0].persona_estado_civil,
                persona_ocupacion_profesion: rows[0].persona_ocupacion_profesion,
                persona_dni: rows[0].persona_dni,        
                persona_telefono: rows[0].persona_telefono


            })
        }
    })
})

// update book data
router.post('/update/:persona_id', function(req, res, next) {

    let persona_id = req.params.persona_id;
    let persona_nombres = req.body.persona_nombres;
    let persona_roles = req.body.persona_roles;
    let persona_ap_materno= req.body. persona_ap_materno;
    let persona_ap_paterno= req.body. persona_ap_paterno;
    let persona_estado_civil= req.body.persona_estado_civil;
    let persona_ocupacion_profesion= req.body.persona_ocupacion_profesion;
    let persona_dni= req.body.persona_dni;
    let persona_telefono= req.body.persona_telefono ;
    let errors = false;
    
    if(persona_nombres.length === 0 || persona_roles.length === 0 || persona_ap_materno.length === 0 || persona_ap_paterno.length === 0 || persona_estado_civil.length === 0|| 
        persona_ocupacion_profesion.length === 0 ||  persona_dni.length === 0 || persona_telefono.length === 0 ) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter datos completos");
        // render to add.ejs with flash message
        res.render('persona/edit', {
            persona_id: req.params.persona_id,
            persona_nombres: persona_nombres,
            persona_roles:persona_roles,
            persona_ap_materno: persona_ap_materno,
            persona_ap_paterno: persona_ap_paterno,
            persona_estado_civil:persona_estado_civil,
            persona_ocupacion_profesion:persona_ocupacion_profesion,
            persona_dni: persona_dni,
           
            persona_telefono:persona_telefono  
            
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            persona_nombres: persona_nombres,
            persona_roles:persona_roles,
            persona_ap_materno: persona_ap_materno,
            persona_ap_paterno: persona_ap_paterno,
            persona_estado_civil:persona_estado_civil,
            persona_ocupacion_profesion:persona_ocupacion_profesion,
            persona_dni: persona_dni,
           
            persona_telefono:persona_telefono  
        }
        // update query
        dbConn.query('UPDATE persona SET ? WHERE persona_id = ' + persona_id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('persona/edit', {
                    persona_id: req.params.persona_id,
                    persona_nombres: form_data.persona_nombres,
                    persona_roles: form_data.persona_roles , 
                    persona_ap_materno: form_data.persona_ap_materno,
                    persona_ap_paterno: form_data.persona_ap_paterno ,
                    persona_estado_civil: form_data.persona_estado_civil , 
                    persona_ocupacion_profesion: form_data.persona_ocupacion_profesion , 
                    persona_dni: form_data.persona_dni , 
                   
                    persona_telefono: form_data.persona_telefono  
                })
            } else {
                req.flash('success', 'persona successfully updated');
                res.redirect('/persona');
            }
        })
    }
})
   
// delete book
router.get('/delete/(:persona_id)', function(req, res, next) {

    let persona_id = req.params.persona_id;
     
    dbConn.query('DELETE FROM persona WHERE persona_id = ' + persona_id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/persona')
        } else {
            // set flash message
            req.flash('success', 'persona successfully deleted! persona_id = ' + persona_id)
            // redirect to books page
            res.redirect('/persona')
        }
    })
})

module.exports = router;