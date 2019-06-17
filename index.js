const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();
const PORT = process.env.PORT || 5000;

require('./models/User');

app.listen(PORT, () => {
  console.log(`Express running on port ${PORT}`);
});

app.use(bodyParser.json());

mongoose.connect(config.mongodb.dbURI, { useNewUrlParser: true });

require('./routes/userRoutes')(app);

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
