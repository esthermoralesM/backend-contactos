
const express = require('express');
const routers = express.Router();
const mysqlConnection  = require('../../config/sql');
const validations=require("../validations/validations");


routers.post('/guardarContacto', (req, res) => {

    validations.nameLastNameValidation(req.body);
    validations.phoneNumberValidation(req.body.telefono);

    const {nombre, apellidos, telefono, id_usuario}=req.body;
  
    let sql="INSERT INTO contactos_agenda (nombre, apellidos, telefono, id_usuario) VALUES ('" + nombre +"', '"+
        apellidos + "', '"+
        telefono + "', '"+
        id_usuario+ "')";
  
   mysqlConnection.query(sql, function(err, result){
       
    if(err)
            console.log(err);
            else{
    
            if(result.insertId)
                res.send(String(result.insertId));
                else
                res.send("-1");
            }
})

})


routers.put('/modificarcontacto',(req, res)=>{

    validations.nameLastNameValidation(req.body);
    validations.phoneNumberValidation(req.body.telefono);

    let params=[req.body.nombre,
        req.body.apellidos,
        req.body.telefono,
        req.body.id_usuario,
        req.body.idcontacto];

        let sql="UPDATE contactos_agenda SET nombre= COALESCE(?, nombre) ,"+
        "apellidos= COALESCE(?, apellidos) ,"+
        "telefono= COALESCE(?, telefono) ,"+
        "id_usuario = COALESCE(?, id_usuario) WHERE idcontacto=?";  

        mysqlConnection.query(sql, params, function(err, result){
    
            if(err)
            console.log(err);
            else{
                if(result.affectedRows==1){
                res.send(String(result.affectedRows));
                }
               else
               console.log(result)     
            }
        })
})



routers.get("/contactos/comunes", function(req, response){
    let idUsuario1 = req.query.id_usuario1;
    let idUsuario2 = req.query.id_usuario2;
   
    let sql;
    if(idUsuario1 && idUsuario2){
     sql="SELECT telefono FROM contactos_agenda WHERE (id_usuario = "+idUsuario1 +" OR id_usuario = "+idUsuario2+
     ") AND telefono group by (telefono) HAVING count(*)>1;"
    }
  
    mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else response.send(resultado);
    })
})




routers.get("/contactos", function(req, res){
    let idUsuario = req.query.id_usuario;
    let sql;
   

    if(idUsuario != null)
    sql = "SELECT * FROM contactos_agenda WHERE id_usuario = " + idUsuario;
    else{
       
    res.send("-1");
    }

     if(sql!=null){
        mysqlConnection.query(sql, function(error, resultado){
        if(error) console.log(error) + console.log("No hemos podido procesar su solicitud");
        else res.send(resultado);
        })
   }
})


module.exports = routers;