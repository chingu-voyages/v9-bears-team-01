const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  }
});

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
