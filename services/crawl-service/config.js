module.exports = {
  rabbitmq: {
    schema: 'amqp://',
    host: 'rabbitmq',
    port: '5672',
    vhost: 'mfcare-vhost',
    exchangeName: 'crawl',
    exchangeType: 'direct',
    articleQueue: 'article',
    durable: true,
    autoDelete: false,
    noAck: true,
    messageExpTime: 3600,
    user: 'admin',
    pass: 'nimda',
  },
};