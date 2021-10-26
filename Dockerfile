FROM node:17-alpine3.14
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000 
CMD npm start