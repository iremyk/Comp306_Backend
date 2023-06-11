const express = require('express');
const cors = require('cors');

const router = require('./routes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});
