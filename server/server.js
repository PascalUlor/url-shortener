const express = require('express');
const mongoose = require('mongoose');
require('./models/UrlShorten');
const routes = require('./routes');

// db connect
const mongoURI = "mongodb://localhost/url-shortner";

// const connectOptions = {
//     keepAlive: true,
//   reconnectTries: Number.MAX_VALUE
// }

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useNewUrlParser: true , useUnifiedTopology: true}, (err) => {
    if (err) console.log(`Error`, err);
  console.log(`Connected to MongoDB`);
})

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,x-access-token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });


app.use('/api', routes);

module.exports = app;