const mongoose = require('mongoose');
const User = mongoose.model('users');
const _ = require('lodash');

module.exports = app => {
  app.post('/user', (req, res) => {
    console.log('/user post: ', req.body);
    const body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user
      .save()
      .then(user => {
        console.log('user created ', user);
        res.send('/user post working');
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  app.post('/user/login', async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );

      res.send(user);
    } catch (e) {
      res.status(400).send();
    }
  });
};
