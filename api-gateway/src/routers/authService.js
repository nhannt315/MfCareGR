var express = require('express');
const queryString = require('query-string');
var router = express.Router();
const apiAdapter = require('./apiAdapter');

const BASE_URL = 'http://user-app:3000';
const api = apiAdapter(BASE_URL);

router.post('/auth/login', (req, res) => {
  api.post(req.originalUrl, JSON.stringify(req.body))
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.post('/signup', (req, res) => {
  api.post(req.originalUrl, req.body)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      if (error) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send({message: 'Service error'});
      }
    });
});

router.get('/get_user_info/', (req, res) => {
  var token = req.headers.authorization;
  api.get(req.originalUrl, {headers: {'Authorization': token}})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});


module.exports = router;
