const Todo = require('../models/todo.model.mongo');
const User = require('../models/user.model.mongo');
const mongoose = require('mongoose');

const TodoController = {
  createTodo: async (req, res) => {
    const user_id = req.sub;
    const { text, date } = req.body;

    try {
      /*const todo = new Todo({ text: text, date: date, completed: false });
      const user = await User.findById(user_id);
      user.todos.push(todo);
      user.save();
      console.log(user);*/
      const todo = Todo.create({
        text: text,
        date: date,
        user_id: user_id,
        completed: false
      });
      return res.status(201).json(todo);
    } catch (err) {
      return res.status(500);
    }
    /*await TodoModel.create({
      text: text,
      date: date,
      completed: false,
      user_id: user_id
    })
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((error) => {
        console.error('ADD TODO: ', error);
        return res.status(500);
      });*/
  },
  getAllTodo: async (req, res) => {
    const user_id = req.sub;

    try {
      //const user = await User.findById(user_id).exec();
      //const user = await User.findById(user_id).sort({ date: 'asc' });
      const todos = await Todo.find({ user_id: user_id }, '_id text date completed user_id').exec();
      if (todos) {
        console.log(todos[1]._id);
        return res.status(200).json(todos);
      }
      return res.status(404);
    } catch {
      return res.status(500);
    }

    /*await TodoModel.findAll({
      where: { user_id: user_id },
      order: [['date', 'ASC']],
      attributes: { exclude: ['user_id'] }
    })
      .then((result) => {
        if (result) {
          return res.status(200).json(result);
        } else {
          return res.status(404);
        }
      })
      .catch((error) => {
        console.error('GET ALL TODO: ', error);
        return res.status(500);
      });*/
  },
  editTodo: async (req, res) => {
    const user_id = req.sub;
    const id = req.params.id;

    const todo = await Todo.findById({ _id: id }).updateOne({ completed: true });

    /*
    const query = { id: req.params.id, user_id: user_id };
    const data = req.body;
    const result = await TodoModel.findOne({ where: query });
    if (result) {
      result.completed = data.completed ? data.completed : false;
      result.text = data.text ? data.text : result.text;
      result.date = data.date ? data.date : result.date;
      await result
        .save()
        .then(() => {
          return res.status(200).json(result);
        })
        .catch((error) => {
          console.error('UPDATE TODO: ', error);
          return res.status(500);
        });
    } else {
      return res.status(404);
    }*/
  },
  deleteTodo: (req, res) => {
    const user_id = req.sub;
    const todo_id = req.params.id;
    const query = { id: todo_id, user_id: user_id };
    console.log(req.params.id);
    console.log(req.params);
    Todo.deleteOne({ _id: todo_id });
    /*TodoModel.destroy({
      where: query
    })
      .then(() => {
        return res.status(200).json({ id: todo_id });
      })
      .catch((error) => {
        console.error('DELETE TODO: ', error);
        return res.status(500);
      });*/
  },
  getSearchTodo: async (req, res) => {
    const user_id = req.sub;
    const query = req.query.q;
    console.log(query);

    function escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    const querySafe = escapeRegex(query);
    console.log(querySafe);

    const regex = new RegExp(querySafe, 'i');
    console.log(regex);

    const todos = await Todo.find({
      user_id: user_id,
      text: regex
    }).exec();
    if (todos) {
      return res.status(200).json(todos);
    }
    return res.status(404);
  }
};

module.exports = TodoController;
