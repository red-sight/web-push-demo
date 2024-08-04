FROM node:18-alpine
WORKDIR /app
COPY . .
ENV NODE_ENV='production'
RUN yarn
RUN yarn build
RUN npm i -g serve
RUN rm -rf client/src
RUN rm -rf server/src
RUN rm -rf server/test
