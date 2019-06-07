const notificationModel = require('../models/notification');
const userService = require('../services/user');

class QuestionAnsweredNotificationConsumer {
  constructor(data, emitNotification) {
    this.data = data;
    this.emitNotification = emitNotification;
  }

  async process() {
    console.log('QuestionAnswered queue:');
    const {sender_id, receiver_id, thread_slug} = JSON.parse(this.data.content);
    userService.getUserById(sender_id)
      .then(resp => {
        notificationModel.insertNotification(resp.data[0], 'QuestionAnswered', receiver_id, thread_slug)
          .then(data => {
            this.emitNotification(receiver_id, data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log('User service error!');
        console.log(error);
      });
  }
}

module.exports = QuestionAnsweredNotificationConsumer;
