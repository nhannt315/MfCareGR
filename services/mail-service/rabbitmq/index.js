const amqp = require('amqplib');
const config = require('../config.js');

const DoctorMailQueueConsumer = require('./doctorMail');

const {
  schema,
  vhost,
  host,
  port,
  exchangeName,
  exchangeType,
  mailQueue,
  durable,
  autoDelete,
  noAck,
  user,
  pass,
} = config.rabbitmq;

class RabbitMQ {
  constructor(sendMail) {
    this.initialize(sendMail);
  }

  async initialize(sendMail) {
    try {
      const url = `${schema}${user}:${pass}@${host}:${port}/${vhost}`;
      this.conn = await amqp.connect(url);
      this.channel = await this.conn.createChannel();
      const doctorMailConsumer = d => (new DoctorMailQueueConsumer(d, sendMail)).process();

      await Promise.all([
        this.channel.assertExchange(exchangeName, exchangeType, {durable}),
        this.channel.assertQueue(mailQueue, {durable, autoDelete}),
      ]);

      await Promise.all([
        this.channel.bindQueue(mailQueue, exchangeName, mailQueue),
        this.channel.consume(mailQueue, doctorMailConsumer, {noAck}),
      ]);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = RabbitMQ;
