const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const dbConn = require("./db/dbconfig.js");
const app = express();
const passport = require('passport');
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb",extended: true}));
//app.use(passport.initialize());

//create a secret key for jwt
let jwtSecretKey = null;
if(process.env.JWTKEY === undefined) {
  jwtSecretKey = require('./db/jwt-key.json').secret;
} else {
  jwtSecretKey = process.env.JWTKEY;
}
const jwt = require("jsonwebtoken");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
 
      let options = {}
      options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

      options.secretOrKey = jwtSecretKey;
      
      passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        console.log("Processing JWT payload for token content:");
        console.log(jwt_payload);
  
        const now = Date.now() / 1000;
        if(jwt_payload.exp > now) {
          done(null, jwt_payload);
        }
        else {// expired
          done(null, false);
        }
      }));

      app.post("/login", (req, res)=> {
        const user = req.body.username
        const password = req.body.password
        dbConn.getConnection ( async (err, connection)=> {
       if (err) throw (err)
       //perform a sql search with given username to get specific data for the username
           const sqlSearch = "Select * from User where username = ?"
           const search_query = mysql.format(sqlSearch,[user])
           console.log(search_query)
            dbConn.query(search_query, async (err, result) => {
              console.log(result)
              connection.release(); 
           if (err)
             throw (err);
             //check if the given username exist
           if (result.length == 0) {
             console.log("User does not exist");
             res.sendStatus(404);
           }
           else {
             const passwordHash = result[0].password;
             //get the passwordHash from result and compare if the password is correct
             if (await bcrypt.compare(password, passwordHash)) {
               console.log("Login Successful");
               console.log("Generating accessToken");
               
                 //with jwt.sign we create the jsonwebtoken, payload has values idUser, username
                jwt.sign({ idUser: result[0].idUser, username: result[0].username}, jwtSecretKey, {expiresIn: "2h"}, (err, token) => {
                   //jwt.sign({ idUser: result[0].idUser, username: result[0].username, idCompany: result[0].idCompany}, jwtSecretKey, {expiresIn: "2h"}, (err, token) => {
                res.json({ token });  
                console.log(token)
               });   
       
             } else {
               console.log("Password Incorrect");
               res.send("Password incorrect!");
             }//console.log(jwt)
           }
         }) 
       }) 
       }) 

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
//Select month to show shifts from that month
app.get('/shiftstart2/:idUser/:month', function(req, res) {
  dbConn.getConnection(function() {
      dbConn.query('select * from shift where idUser=? and month(shiftstart) = ?',[ req.params.idUser, req.params.month], function (error, results) {
          if (error) throw error;
          console.log("Monthly hours calculated");
          res.send(results);
      })
  })
})


app.get("/",(req,res)=>{
    res.send("testing")

});
app.listen(5002);