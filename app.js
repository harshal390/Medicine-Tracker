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
// We still don't get the real user IP address because Express doesn't trust information forwarded from a reverse proxy, and thus the configuration is disabled by default. We must update our code to add the line below:
app.set('trust proxy', true);




app.get('/', auth, (req, res) => {
  res.render('index.ejs', { user: req.user })
});
app.use('/', authRoute);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port} http://localhost:${port}`);

});