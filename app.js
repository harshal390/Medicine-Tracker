const express = require('express');
const config = require('./config/env');
const app = express();

const port = config.port;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`);
   
});