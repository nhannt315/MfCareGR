var express = require('express');
const queryString = require('query-string');
var router = express.Router();
const apiAdapter = require('./apiAdapter');

const BASE_URL = 'http://article-app:3000';
const api = apiAdapter(BASE_URL);


router.get('/articles/get_top', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.get('/articles', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.post('/articles/related_articles', (req, res) => {
  api.post(req.originalUrl, {tag_ids: req.body.tag_ids})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.get('/articles/:id', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

module.exports = router;
