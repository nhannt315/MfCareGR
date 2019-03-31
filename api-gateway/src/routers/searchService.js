var express = require('express');
const queryString = require('query-string');
var router = express.Router();
const apiAdapter = require('./apiAdapter');

const BASE_URL = 'http://search-app:3000';
const api = apiAdapter(BASE_URL);

router.get('/search', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

module.exports = router;