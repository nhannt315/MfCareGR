var express = require('express');
const queryString = require('query-string');
var router = express.Router();
const apiAdapter = require('./apiAdapter');

const BASE_URL = 'http://notification-app:8080';
const api = apiAdapter(BASE_URL);

router.get('/notifications', (req, res) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  api.get(req.originalUrl, {headers: {'Authorization': token}})
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

module.exports = router;