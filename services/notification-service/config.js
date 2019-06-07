module.exports = {
  rabbitmq: {
    schema: 'amqp://',
    host: 'rabbitmq',
    port: '5672',
    vhost: 'mfcare-vhost',
    exchangeName: 'notifications',
    exchangeType: 'direct',
    questionNotifyQueueName: 'questionAnsweredNotify',
    followedUserNotifyQueueName: 'followedUserAnswerNotify',
    followedThreadNotifyQueueName: 'followedThreadNotify',
    durable: true,
    autoDelete: false,
    noAck: true,
    messageExpTime: 3600,
    user: 'admin',
    pass: 'nimda',
  },
};
