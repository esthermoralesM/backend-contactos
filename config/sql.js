const mysql=require("mysql2");

const  mysqlConnection=mysql.createConnection({
    host: "35.195.38.115",
    user: "root",
    password: "pedraHola121234",
    database: "registrostartup"
});

mysqlConnection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("conexión correcta");
    }
});

module.exports = mysqlConnection;