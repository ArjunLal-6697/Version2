const Customer = require('../models/customerModel');
const bcrypt = require('bcrypt');

//get AdminLogin
exports.getAdminLogin = async (req, res) => {
  //check if the user is alreay logged in
  if (req.session.isLoggedIn) {
    res.redirect('adminHome');
    return;
  }
  await res.render('adminLogin');
};

//post admin
exports.postAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Customer.findOne({ email });

    // Check if admin is found and password is correct, and user is an admin
    if (
      admin &&
      (await bcrypt.compare(password, admin.password)) &&
      admin.Admin
    ) {
      // Set session flags to indicate successful login
      req.session.isLoggedIn = true;
      req.session.admin = {
        _id: admin._id,
        firstname: admin.firstname,
        lastname: admin.lastname,
        email: admin.email,
      };
      res.redirect('/admin/home'); // Redirect to the admin home page
    } else {
      // If admin is not found or password is incorrect or user is not an admin, redirect to admin login
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

//Admin Home
exports.AdminHome = async (req, res) => {
  await res.render('adminHome');
};

//handel the session in homepage of admin and user home page
