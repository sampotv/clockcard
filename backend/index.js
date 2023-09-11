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
//Count shift lengths for user
app.get('/shiftlength/:idUser', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('select *, date_format(shiftstart, "%d.%m.%Y : %H.%i.%s") as start, date_format(shiftend, "%d.%m.%Y : %H.%i.%s") as end, time_format(timediff(shiftend, shiftstart), "%H.%i.%s") as Length from shift WHERE idUser=?',[req.params.idUser], function (error, results) {
            if (error) throw error;
            console.log("Shift start added");
            res.send(results);
        })
    })
})
//count shift lengths together
app.get('/totallength/:idUser', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('select time_format(sec_to_time(sum(shiftlength)), "%H.%i.%s") as totaltime from shift where idUser=?',[req.params.idUser], function (error, results) {
            if (error) throw error;
            console.log("Shifts counted together");
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

//Update shift length to the shift table
app.get('/setlength/', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('update shift set shiftlength = timestampdiff(second, shiftstart, shiftend)',[req.params.idUser], function (error, results) {
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