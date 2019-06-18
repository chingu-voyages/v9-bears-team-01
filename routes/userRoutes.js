const mongoose = require('mongoose');
const User = mongoose.model('users');
//alternate
// const User = require('../models/User')
const _ = require('lodash');

module.exports = app => {
  app.post('/users', async (req, res) => {
    // const body = _.pick(req.body, ['email', 'password']);
    var user = new User(req.body);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
    // user
    //   .save()
    //   .then(user => {
    //     console.log('user created ', user);
    //     res.send('/user post working');
    //   })
    //   .catch(err => {
    //     res.status(400).send(err);
    //   });
  });

  app.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    } catch (e) {
      res.status(404).send(e);
    }
  });

  app.post('/users/login', async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );

      const token = await user.generateAuthToken();

      res.send({ user, token });
    } catch (e) {
      res.status(400).send();
    }
  });

  app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstName', 'lastName', 'password'];

    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (e) {
      res.status(500).send();
    }
  });
};
