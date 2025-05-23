const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  address: String,
  zip: String,
  location: String,
  todos: Array
});

const User = mongoose.model('User', userSchema);

module.exports = User;
