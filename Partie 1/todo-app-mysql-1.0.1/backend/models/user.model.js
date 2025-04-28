const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  address: String,
  zip: Number,
  localtion: String
});

const User = mongoose.model('User', Userschema);
module.exports = User;
