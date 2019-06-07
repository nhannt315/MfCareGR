module.exports = {
  rabbitmq: {
    schema: 'amqp://',
    host: 'rabbitmq',
    port: '5672',
    vhost: 'mfcare-vhost',
    exchangeName: 'mails',
    exchangeType: 'direct',
    mailQueue: 'mailQueue',
    durable: true,
    autoDelete: false,
    noAck: true,
    messageExpTime: 3600,
    user: 'admin',
    pass: 'nimda',
  },
};