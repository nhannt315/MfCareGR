FROM node:carbon

# Create app directory
WORKDIR /notification-app
ADD . /notification-app


CMD [ "npm", "install", "--no-bin-links" ]
EXPOSE 8080

CMD [ "npm", "start" ]