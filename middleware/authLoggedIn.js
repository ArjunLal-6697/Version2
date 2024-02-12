const authLoggedIn = (req, res, next) => {
  // User is logged in, proceed to the next middleware or route handler
  if (req.session.isLoggedIn) {
    next();
  } else {
    // User is not logged in, redirect to the login page
    res.redirect('login');
  }
};

module.exports = authLoggedIn;
