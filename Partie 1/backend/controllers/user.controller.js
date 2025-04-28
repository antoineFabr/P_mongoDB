const bcrypt = require('bcrypt');
const User = require('../models/user.model.mongo.js');

const UserController = {
  createUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = new User({
        email: email.toLowerCase(),
        password: await bcrypt.hash(password, 8)
      });
      const userAlreadyExist = await User.find({ email: email.toLowerCase() });
      if (userAlreadyExist.length !== 0) {
        console.log(userAlreadyExist);
        return res.status(409).json({
          message: 'Un compte avec cet email exist déjà !'
        });
      }

      await user.save();
      return res.status(201).json(user);
    } catch {
      return res.status(500);
    }
  },
  getUser: async (req, res) => {
    const user_id = req.sub;
    try {
      const user = await User.findById(user_id);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404);
      }
    } catch {
      return res.status(500);
    }
    /*await UserModel.findOne({
      where: { id: user_id },
      attributes: { exclude: ['id', 'password'] }
    })
      .then((result) => {
        if (result) {
          return res.status(200).json(result);
        } else {
          return res.status(404);
        }
      })
      .catch((error) => {
        console.error('GET USER: ', error);
        return res.status(500);
      });*/
  },
  editUser: async (req, res) => {
    const user_id = req.sub;
    const data = req.body;
    const user = await User.findById(user_id);
    if (user) {
      user.name = data.name ? data.name : null;
      user.address = data.address ? data.address : null;
      user.zip = data.zip ? data.zip : null;
      user.location = data.location ? data.location : null;
      try {
        await user.save();
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500);
      }
    } else {
      return res.status(404);
    }
  },
  deleteCurrentUser: async (req, res) => {
    const user_id = req.sub;
    try {
      await User.findByIdAndDelete(user_id);
      return res.status(200).json({ id: user_id });
    } catch (error) {
      return res.status(500);
    }
  }
};

module.exports = UserController;
