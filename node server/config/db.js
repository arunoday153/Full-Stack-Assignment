const mysql  = require('mysql2');
const dbConfig = require('./dbConfig');

const connection = mysql.createConnection({
    host : dbConfig.HOST,
    user : dbConfig.USER,
    password : dbConfig.PASSWORD,
    database : dbConfig.DB,
    port : dbConfig.PORT
});

connection.connect(error => {
    if(error){
        console.log(`error connecting to the database ${error}`);
    }
    else {
        console.log('connected to the database');
    }
});

module.exports = connection;