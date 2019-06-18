const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();
const PORT = process.env.PORT || 5000;

//'require' will just run the file, in this case it loads the models
require('./models/User');
require('./models/Stock');
//alternate way if User had module.exports:
// const User = require('./models/User')

app.listen(PORT, () => {
  console.log(`Express running on port ${PORT}`);
});

app.use(bodyParser.json());

//alternate way to parse request body
// app.user(express.json())

mongoose.connect(config.mongodb.dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

require('./routes/userRoutes')(app);
require('./routes/stockRoutes')(app);

//alternate way
// 1. use Express router
// const router = new express.Router()
// router.get('/test', (req,res)...)
// module.exports = router
// 2. register router w/ app
// const userRouter = require('./userRoutes')
// app.use(userRouter)

app.get('/api/test', (req, res) => {
  res.send('it works!');
});

// finally, if you get here, you want a file or route from the React static build
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
