const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const db = require('./db'); // database related processes are moved to db.js

// required middleware to establish current user
const session = require('express-session');

app.use(session({
  secret: 'Otaly2022',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Make sure to change this to true and provide a secure https connection in a production environment
}));


// Set EJS as the view engine
app.set('view engine', 'ejs');
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

let users = []

users = db.fetchUsersFromDatabase()
  .then(users => console.log(users))
  .catch(err => console.error(err));


// login page route
app.get('/', async (req, res) => {
  // Fetch users from the database
  try {
    users = await db.fetchUsersFromDatabase();
    console.log(users);
    res.render('login', { data: users, message: req.query.message }); // Pass the 'data' and 'message' variables to the EJS template
  } catch (err) {
    console.error(err);
  }
});

// Sign-up page route
app.get('/signup', (req, res) => {
  res.render('signup');
});

// Home page route
app.get('/home', (req, res) => {
  if (req.session.user) {
    res.render('home', { user: req.session.user });
  }else{
    res.render('home', { message: req.query.message }); // enabling message passing
  }
});

// Register new user
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  // users.push({ username, password });
  // updating the database after new user signing up
  try {
    await db.insertUserIntoDatabase(username, password);
    console.log('New user inserted successfully');
    // updating the user list
    users = await db.fetchUsersFromDatabase();
    res.redirect(`/?message=Thank you for registering ${username}`);
  } catch (err) {
    console.error(err);
  }
});

// Login route - Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);
  if (user) {
    // Successful login, redirect to a dashboard page or welcome page
    req.session.user = user; // Store user id in session
    res.redirect(`/home`);
  } else {
    res.redirect('/?message=Invalid username or password. Please try again.');
  }
});

// Logout route - Handle logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/'); // After logout, redirect the user to the login page
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
