FROM node:carbon

# Create app directory
WORKDIR /mail-app
ADD . /mail-app


CMD [ "npm", "install", "--no-bin-links" ]
EXPOSE 8080

CMD [ "npm", "start" ]