const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  ticker: {
    type: String,
    required: true,
    uppercase: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  }
});

mongoose.model('stocks', stockSchema);
