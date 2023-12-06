const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const dbConn = require("./db/dbconfig.js");
const app = express();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
var uuid = require('uuid');
var crypto = require('crypto');


app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb",extended: true}));
app.use(passport.initialize());
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

      /* This is the secret signing key.
         You should NEVER store it in code  */
      options.secretOrKey = jwtSecretKey;
      
      passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        console.log("Processing JWT payload for token content:");
        console.log(jwt_payload);
        /* Here you could do some processing based on the JWT payload.
        For example check if the key is still valid based on expires property.
        */
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
           const sqlSearch = "Select * from user where username = ?"
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
               // res.json({
               //   token: jwt.sign({ username: result[0].username, isOwner: result[0].isOwner }, jwtSecretKey, { expiresIn: "2h" }
                 
               // )})
               //});
                 //with jwt.sign we create the jsonwebtoken, payload has values idUser, username and isOwner
               jwt.sign({ idUser: result[0].idUser, username: result[0].username }, jwtSecretKey, {expiresIn: "2h"}, (err, token) => {
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
       
// Add new user, password is saved with bcrypt hash
app.post(`/user`, function(req, res) {
  dbConn.getConnection(function (err, connection) {
    
    const salt = bcrypt.genSaltSync(6);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
    dbConn.query('INSERT INTO user (username, password, firstname, lastname) VALUES ( ?, ?, ?, ?)',
    [ req.body.username, passwordHash, req.body.firstname, req.body.lastname ],
     function(error, result) {
      if (error) throw error;
      console.log("Käyttäjä luotu");
      res.send(result) 

    });
  });   
});
/*
var genRandomString = function (length){
  return crypto.randomBytes(Math.ceil(length/2))
  .toString('hex') //convert to hex format
  .slice(0,length); //return the required amount of characters
};

var sha512 = function(password,salt){
  var hash = crypto.createHmac('sha512',salt);
  hash.update(password);
  var value=hash.digest('hex');
  return{
    salt:salt,
    passwordHash:value
  };
};

function saltHashPass(userPassword){
  var salt = genRandomString(16);
  var passwordData=sha512(userPassword, salt);
  return passwordData;
}

function checkHashPass(userPassword,salt) {
  var passwordData = sha512(userPassword,salt);
  return passwordData;
}

app.post('/login', (req,res,next) => {
  var postdata=req.body;

  var userpassword= postdata.password;
  var username = postdata.username;

  dbConn.query('SELECT from user where username =?', [username],function(err,result,fields){
    dbConn.on('error',function(err){
      console.log('[MySQL ERROR]',err);
    })
    if(result && result.length) {
      var salt = result[0].salt;
      var encryptedPassword = result[0].encryptedPassword;

      var hashedPassword = checkHashPass(userpassword,salt).passwordHash;

      if(encryptedPassword==hashedPassword)
        res.end(JSON.stringify(result[0]))
      else
        res.end(JSON.stringify('Incorrect password'))
    }
    else {
      res.json('Username not found!');
    }
  })
})
app.post('/register',(req,res,next) => {
  var postdata =req.body;
  var uid = uuid.v4();
  var plaint_password = postdata.password;
  var hashdata = saltHashPass(plaint_password);
  var password = hashdata.passwordHash;
  var salt = hashdata.salt;

  var name = postdata.name;
  var email = postdata.email;

  dbConn.query('')
})
*/

/*
//print console just to test that the salt works
app.get("/testsalt",(req,res,next)=>{
  console.log('Password: testing');
  var encrypt=saltHashPass("testing");
  console.log('Encrypt: '+encrypt.passwordHash)
  console.log('Salt: '+encrypt.salt)
})
*/

//testing db print all data from shift table
app.get('/shift', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('select * from Shift', function (error, results) {
            if (error) throw error;
            console.log("Shifts fetched");
            res.send(results);
        })
    })
})

//get all employee information
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
app.post(`/shiftstart`, function(req, res) {
    dbConn.getConnection(function(err, connection) {
        dbConn.query('insert into shift (shiftstart, idUser) values (now(), ?)',[req.body.shiftstart, req.body.idUser], function (error, results) {
            if (error) throw error;
            console.log("Shift start added!");
            res.send(results);
        });
    });
});

//Start shift
app.post(`/shiftstart/:idUser`, function(req, res) {
  dbConn.getConnection(function(err, connection) {
          dbConn.query('insert into shift ( shiftend, idUser) values (NULL, ?)',[ req.body.idUser], function (error, results) {
      //  dbConn.query('insert into shift ( idUser) values ( ?)',[ req.params.idUser], function (error, results) {
          if (error) throw error;
          console.log("Shift start added :idUser");
          res.send(results);
      });
  });
});



//Stop shift
app.post('/shiftend/:idUser', function(req, res) {
  dbConn.getConnection(function() {
      dbConn.query('update shift set shiftend = now(),shiftlength = timestampdiff(second, shiftstart, shiftend), idUser = ? where shiftend is NULL',[req.body.idUser], function (error, results) {
          if (error) throw error;
          console.log("Shift ended");
          res.send(results);
      })
  })
})

//Update shift length to the shift table
app.get('/setlength/', function(req, res) {
    dbConn.getConnection(function() {
        dbConn.query('update shift set shiftlength = timestampdiff(second, shiftstart, shiftend)',[req.params.idUser], function (error, results) {
            if (error) throw error;
            console.log("Shift length updated");
            res.send(results);
        })
    })
})
//Select month to show shifts from that month
app.get('/monthtotal/:idUser/:month', function(req, res) {
  dbConn.getConnection(function() {
      dbConn.query('select *, date_format(shiftstart, "%d.%m.%Y : %H.%i.%s") as start, date_format(shiftend, "%d.%m.%Y : %H.%i.%s") as end from shift where idUser=? and month(shiftstart) = ?',[ req.params.idUser, req.params.month], function (error, results) {
          if (error) throw error;
          console.log("Monthly hours calculated");
          res.send(results);
      })
  })
})

//count shift lengths in one month together
app.get('/totalmonth/:idUser/:month', function(req, res) {
  dbConn.getConnection(function() {
      dbConn.query('select time_format(sec_to_time(sum(shiftlength)), "%H.%i.%s") as totaltime from shift where idUser=? and month(shiftstart) = ?',[req.params.idUser, req.params.month], function (error, results) {
          if (error) throw error;
          console.log("Shifts counted together");
          res.send(results);
      })
  })
})

//, date_format(shiftstart, "%d.%m.%Y : %H.%i.%s") as start, date_format(shiftend, "%d.%m.%Y : %H.%i.%s") as end from

app.get("/",(req,res)=>{
    res.send("testing")

});
app.listen(5002, () => {
  console.log('Running on port 5002');
});