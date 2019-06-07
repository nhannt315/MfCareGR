const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const RabbitMQ = require('./rabbitmq');
const notificationController = require('./controllers/notification');


let userList = [];

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

dotenv.config({path: '.env'});

// mongo
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});


// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.use(notificationController);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.listen(PORT, HOST);
const server = http.Server(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  socket.on('add_user', (data) => {
    const userIndex = userList.findIndex(x => x.userId === data.userId);
    if (userIndex <= -1) {
      userList.push({
        socketId: socket.id,
        userId: data.userId,
      });
    }
    console.log(`user connected : ${data.userId} :`, userList);
  });
  socket.on('remove_user', (data) => {
    const userIndex = userList.findIndex(x => x.userId === data.userId);
    if (userIndex > -1) {
      userList.splice(userIndex, 1);
      console.log(`remove user : ${data.userId}`);
      console.log('user list', userList);
    }
  });
  socket.on('disconnect', () => {
    const userIndex = userList.findIndex(x => x.socketId === socket.id);
    if (userIndex > -1) {
      console.log(`user disconnected : ${userList[userIndex].userId}`);
      userList.splice(userIndex, 1);
      console.log('user list', userList);
    }
  });
});

const emitNotification = (receiverId, notification) => {
  const user = userList.find(x => x.userId === receiverId);
  console.log(userList);
  console.log(user, notification);
  if (user) {
    // io.to(user.socketId).emit({notification: notification});
    io.sockets.connected[user.socketId].emit('notification', notification);
  }
};

const rabbitmq = new RabbitMQ(emitNotification);
server.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
