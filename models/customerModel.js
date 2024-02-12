const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstname: {
    type: 'string',
    require: true,
  },
  lastname: {
    type: 'string',
    require: true,
  },
  tel: {
    type: 'string',
    require: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  Admin: {
    type: 'boolean',
    default: false,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
