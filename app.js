const express = require('express');
const app = express();
const cors = require ('cors');

//Routers
const usuario = require('./app/routers/usuario');
const contactoAgenda = require('./app/routers/contactoAgenda');

// Settings
let port = process.env.PORT||3000;


// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  app.use((error, req, res, next)=>{
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  });

//Rutas --
app.use(usuario);
app.use(contactoAgenda);



app.listen(port);