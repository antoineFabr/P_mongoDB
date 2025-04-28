const mongoose = require('mongoose');

const Todoschema = new mongoose.Schema({
  text: String,
  date: Date,
  completed: Boolean,
  user_id: Number
});
const Todo = mongoose.model('Todo', Todoschema);
module.exports = Todo;
