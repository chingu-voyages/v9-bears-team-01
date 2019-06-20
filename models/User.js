const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const validator = require('validator');

require('./Stock');
const Stock = mongoose.model('stocks');

const userSchema = new mongoose.Schema({
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

userSchema.virtual('stocks', {
  ref: 'stocks',
  localField: '_id',
  foreignField: 'user'
});

//instance method that we call on a specifc instance of user, not the User model
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.jwt.signature);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
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

// middleware to hash plain text password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// middleware to delete user's stocks when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;
  await Stock.deleteMany({ user: user._id });
  next();
});

//this creates a model class
//NOTE: it doesn't matter if you do 'users' or 'User', but keep it consistent!
mongoose.model('users', userSchema);
