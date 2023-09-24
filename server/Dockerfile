FROM node:slim

WORKDIR /shopify_server

COPY . ./package*.json ./

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start"]
