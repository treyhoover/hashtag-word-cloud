FROM node:slim
MAINTAINER Trey Hoover

WORKDIR /home/app

RUN touch /home/app/server.js

COPY ./package.json package.json
COPY ./webpack.config.js webpack.config.js

RUN ["npm", "install"]
CMD ["npm", "start"]