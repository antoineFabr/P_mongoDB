const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  text: String,
  date: Date,
  completed: Boolean,
  user_id: String
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
