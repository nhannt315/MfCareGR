var express = require('express');
const queryString = require('query-string');
var router = express.Router();
const apiAdapter = require('./apiAdapter');

const BASE_URL = 'http://user-app:3000';
const api = apiAdapter(BASE_URL);

router.post('/add_user_tag', (req, res) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  api.post(req.originalUrl, req.body, {headers: {'Authorization': token}})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});


router.post('/remove_user_tag', (req, res) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  api.post(req.originalUrl, req.body, {headers: {'Authorization': token}})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.post('/users/follow', (req, res) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  api.post(req.originalUrl, req.body, {headers: {'Authorization': token}})
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


router.post('/users/unfollow', (req, res) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  api.post(req.originalUrl, req.body, {headers: {'Authorization': token}})
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

router.get('/provinces', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => res.send(resp.data))
    .catch(error => {
      if (error) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send({message: 'Service error'});
      }
    });
});

router.put('/users/:id', (req, res) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  api.put(req.originalUrl, req.body, {headers: {'Authorization': token}})
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

router.put('/change_password', (req, res) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  api.put(req.originalUrl, req.body, {headers: {'Authorization': token}})
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
