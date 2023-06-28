var mysql = require('mysql');

//database information
var dbConn = mysql.createPool({
	host:'192.168.10.135',
	user:'user',
	password:'fakepass',
	database:'clockcarddb',
  acquireTimeout: 2000,
  connectionLimit: 100
});


module.exports  = dbConn;