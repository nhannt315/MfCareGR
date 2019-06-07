Sneakers.configure connection: Bunny.new(host: "rabbitmq", vhost: "mfcare-vhost", user: "admin", password: "nimda")
Sneakers.logger.level = Logger::INFO # the default DEBUG is too noisy