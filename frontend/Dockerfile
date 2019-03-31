FROM node:11


#COPY package.json /package.json
#COPY yarn.lock /yarn.lock

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
#RUN yarn

WORKDIR /app
COPY . /app
RUN yarn

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]
