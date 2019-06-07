const mongoose = require('mongoose');
const notificationSchema = require('../schemas/notification');

const notificationModel = mongoose.model('Notification', notificationSchema);

const getNotifications = userId => {
  return notificationModel.where('receiver_id', userId).exec();
};

const insertNotifications = (sender, notiType, receiverIds, threadSlug) => {
  let content = '';
  switch (notiType) {
    case 'QuestionAnswered':
      content = `${sender.name} vừa trả lời một câu hỏi của bạn`;
      break;
    case 'FollowedThread':
      content = `${sender.name} vừa bình luận về một câu hỏi mà bạn đang theo dõi`;
      break;
    case 'FollowedUser':
      content = `${sender.name} vừa đăng một câu hỏi mới`;
      break;
    default:
      content = '';
  }
  const objectsToSave = receiverIds.map(id => ({
    sender: {
      name: sender.name,
      slug: sender.id,
      avatar: sender.avatar
    },
    receiver_id: id,
    content: content,
    threadSlug: threadSlug,
    seen: false,
    type: notiType
  }));
  return notificationModel.insertMany(objectsToSave);
};

const insertNotification = (sender, notiType, receiverId, threadSlug) => {
  let content = '';
  switch (notiType) {
    case 'QuestionAnswered':
      content = `${sender.name} vừa trả lời một câu hỏi của bạn`;
      break;
    case 'FollowedThread':
      content = `${sender.name} vừa bình luận về một câu hỏi mà bạn đang theo dõi`;
      break;
    case 'FollowedUser':
      conent = `${sender.name} vừa đăng một câu hỏi mới`;
      break;
    default:
      content = '';
  }
  notification = new notificationModel({
    sender: {
      name: sender.name,
      slug: sender.id,
      avatar: sender.avatar
    },
    receiver_id: receiverId,
    content: content,
    threadSlug: threadSlug,
    seen: false,
    type: notiType
  });
  return notification.save();
};

module.exports = {
  getNotifications,
  insertNotifications,
  insertNotification
};