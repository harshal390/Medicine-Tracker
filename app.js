const express = require('express');
const config = require('./config/env');
const app = express();
const authRoute = require('./routes/auth.route');
const { auth } = require("./middlewares/auth");
const port = config.port;
const cookieParser = require("cookie-parser");

//configurations & 3rd partly middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static("node_modules/sweetalert2/dist"));
app.use(cookieParser());



app.get('/', auth, (req, res) => {
  res.render('index.ejs', { user: req.user })
});
app.use('/', authRoute);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port} http://localhost:${port}`);

});