const amqp = require('amqplib');
const config = require('../config.js');

const QuestionAnsweredNotificationConsumer = require('./questionAnswered');
const FollowedUserNotificationConsumer = require('./followedUser');
const FollowedThreadNotificationConsumer = require('./followedThread');

const {
  schema,
  vhost,
  host,
  port,
  exchangeName,
  exchangeType,
  questionNotifyQueueName,
  followedUserNotifyQueueName,
  followedThreadNotifyQueueName,
  durable,
  autoDelete,
  noAck,
  user,
  pass,
} = config.rabbitmq;

class RabbitMQ {
  constructor(emitNotification) {
    this.initialize(emitNotification);
  }

  async initialize(emitNotification) {
    try {
      const url = `${schema}${user}:${pass}@${host}:${port}/${vhost}`;
      this.conn = await amqp.connect(url);
      this.channel = await this.conn.createChannel();
      const questionNotifyConsumer = d => (new QuestionAnsweredNotificationConsumer(d, emitNotification)).process();
      const followedUserNotifyConsumer = d => (new FollowedUserNotificationConsumer(d, emitNotification)).process();
      const followedThreadNotifyConsumer = d => (new FollowedThreadNotificationConsumer(d, emitNotification)).process();

      await Promise.all([
        this.channel.assertExchange(exchangeName, exchangeType, {durable}),
        this.channel.assertQueue(questionNotifyQueueName, {durable, autoDelete}),
        this.channel.assertQueue(followedUserNotifyQueueName, {durable, autoDelete}),
        this.channel.assertQueue(followedThreadNotifyQueueName, {durable, autoDelete}),
      ]);

      await Promise.all([
        this.channel.bindQueue(questionNotifyQueueName, exchangeName, questionNotifyQueueName),
        this.channel.bindQueue(followedUserNotifyQueueName, exchangeName, followedUserNotifyQueueName),
        this.channel.bindQueue(followedThreadNotifyQueueName, exchangeName, followedThreadNotifyQueueName),
        this.channel.consume(questionNotifyQueueName, questionNotifyConsumer, {noAck}),
        this.channel.consume(followedUserNotifyQueueName, followedUserNotifyConsumer, {noAck}),
        this.channel.consume(followedThreadNotifyQueueName, followedThreadNotifyConsumer, {noAck}),
      ]);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = RabbitMQ;
