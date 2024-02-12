const Customer = require('../models/customerModel');
const bcrypt = require('bcrypt');

//get Register
exports.getRegister = async (req, res) => {
  await res.render('register', { pageTitle: 'Register' });
};

//post Register
exports.postRegister = async (req, res, next) => {
  try {
    const { firstname, lastname, tel, email, password } = req.body;

    // Password hashing
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = new Customer({
      firstname,
      lastname,
      tel,
      email,
      password: hashedPassword,
      Admin: false,
    });

    // Email is already registered
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      res.status(400).send('Email is already registered');
      return;
    }

    await customer.save();

    res.redirect('login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

//get Login
exports.getLogin = async (req, res) => {
  // Check if the user is already logged in
  if (req.session.isLoggedIn) {
    res.redirect('home');
    return;
  }
  await res.render('login');
};

//post Login
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Customer.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.redirect('login');
    } else {
      // Set session flags to indicate successful login
      req.session.isLoggedIn = true;
      req.session.customer = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
      res.redirect('/home');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

//Home page
exports.UserHome = async (req, res) => {
  await res.render('Home');
};

//logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('login');
    }
  });
};
