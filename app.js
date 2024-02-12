//DB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/userManagement');

//Express
const express = require('express');
const app = express();

//Flash message
const flash = require('connect-flash');
app.use(flash({ sessionKeyName: 'flashmessage' }));

//Static files
app.use(express.static('public'));

//For user routes
const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

//For admin routes
const adminRoute = require('./routes/adminRoute');
app.use('/admin', adminRoute);

//Server
app.listen(3000, () => {
  console.log(`Server is listening`);
});
