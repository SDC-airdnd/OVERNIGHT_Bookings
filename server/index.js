const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
  auth: {
    user: 'admin',
    password: 'password'
  }
});

couch.listDatabases().then(function(dbs) {
  console.log(dbs);
});

const dbName = 'sdc_database'
const viewUrl = '_design/roombooking/_view/roomBookingData'

const mangoQuery = {
  selector: {
    roomId: {
      $eq:'2663123'}
  }
};

const parameters = {};

const app = express();
const port = 3333;
//app.use(express.static(path.join(__dirname, '../public/dbtest')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {

  couch.mango(dbName, mangoQuery, parameters).then(
    function(data, headers, status) {
      console.log(data.data.docs)
      res.render('index', {
        bookingInfo:data.data.docs
      });
        });
    },
    function(err) {
      res.send(err);
    }
  );

// app.get('*.js', (req, res, next) => {
//   req.url = `${req.url}.gz`;
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

app.get('/room', (req, res) => {
  db.Room.findAll({
    where: {
      id: req.query.id,
    },
  })
    .then((result) => {
      res.send(result[0].dataValues);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get('/booking', (req, res) => {
  db.Booking.findAll({
    where: {
      roomId: req.query.id,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});


// making booking

app.post('/booking', (req, res) => {
  const data = {
    roomId: req.body.roomId,
    email: req.body.email,
    guests: req.body.guests,
    check_in: new Date(req.body.check_in),
    check_out: new Date(req.body.check_out),
    createdAt: new Date(req.body.createdAt),
  };


  db.Booking.create(data)
    .catch((err) => {
      console.log(`err: ${err}`);
      res.sendStatus(500);
    })
    .then(() => {
      console.log('Booking data is saved');
      res.sendStatus(200);
    });
});

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
