// Write your server logic here

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/questions', (req, res) => {
  fs.readFile(path.join(__dirname, 'questions.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading questions file:', err);
      return res.status(500).json({ error: 'Failed to load questions' });
    }

    try {
      const questions = JSON.parse(data);
      res.json(questions);
    } catch (err) {
      console.error('Error parsing questions JSON:', err);
      return res.status(500).json({ error: 'Failed to parse questions' });
    }
  });
});

app.listen(port, () => {
  console.log(`Quiz game server is running at http://localhost:${port}`);
});
