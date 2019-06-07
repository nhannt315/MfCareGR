FROM rabbitmq:3.5.7-management

MAINTAINER <nhannt.bk@gmail.com>


COPY rabbitmq.config /etc/rabbitmq/
COPY custom_definitions.json /etc/rabbitmq/

EXPOSE 15672
EXPOSE 5672
CMD ["rabbitmq-server"]