var express = require('express');
const queryString = require('query-string');
var router = express.Router();
const apiAdapter = require('./apiAdapter');

const BASE_URL = 'http://doctor-app:3000';
const api = apiAdapter(BASE_URL);

router.get('/doctors', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.get('/doctors/admin_doctor_list', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.get(req.originalUrl, {headers: headers})
    .then(resp => res.send(resp.data))
    .catch(error => {
      if (error) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send({message: 'Service error'});
      }
    });
});

router.get('/doctors/:id/admin_doctor_detail', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.get(req.originalUrl, {headers: headers})
    .then(resp => res.send(resp.data))
    .catch(error => {
      if (error) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send({message: 'Service error'});
      }
    });
});

router.post('/doctors/', (req, res) => {
  api.post(req.originalUrl, req.body)
    .then(resp => res.send(resp.data))
    .catch(error => {
      if (error) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send({message: 'Service error'});
      }
    })
});

router.put('/doctors/:id', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  console.log('here');
  api.put(req.originalUrl, req.body, {headers: headers})
    .then(resp => res.send(resp.data))
    .catch(error => {
      if (error) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send({message: 'Service error'});
      }
    });
});

router.post('/doctors/:id/approve', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.post(req.originalUrl, req.body, {headers: headers})
    .then(resp => res.send(resp.data))
    .catch(error => {
      if (error) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send({message: 'Service error'});
      }
    })
});

router.post('/doctors/:id/decline', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.post(req.originalUrl, req.body, {headers: headers})
    .then(resp => res.send(resp.data))
    .catch(error => {
      if (error) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send({message: 'Service error'});
      }
    })
});

router.get('/specialities', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.get('/filter_data', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.get('/doctors/:id', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

module.exports = router;
