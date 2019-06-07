FROM node:carbon

# Create app directory
WORKDIR /crawl-app
ADD . /crawl-app


CMD [ "npm", "install", "--no-bin-links" ]
EXPOSE 8080

CMD [ "npm", "start" ]