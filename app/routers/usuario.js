const express = require('express');
const routers = express.Router();
const mysqlConnection  = require('../../config/sql');
const validations=require("../validations/validations");

routers.post('/registro/usuario',(req, res)=>{

    validations.nameLastNameValidation(req.body);

    const {nombre, apellidos}=req.body;

    

    let sql="INSERT INTO usuario (nombre, apellidos) VALUES ('" + nombre +"', '"+
    apellidos+ "')";

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


module.exports = routers;