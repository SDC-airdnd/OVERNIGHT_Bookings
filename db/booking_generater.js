const faker = require('faker');
const moment = require('moment');
const db = require('./index.js');

const bookings = [];
const bookingsByRoom = {};

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function isNotOverlapWithOtherBookingDates(roomId, startDate, endDate) {
  const bookingsOnRoom = bookingsByRoom[`${roomId}`];
  if (bookingsOnRoom === undefined) {
    return true;
  }

  // Iterate all current bookings on room and then check new start and end date overlapping or not
  for (let i = 0; i < bookingsOnRoom.length; i += 1) {
    const booking = bookingsOnRoom[i];

    // Not overlapping condition
    // newCheckIn -- newCheckout  << booking.checkIn
    // (new checkin and checkout time both should be earlier than current booking's checkin)
    // booking.checkOut << newCheckIn -- newCheckOut
    // (new checkin and checkout time both should be later than current booking's checkout)

    // Below condition is checking it is overlapped -> then return false
    if (!((moment(startDate) < moment(booking.check_in)
      && moment(endDate) <= moment(booking.check_in))
      || (moment(startDate) >= moment(booking.check_out)
        && moment(endDate) > moment(booking.check_out)))) {
      return false;
    }
  }
  return true;
}

function randomCheckInOutOnRoom(roomList, roomId) {
  const room = roomList[`${roomId}`];
  let startDate = moment(randomDate(moment().toDate(), moment().add(2, 'months').toDate())).startOf('day').toDate();
  let endDate = moment(startDate).add(randomIntFromInterval(room.min_night, room.max_night), 'days').startOf('day').toDate();
  let trial = 0;

  while (!isNotOverlapWithOtherBookingDates(roomId, startDate, endDate)) {
    trial += 1;
    if (trial > 1) {
      return null;
    }
    startDate = moment(randomDate(moment().toDate(), moment().add(2, 'months').toDate())).startOf('day').toDate();
    endDate = moment(startDate).add(randomIntFromInterval(room.min_night, room.max_night), 'days').startOf('day').toDate();
  }

  return {
    check_in: startDate,
    check_out: endDate,
  };
}

// Random Bookings
function generateRandomBooking(roomList) {
  const roomId = randomIntFromInterval(0, roomList.length - 1);
  const room = roomList[roomId];

  const randomCheckInOutDates = randomCheckInOutOnRoom(roomList, roomId);

  if (randomCheckInOutDates === null) {
    return null;
  }

  const booking = {
    roomId,
    email: faker.internet.email(),
    guests: {
      adults: randomIntFromInterval(1, JSON.parse(room.max_guest).adults),
      children: randomIntFromInterval(0, JSON.parse(room.max_guest).children),
      infants: randomIntFromInterval(0, JSON.parse(room.max_guest).infants),
    },
    check_in: randomCheckInOutDates.check_in,
    check_out: randomCheckInOutDates.check_out,
    createdAt: moment(randomCheckInOutDates.check_in).subtract(randomIntFromInterval(0, 30), 'days').toDate(),
  };
  return booking;
}

function generateRandomBookings(num, roomList) {
  let book;
  for (let i = 0; i < num; i += 1) {
    book = generateRandomBooking(roomList);
    // console.log(book);
    if (book !== null) {
      bookings.push(book);
      if (bookingsByRoom[`${book.roomId}`] === undefined) {
        bookingsByRoom[`${book.roomId}`] = [];
      }
      bookingsByRoom[`${book.roomId}`].push(book);
    }
  }
}

function createBookingData(num) {
  db.Room.findAll().then((rooms) => {
    generateRandomBookings(num, rooms);

    for (let i = 0; i < bookings.length; i += 1) {
      bookings[i].guests = JSON.stringify(bookings[i].guests);
      bookings[i].roomId += 1;
    }

    bookings.forEach((data) => {
      db.Booking.create(data)
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('success for booking');
        })
        .catch((err) => {
          throw err;
        });
    });
  });
}

createBookingData(50);
