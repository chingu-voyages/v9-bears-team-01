const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is not valid.');
      }
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
    trim: true
    // validate(value) {
    //   if (value.includes('password')) {
    //     throw new Error('Password cannot contain "password"');
    //   }
    // }
  },
  tokens: [{ token: { type: String, required: true } }]
});

//instance method that we call on a specifc instance of user, not the User model
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.jwt.signature);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//This is a model method, so you can call it with User.findByCredentials; as opposed to an instance method
userSchema.statics.findByCredentials = async function(email, password) {
  const User = this;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to log in.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to log in.');
  }

  return user;
};

// Has plain text password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//this creates a model class
mongoose.model('users', userSchema);
