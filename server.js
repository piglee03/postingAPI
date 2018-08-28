const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Database
console.log(process.env.MONGO_DB);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/post", {
  useMongoClient: true
});

const db = mongoose.connection;
db.once('open', function () {
  console.log('DB connected!');
});
db.on('error', function (err) {
  console.log('DB ERROR:', err);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

// API
app.use('/api/posts', require('./api/posts'));

// Server
const port = 3000;
app.listen(port, function () {
  console.log('listening on port:' + port);
});