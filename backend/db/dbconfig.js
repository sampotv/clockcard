const mysql = require('mysql');

//database information
const dbConn = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'root',
	database:'clockcarddb',
  acquireTimeout: 1000,
  connectionLimit: 100
});


module.exports  = dbConn;