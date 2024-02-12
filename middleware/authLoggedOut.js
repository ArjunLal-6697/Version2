const authLoggedOut = (req, res, next) => {
  // Check if the customer is loggedIn
  // Redirect to the home page
  if (req.session.isLoggedIn) {
    return res.redirect('home');
  }
  // If not loggedIn, proceed to the next middleware or route handler
  next();
};

module.exports = authLoggedOut;
