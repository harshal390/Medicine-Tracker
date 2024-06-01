const express = require('express');
const config = require('./config/env');
const app = express();

const port = config.port;

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`);
   
});