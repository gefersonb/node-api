FROM node:8.7-alpine
RUN mkdir /app
WORKDIR /app
COPY ./node-api-01/package.json /app
RUN npm install
COPY ./node-api-01/ /app
EXPOSE 3001
CMD ["npm", "start"]
