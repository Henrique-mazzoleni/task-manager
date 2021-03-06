FROM node:17-alpine3.14
WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install && mv node_modules ../
COPY . .

# CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]
CMD ["npm", "test"]