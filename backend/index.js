const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const dbConn = require("./db/dbconfig.js");
const app = express();

app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb",extended: true}));

//testing db
app.get('/shift', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('select * from Shift', function (error, results) {
            if (error) throw error;
            console.log("Shifts fetched");
            res.send(results);
        })
    })
})
app.get('/employee', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('select * from User', function (error, results) {
            if (error) throw error;
            console.log("users fetched");
            res.send(results);
        })
    })
})
//Get information from employee
app.get('/employee/:idUser', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('select * from User WHERE idUser=?',[req.params.idUser], function (error, results) {
            if (error) throw error;
            console.log("Employee information fetched");
            res.send(results);
        })
    })
})
//Get information from shift with idUser
app.get('/shift/:idUser', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('select *, date_format(shiftstart, "%d.%m.%Y : %H.%i.%s") as start, date_format(shiftend, "%d.%m.%Y : %H.%i.%s") as end from Shift WHERE idUser=?',[req.params.idUser], function (error, results) {
            if (error) throw error;
            console.log("Shift information fetched");
            res.send(results);
        })
    })
})
//Start shift
app.get('/shiftlength/:idUser', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('select *, timediff(shiftend, shiftstart) as Length from shift WHERE idUser=?',[req.params.idUser], function (error, results) {
            if (error) throw error;
            console.log("Shift start added");
            res.send(results);
        })
    })
})

//Start shift
app.get('/shiftstart/:idUser', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('insert into shift (shiftstart, idUser) values (now(), ?)',[req.params.idUser], function (error, results) {
            if (error) throw error;
            console.log("Shift start added");
            res.send(results);
        })
    })
})


app.get("/",(req,res)=>{
    res.send("testing")

});
app.listen(5002);