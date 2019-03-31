var express = require('express');
var app = express();
var cors = require('cors');
var router = require('./routers/router');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Simple API gateway');
});

app.use(router);

console.log("Simple API Gateway run on localhost:4000");

app.listen(4000);
