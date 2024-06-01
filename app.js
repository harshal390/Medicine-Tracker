const express = require('express');
const config = require('./config/env');
const app = express();
const authRoute = require('./routes/auth.route');

const port = config.port;

//configurations
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
  res.render('index.ejs')
});
app.use('/',authRoute);

app.listen(port, async () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`);
   
});