const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const config = require('../config/config');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = jwt.verify(token, config.jwt.signature);
    const user = await User.findOne({
      _id: decodedToken._id,
      'tokens.token': token
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
