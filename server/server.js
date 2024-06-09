const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const data = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

app.get('/', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});