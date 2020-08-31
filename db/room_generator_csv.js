const faker = require('faker');
//const db = require('./index.js');
const fs = require('fs');
const csv = require ('fast-csv');
const ws = fs.createWriteStream('roomData.csv');
const writeBookings = fs.createWriteStream('bookingstreamer10M.json');

const roomNameAppendix = ['\'s Apartment', '\'s House', '\'s Loft', '\'s Condo'];

// roomname:
// price : 50 ~ 200
// cleaning fee: 5
// service fee: 5
// tax: 10
// max_guest: {adults: 5, children: 3, infants: 2}
//     random between 1-6 for adult, random between 0-4 kids
// min_night: 1
// max_night: random between 2-6
// ratings: random 0.0-5.0
// num_reviews: random 0-100

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rooms = [];
var id = 0;
// Random Rooms
function generateRandomRooms() {

    const room = {
      id: id,
      roomname: faker.name.findName()
      + roomNameAppendix[randomIntFromInterval(0, roomNameAppendix.length - 1)],
      price: randomIntFromInterval(50, 200),
      cleaning_fee: 5,
      service_fee: 5,
      tax: 10,
      max_guest: {
        adults: randomIntFromInterval(1, 6),
        children: randomIntFromInterval(0, 4),
        infants: randomIntFromInterval(0, 2),
      },
      min_night: randomIntFromInterval(1, 2),
      max_night: randomIntFromInterval(3, 6),
      ratings: (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1),
      num_reviews: randomIntFromInterval(0, 100),
    };

    rooms.max_guest = JSON.stringify(rooms.max_guest);

    id++;

    return room;
}

function write10M(writer, encoding, callback) {

  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i-= 1;
      id += 1;

      const data = JSON.stringify(generateRandomRooms(1))

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
  write();
}

write10M(writeBookings, 'utf-8', () => {
  writeBookings.end();
});


module.exports = {
  rooms,
};
