const { User } = require("../models");

const userController = {
  getUser: async (req, res) => {
    try {
      const users = await User.find().populate("friends");
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("friends");
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).populate("friends");
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const friend = await User.findById(req.params.friendsId);
      user.friends.push(friend);
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  deleteFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      user.friends.pull(req.params.friendsId);
      await user.save();
      res.status(200).json({ message: "Friend deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
