const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
app.get('/api/test', (req, res) => {
  res.send('it works!');
});

app.get('/buy/:ticker/:quantity/:date/', (req, res) => {
  res.send('it works!');
});

app.listen(PORT, () => {
  console.log(`Express running on port ${PORT}`);
});

// finally, if you get here, you want a file or route from the React static build
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
