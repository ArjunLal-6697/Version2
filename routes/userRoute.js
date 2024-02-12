const express = require('express');
const userRoute = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const setNoCache = require('../middleware/cache');
const authenticateLoggedIn = require('../middleware/authLoggedIn');
const authenticateLoggedOut = require('../middleware/authLoggedOut');
const userController = require('../controllers/userController');

//session
userRoute.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //One Week
    },
  })
);

//middleware

//View Engine
userRoute.set('view engine', 'ejs');
userRoute.set('views', './views/users');

//BodyParser for req.body

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));

//Import UserController.js

// Use setNoCache middleware for all routes
userRoute.use(setNoCache);

//Import UserController.js
userRoute.get('/register', authenticateLoggedOut, userController.getRegister);
userRoute.post('/register', authenticateLoggedOut, userController.postRegister);
userRoute.get('/login', authenticateLoggedOut, userController.getLogin);
userRoute.post('/login', userController.postLogin);
userRoute.get('/home', authenticateLoggedIn, userController.UserHome);
userRoute.get('/logout', userController.logout);

// Redirect root to login
userRoute.get('/', authenticateLoggedOut, (req, res) => {
  res.redirect('/login');
});

module.exports = userRoute;
