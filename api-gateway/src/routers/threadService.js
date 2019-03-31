var express = require('express');
const queryString = require('query-string');
var router = express.Router();
const apiAdapter = require('./apiAdapter');

const BASE_URL = 'http://toukou-app:3000';
const api = apiAdapter(BASE_URL);

router.get('/toukous', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.get('/toukous/:id', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.get('/toukous/:id/get_comment_detail', (req, res) => {
  api.get(req.originalUrl)
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.post('/posts', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.post(req.originalUrl, req.body, {headers: headers})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.put('/posts/:id', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.put(req.originalUrl, req.body, {headers: headers})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.delete('/posts/:id', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.delete(req.originalUrl, {headers: headers})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.post('/toukous', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.post(req.originalUrl, req.body, {headers: headers})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.put('/toukous/:id', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.put(req.originalUrl, req.body, {headers: headers})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.post('/tag/', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.post(req.originalUrl, req.body, {headers: headers})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});


router.post('/like', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.post(req.originalUrl, req.body, {headers: headers})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

router.delete('/like/:id', (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  let headers = {
    'Authorization': req.headers.authorization
  };
  api.delete(req.originalUrl, {headers: headers})
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      res.status(error.response.status).send(error.response.statusText);
    });
});

module.exports = router;