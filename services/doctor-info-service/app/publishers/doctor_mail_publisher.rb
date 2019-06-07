class DoctorMailPublisher
  attr_reader :receiver, :subject, :body

  def initialize(receiver, subject, body)
    @receiver = receiver
    @subject = subject
    @body = body
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
    {receiver: receiver, subject: subject, body: body, fromName: "Ban quản trị MfCare"}.to_json
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
    @queue ||= channel.queue 'mailQueue', durable: true
  end
end
