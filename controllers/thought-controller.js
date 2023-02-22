const { Thought, Reaction } = require("../models");

const thoughtController = {
  getThought: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      await Thought.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Thought deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  makeReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      const reaction = await Reaction.create(req.body);
      thought.reactions.push(reaction);
      await thought.save();
      res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.pull(req.params.reactionId);
      await thought.save();
      await Reaction.findByIdAndDelete(req.params.reactionId);
      res.status(200).json({ message: "Reaction deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
