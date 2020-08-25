/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import css from '../../../public/dist/App.css';

export default class CalendarDayItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const {
      isDayDisabled, checkIn, checkOut, dateContext, day, updateCandidateCheckOut,
    } = this.props;
    const { isHover } = this.state;
    if (!isDayDisabled) {
      this.setState({ isHover: !isHover });
      if (checkIn !== '' && checkOut === '') {
        updateCandidateCheckOut(dateContext.set('date', day).format('MM/DD/YYYY'));
      }
    }
  }

  isSameDateWithCheckIn() {
    const { checkIn, dateContext, day } = this.props;
    if (checkIn === '') {
      return false;
    }

    const d1 = moment(checkIn, 'MM/DD/YYYY').format('MM/DD/YYYY');
    const d2 = dateContext.set('date', day).format('MM/DD/YYYY');

    return d1 === d2;
  }

  isDateBetweenCheckInAndCheckOut() {
    const {
      checkIn, checkOut, dateContext, day,
    } = this.props;
    if (checkIn === '' || checkOut === '') {
      return false;
    }

    const checkInDate = moment(checkIn, 'MM/DD/YYYY').startOf('date');
    const checkOutDate = moment(checkOut, 'MM/DD/YYYY').endOf('date');

    const thisItemDate = dateContext.set('date', day);

    return checkInDate <= thisItemDate && checkOutDate >= thisItemDate;
  }

  isDateBetweenCheckInAndCandidateCheckOut() {
    const {
      checkIn, dateContext, day, candidateCheckOut,
    } = this.props;

    if (checkIn === '' || candidateCheckOut === null) {
      return false;
    }

    const checkInDate = moment(checkIn, 'MM/DD/YYYY').startOf('date');
    const candidateCheckOutDate = moment(candidateCheckOut, 'MM/DD/YYYY').endOf('date');

    const thisItemDate = dateContext.set('date', day);

    return checkInDate <= thisItemDate && candidateCheckOutDate >= thisItemDate;
  }

  render() {
    const {
      day, checkIn, checkOut, clickDate, isDayDisabled,
    } = this.props;
    const { isHover } = this.state;
    return (
      <td
        key={day}
        className={css.days}
        onMouseEnter={this.toggle}
        onMouseLeave={this.toggle}
        onClick={(e) => {
          if (!isDayDisabled) {
            clickDate(e, day);
          }
        }}
        style={
                        {
                          background: (
                            (checkIn === '' && isHover) ? 'rgb(228,231,231)'
                              : (this.isSameDateWithCheckIn() ? 'rgb(25,165,153)' : (((checkOut === '' && isHover) || this.isDateBetweenCheckInAndCandidateCheckOut()) ? 'rgb(180,241,235)' : ((this.isDateBetweenCheckInAndCheckOut() ? 'rgb(25,165,153)' : null))))
                          ),
                        }
                    }
      >
        <span
          className={css.day}
          role="button"
          disabled={isDayDisabled}
          style={
                        { color: this.isSameDateWithCheckIn() || this.isDateBetweenCheckInAndCheckOut() ? 'white' : 'rgb(72,72,72)' }
                    }
        >
          {day}
        </span>
      </td>
    );
  }
}

CalendarDayItem.propTypes = {
  day: PropTypes.number.isRequired,
  isDayDisabled: PropTypes.bool.isRequired,
  checkIn: PropTypes.string.isRequired,
  checkOut: PropTypes.string.isRequired,
  dateContext: PropTypes.objectOf(PropTypes.any).isRequired,
  clickDate: PropTypes.func.isRequired,
  candidateCheckOut: PropTypes.string,
  updateCandidateCheckOut: PropTypes.func,
};

CalendarDayItem.defaultProps = {
  updateCandidateCheckOut: null,
  candidateCheckOut: null,
};
