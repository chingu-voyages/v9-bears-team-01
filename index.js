const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config/config');
const _ = require('lodash');

const app = express();
const PORT = process.env.PORT || 5000;

require('./models/User');
const User = mongoose.model('users');

app.listen(PORT, () => {
  console.log(`Express running on port ${PORT}`);
});

app.use(bodyParser.json());

mongoose.connect(config.mongodb.dbURI, { useNewUrlParser: true });

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

app.get('/api/test', (req, res) => {
  res.send('it works!');
});

app.get('/buy/:ticker/:quantity/:date/', (req, res) => {
  res.send('it works!');
});

// finally, if you get here, you want a file or route from the React static build
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
