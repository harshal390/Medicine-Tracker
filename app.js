const express = require('express');
const config = require('./config/env');
const authRoute = require('./routes/auth.route');
const { auth } = require("./middlewares/auth");
const port = config.port;
const cookieParser = require("cookie-parser");
const medicationRoute = require('./routes/medication.route');
const notificationRoute = require('./routes/notification.route')
const cron = require("node-cron");
const { weeklyReports } = require("./controllers/weeklyreport.controller");
const { Server } = require('socket.io');
const http = require('http');


//configurations & 3rd partly middleware
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static("node_modules/sweetalert2/dist"));
app.use(cookieParser());
// We still don't get the real user IP address because Express doesn't trust information forwarded from a reverse proxy, and thus the configuration is disabled by default. We must update our code to add the line below:
app.set('trust proxy', true);


//application routes 
app.get('/', auth, (req, res) => {
  res.render('index.ejs', { user: req.user })
});
app.use('/', authRoute);
app.use('/', auth, medicationRoute);
app.use('/', notificationRoute);
app.get('/model', (req, res) => {
  res.render('model.ejs')
})


//socket configuration
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  //for logout from all device
  socket.on("logoutFromAllDevice", async (result) => {
    io.emit("logoutFromAllDevice", result);
  });
  socket.on("LogoutFromRemainingDevice", async (result) => {
    socket.broadcast.emit("LogoutFromRemainingDevice", result)
  })
});




//cron scheduling
cron.schedule("22 14 * * 3", () => {
  weeklyReports();
  console.log("Weekly Report generated At:", new Date().toLocaleString())
});

//Application Listening
server.listen(port, async () => {
  console.log(`Health & Wellness Management Application listening on http://localhost:${port} 🎉`);
});