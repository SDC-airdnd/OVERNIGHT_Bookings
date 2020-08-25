FROM node:7
WORKDIR /app
COPY . /app
RUN npm install
CMD node db/room_generater.js && node db/booking_generater.js && node server/index.js && webpack --config webpack.config.prod.js
EXPOSE 3333