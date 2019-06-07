var express = require('express');
var app = express();
var cors = require('cors');
var router = require('./routers/router');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());

app.get('/', (req, res) => {
  res.send('Simple API gateway');
});

app.use(router);

console.log("Simple API Gateway run on localhost:4000");

app.listen(4000);
