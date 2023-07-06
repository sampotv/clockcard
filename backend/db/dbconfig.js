var mysql = require('mysql2');

//database information
var dbConn = mysql.createPool({
	host:'localhost',
	user:'clockuser2',
	password:'clockpass2',
	database:'clockcarddb',
  acquireTimeout: 1000,
  connectionLimit: 100
});


module.exports  = dbConn;