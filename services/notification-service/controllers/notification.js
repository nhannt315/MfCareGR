const express = require('express');
const Router = express.Router();

const notificationModel = require('../models/notification');
const userService = require('../services/user');

Router.get('/notifications', (req, res) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.send({message: 'No Permission'}).status(403);
  }
  userService.authenticate(token)
    .then(user => {
      notificationModel.getNotifications(user.data.id)
        .then(notifications => {
          res.send(notifications);
        })
        .catch(error => {
          res.status(500).send({error: error});
        })
    })
    .catch(error => {
      if (error && error.response) {
        res.status(error.response.status).send(error.response.data);
      } else {
        console.log(error);
        res.status(500).send({message: 'Service error'});
      }
    })
});

module.exports = Router;