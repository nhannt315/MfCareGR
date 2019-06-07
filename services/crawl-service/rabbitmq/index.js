const amqp = require('amqplib');
const config = require('../config.js');


const {
  schema,
  vhost,
  host,
  port,
  user,
  pass,
} = config.rabbitmq;

class RabbitMQ {
  constructor(callback) {
    this.initialize(callback);
  }

  async initialize(callback) {
    try {
      const url = `${schema}${user}:${pass}@${host}:${port}/${vhost}`;
      this.conn = await amqp.connect(url);
      this.channel = await this.conn.createChannel();
      callback(this.channel);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = RabbitMQ;
