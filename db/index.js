const Sequelize = require('sequelize');
const { internet } = require('faker');

// const sequelize = new Sequelize('sdc_database', 'admin', 'postpass', {
//   host: 'ec2-13-57-28-77.us-west-1.compute.amazonaws.com',
//   dialect: 'postgres',

// });

//LOCALHOST
const sequelize = new Sequelize('sdc_database', 'michaeldoty', 'password', {
  host: 'localhost',
  dialect: 'postgres',

});


const Room = sequelize.define('rooms', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  roomname: Sequelize.STRING,
  price: Sequelize.INTEGER,
  cleaning_fee: Sequelize.INTEGER,
  service_fee: Sequelize.INTEGER,
  tax: Sequelize.INTEGER,
  max_guest: Sequelize.STRING,
  min_night: Sequelize.INTEGER,
  max_night: Sequelize.INTEGER,
  ratings: Sequelize.DECIMAL(2, 1),
  num_reviews: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

const Booking = sequelize.define('bookings', {
  roomId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rooms',
      key: 'id',
    },
  },
  email: Sequelize.STRING,
  guests: Sequelize.STRING,
  check_in: Sequelize.DATE,
  check_out: Sequelize.DATE,
  createdAt: Sequelize.DATE,
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  updatedAt: Sequelize.DATE,
});

Room.hasMany(Booking, { foreignKey: 'roomId' });
Booking.belongsTo(Room, { foreignKey: 'roomId' });

sequelize.authenticate();

Room.sync();
Booking.sync();

module.exports = {
  Room,
  Booking,
};
