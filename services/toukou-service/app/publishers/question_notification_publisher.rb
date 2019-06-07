class QuestionNotificationPublisher
  attr_reader :sender_id, :receiver_id, :thread

  def initialize(sender_id, receiver_id, thread)
    @sender_id = sender_id
    @receiver_id = receiver_id
    @thread = thread
  end

  def call
    publish payload
  end

  private

  def publish(data)
    channel.default_exchange.publish(data, routing_key: queue.name)
    connection.close
  end

  def payload
    {sender_id: sender_id, receiver_id: receiver_id, thread_slug: thread.slug}.to_json
  end

  def connection
    @conn ||= begin
      conn = Bunny.new(
          host: "rabbitmq",
          port: 5672,
          user: "admin",
          password: "nimda",
          vhost: "mfcare-vhost"
      )
      conn.start
    end
  end

  def channel
    @channel ||= connection.create_channel
  end

  def queue
    @queue ||= channel.queue 'questionAnsweredNotify', durable: true
  end
end
