FROM node:carbon

ARG PORT=3000
ENV PORT ${PORT}

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

LABEL nhannt nhannt

WORKDIR /gateway
ADD . /gateway

RUN ["npm", "install"]

EXPOSE 4000

CMD ["npm", "start"]
