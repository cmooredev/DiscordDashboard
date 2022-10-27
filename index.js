const express = require('express');
const { port } = require('./config.json');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (request, response) => {
  return response.sendFile('index.html', {root: '.'});
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
