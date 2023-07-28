// Installing depedendcies

const express = require('express');
const app = express();

var pg = require('pg');
//or native libpq bindings
// var pg = require('pg').native

let users = [];

var conString = "postgres://mdkmnhui:bJXnvjYj8SwU_Tnc-h8b7B6nrfVjy5-8@heffalump.db.elephantsql.com/mdkmnhui" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT * FROM users;', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    users = result.rows;
    console.log(users);
    client.end();
  });
});


// creating users
// TO DO: fetching user data from database


app.set('view engine', 'ejs');

// for user input
const bodyParser = require('body-parser')
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({    
     extended: true
}))


// sending variables to the express view page
// app.get("/", (req, res) => {
//     res.render("home", { variableName: "Bucky's Chat Room" })
// })

app.get("/", function (req, res) {
    res.render("home", {
        data: users
    })
})

app.post("/", (req, res) => {
    const inputUserName = req.body.userName
    const inputUserMessage = req.body.userMessage
  
    users.push({
        userName: inputUserName,
        userMessage: inputUserMessage,
    })
  
    res.render("home", {
        data: users
    })
})
 

// start the app
app.listen(3000, (req, res) => {
    console.log("App is running on port 3000")
})