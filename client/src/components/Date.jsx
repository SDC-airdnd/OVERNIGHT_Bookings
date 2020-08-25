/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar.jsx';
import css from '../../../public/dist/App.css';

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarExpanded: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckinOnclick = this.handleCheckinOnclick.bind(this);
    this.handleCheckoutOnclick = this.handleCheckoutOnclick.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
  }

  handleChange(e) {
    return e;
  }

  // handle check-in and out

  handleCheckinOnclick() {
    const { handleCheckinClicked } = this.props;
    this.setState({
      calendarExpanded: true,
    }, handleCheckinClicked());
  }

  handleCheckoutOnclick() {
    const { handleCheckoutClicked } = this.props;
    this.setState({
      calendarExpanded: true,
    }, handleCheckoutClicked());
  }

  closeCalendar() {
    this.setState({
      calendarExpanded: false,
    });
  }

  render() {
    const {
      checkIn,
      checkOut,
      onDayClick,
      bookedDates,
      checkInClicked,
      checkOutClicked,
      calendarInitialize,
      minNight,
      maxNight,
      handleBothUnclicked,
    } = this.props;

    const {
      calendarExpanded,
    } = this.state;

    let checkInClassName = 'check-in';
    if (checkInClicked) {
      checkInClassName += '-clicked';
    }
    let checkOutClassName = 'check-out';
    if (checkOutClicked) {
      checkOutClassName += '-clicked';
    }
    return (
      <div className={css.dates}>
        <div className={css.dateSection}>Dates</div>
        <div className={css.inputs}>
          <div>
            <input className={css[checkInClassName]} id="check-in" type="text" value={checkIn === '' ? 'Check-in' : checkIn} onChange={this.handleChange} onClick={this.handleCheckinOnclick} />
          </div>
          <svg
            className={css.arrow}
            viewBox="0 0 24 24"
            role="presentation"
            aria-hidden="true"
            focusable="false"
            style={{

            }}
          >
            <path d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0 .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0 -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15 6.15h-21.79a.5.5 0 0 0 -.5.5z" fillRule="evenodd" />

          </svg>
          <div>
            <input className={css[checkOutClassName]} id="check-out" type="text" value={(checkOut === '' || checkIn > checkOut) ? 'Checkout' : checkOut} onChange={this.handleChange} onClick={this.handleCheckoutOnclick} />
          </div>
        </div>
        <div className={css.datePicker}>
          {calendarExpanded
            ? (
              <Calendar
                handleCheckinOnclick={this.handleCheckinOnclick}
                handleCheckoutOnclick={this.handleCheckoutOnclick}
                onDayClick={onDayClick}
                bookedDates={bookedDates}
                checkIn={checkIn}
                checkOut={checkOut}
                checkInClicked={checkInClicked}
                checkOutClicked={checkOutClicked}
                closeCalendar={this.closeCalendar}
                calendarInitialize={calendarInitialize}
                minNight={minNight}
                maxNight={maxNight}
                handleBothUnclicked={handleBothUnclicked}
              />
            ) : null}
        </div>
      </div>
    );
  }
}

Date.propTypes = {
  checkIn: PropTypes.string,
  checkOut: PropTypes.string,
  handleCheckinClicked: PropTypes.func,
  handleCheckoutClicked: PropTypes.func,
  onDayClick: PropTypes.func,
  calendarInitialize: PropTypes.func,
  checkInClicked: PropTypes.bool,
  checkOutClicked: PropTypes.bool,
  bookedDates: PropTypes.arrayOf(PropTypes.object),
  minNight: PropTypes.number,
  maxNight: PropTypes.number,
  handleBothUnclicked: PropTypes.func,
};

Date.defaultProps = {
  checkIn: '',
  checkOut: '',
  handleCheckinClicked: () => { },
  handleCheckoutClicked: () => { },
  onDayClick: () => { },
  calendarInitialize: () => { },
  checkInClicked: false,
  checkOutClicked: false,
  bookedDates: [{}],
  minNight: 0,
  maxNight: 0,
  handleBothUnclicked: () => { },
};

export default Date;
