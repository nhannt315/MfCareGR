const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  sender: {
    name: String,
    slug: String,
    avatar: String
  },
  receiver_id: Number,
  content: String,
  type: {
    type: String,
    enum: ['QuestionAnswered', 'FollowedThread', 'FollowedUser'],
    default: 'FollowedThread'
  },
  threadSlug: String,
  seen: Boolean
});

module.exports = notificationSchema;