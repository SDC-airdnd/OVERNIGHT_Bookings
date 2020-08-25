/* eslint-disable import/extensions */
import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import Info from './components/Info.jsx';
import Form from './components/Form.jsx';
import css from '../../public/dist/App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 1,
      roomInfo: {
        roomname: '',
        price: 0,
        cleaningFee: 0,
        serviceFee: 0,
        tax: 0,
        maxGuest: '',
        minNight: 0,
        maxNight: 0,
        ratings: '',
        numReviews: 0,
      },
      bookedDates: [],
      rendering: true,
    };

    this.getRoomData = this.getRoomData.bind(this);
    this.getBookingData = this.getBookingData.bind(this);
    this.updateRoomState = this.updateRoomState.bind(this);
    this.updateBookedDates = this.updateBookedDates.bind(this);
    this.handleRendering = this.handleRendering.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  getRoomData() {
    const link = window.location.href.match(/id\s*=\s*(.*)/);
    if (link) {
      $.ajax({
        url: `/room?id=${link[1]}`,
        type: 'GET',
        error: (err) => {
          console.log(err);
        },
        success: (result) => {
          this.updateRoomState(result);
        },
      });
    } else {
      $.ajax({
        url: '/room?id=1',
        type: 'GET',
        error: (err) => {
          console.log(err);
        },
        success: (result) => {
          this.updateRoomState(result);
        },
      });
    }
  }

  getBookingData() {
    const link = window.location.href.match(/id\s*=\s*(.*)/);
    if (link) {
      $.ajax({
        url: `/booking?id=${link[1]}`,
        type: 'GET',
        error: (err) => {
          console.log(err);
        },
        success: (result) => {
          this.updateBookedDates(result);
        },
      });
    } else {
      $.ajax({
        url: '/booking?id=1',
        type: 'GET',
        error: (err) => {
          console.log(err);
        },
        success: (result) => {
          this.updateBookedDates(result);
        },
      });
    }
  }

  initialize() {
    this.getRoomData();
    this.getBookingData();
  }

  handleRendering() {
    this.setState({
      rendering: false,
    });
  }

  updateBookedDates(results) {
    const bookedDate = [];
    results.forEach((data) => {
      const nights = moment(data.check_out).diff(data.check_in, 'd');
      for (let i = 0; i < nights; i += 1) {
        bookedDate.push(moment(data.check_in, 'YYYY-MM-DD').add(i, 'd'));
      }
    });
    this.setState({
      bookedDates: bookedDate,
    });
  }

  updateRoomState(result) {
    this.setState({
      roomInfo: {
        roomname: result.roomname,
        price: result.price,
        cleaningFee: result.cleaning_fee,
        serviceFee: result.service_fee,
        tax: result.tax,
        maxGuest: result.max_guest,
        minNight: result.min_night,
        maxNight: result.max_night,
        ratings: result.ratings,
        numReviews: result.num_reviews,
      },
    });
  }


  render() {
    const {
      roomId, roomInfo, bookedDates, rendering,
    } = this.state;
    const divStyle = {
      height: '16px', width: '16px', display: 'block', fill: 'rgb(118, 118, 118)',
    };
    const app = (
      <div className={css.app}>
        <button type="submit" className={css.xbutton} onClick={this.handleRendering}>
          <svg viewBox="0 0 24 24" role="img" aria-label="Close" focusable="false" style={divStyle}>
            <path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fillRule="evenodd" />
          </svg>
        </button>
        <div>
          <Info
            price={roomInfo.price}
            reviews={roomInfo.numReviews}
            ratings={roomInfo.ratings}
          />
        </div>
        <div className={css.dividingSection} />
        <div>
          <Form
            guest={roomInfo.maxGuest}
            price={roomInfo.price}
            cleaningFee={roomInfo.cleaningFee}
            serviceFee={roomInfo.serviceFee}
            tax={roomInfo.tax}
            minNight={roomInfo.minNight}
            maxNight={roomInfo.maxNight}
            bookedDates={bookedDates}
            roomId={roomId}
            roomname={roomInfo.roomname}
            reviews={roomInfo.numReviews}
            ratings={roomInfo.ratings}
          />
        </div>

        <div className={css.notYet}>You won’t be charged yet</div>
        <div className={css.dividingSection} />
        <div className={css.image}>
          <div className={css.lower}>New lower price</div>
          <div className={css.lowerPrice}>Price for your trip dates was just lowered by $71.</div>
        </div>
      </div>
    );

    return (
      <div style={{ float: 'right', display: 'stikcy' }}>
        {rendering ? app : null}
      </div>
    );
  }
}
