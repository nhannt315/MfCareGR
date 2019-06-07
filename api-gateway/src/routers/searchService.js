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
      if (error && error.response) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send({message: 'Service error'});
      }
    });
});

router.get('/search_article', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      if (error && error.response) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send({message: 'Service error'});
      }
    });
});

module.exports = router;