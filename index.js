const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
app.get('/test', (req, res) => {
  res.send('it works!');
});

app.get('/buy/:ticker/:quantity/:date/', (req, res) => {
  res.send('it works!');
});

app.listen(PORT, () => {
  console.log(`Express running on port ${PORT}`);
});
