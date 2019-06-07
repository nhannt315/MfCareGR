const notificationModel = require('../models/notification');
const userService = require('../services/user');

class FollowedThreadNotificationConsumer {
  constructor(data, emitNotification) {
    this.data = data;
    this.emitNotification = emitNotification;
  }

  async process() {
    console.log('FollowedThread queue:');
    const {sender_id, receiver_ids, thread_slug} = JSON.parse(this.data.content);
    userService.getUserById(sender_id)
      .then(resp => {
        notificationModel.insertNotifications(resp.data[0], 'FollowedThread', receiver_ids, thread_slug)
          .then(data => {
            data.map(noti => {
              this.emitNotification(noti.receiver_id, noti);
            });
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

module.exports = FollowedThreadNotificationConsumer;
