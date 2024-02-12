const express = require('express');
const adminRoute = express();
const session = require('express-session');
const adminController = require('../controllers/adminController');
const bodyParser = require('body-parser');
const setNoCache = require('../middleware/cache');
const authenticateLoggedIn = require('../middleware/authLoggedIn');
const authenticateLoggedOut = require('../middleware/authLoggedOut');
const userController = require('../controllers/userController');

//session
adminRoute.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //One Week
    },
  })
);

//view engine
adminRoute.set('view engine', 'ejs');
adminRoute.set('views', './views/admin');

//BodyParser for req.body
adminRoute.use(bodyParser.json());
adminRoute.use(bodyParser.urlencoded({ extended: true }));

//Import AdminController.js
adminRoute.get('/login', authenticateLoggedOut, adminController.getAdminLogin);
adminRoute.post('/login', adminController.postAdminLogin);
adminRoute.get('/home', authenticateLoggedIn, adminController.AdminHome);

module.exports = adminRoute;
