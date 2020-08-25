import React from 'react';
import PropTypes from 'prop-types';
import css from '../../../public/dist/App.css';

export default class BookingSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    const { email } = this.state;
    const { roomId, makeBooking } = this.props;
    e.preventDefault();
    if (email === '') {
      alert('Please enter a valid email.');
    } else {
      makeBooking(roomId, email);
    }
  }

  handleChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  render() {
    const { email } = this.state;
    const {
      roomname,
      message,
      checkIn,
      checkOut,
      serviceFee,
      tax,
      cleaningFee,
      totalCost,
      price,
      selectedNights,
      closeBookingPopup,
      ratings,
      reviews,
    } = this.props;

    const roomPrice = parseFloat(price);
    const divStyle = {
      height: '16px', width: '16px', display: 'block', fill: 'rgb(118, 118, 118)',
    };
    const rating = parseFloat(ratings);
    const starsWidth = rating * 10;
    return (
      <div className={css.popup}>
        <div className={css.popup_inner}>
          <button type="submit" className={css.xbutton} onClick={closeBookingPopup}>
            <svg viewBox="0 0 24 24" role="img" aria-label="Close" focusable="false" style={divStyle}>
              <path
                d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <form onSubmit={this.handleClick}>
            <label htmlFor="email" className={css.email}>
            Email:
              <input style={{ width: '70%', height: '15px' }} type="text" name="email" value={email} onChange={this.handleChange} />
            </label>
          </form>
          <div className={css.dividingSection} />
          <div className={css.summary}>
            {roomname}
            <div className={css.secondLine}>
              <div className={css.ratings}>
                <span className={css.outerStar}>
                  <span className={css.innerStar} style={{ width: `${starsWidth}px` }} />
                </span>
                {' '}
              </div>
              {' '}
              <div className={css.reviews}>{reviews}</div>
            </div>
            <div className={css.dividingSection} />
            <div>
              <div className={css.guestSummary}>
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    height: '20px', width: '20px', display: 'block', fill: 'currentcolor', float: 'left', paddingRight: '10px',
                  }}
                >
                  <path d="m3.31 11.56c-.66.5-1.1.99-1.47 1.66-1.14 2.08-1.46 6.82-.2 8.52 1.3 1.75 2.69 2.15 6.54 2.15 2.81 0 4.7-1 5.17-3.43.16-.84.14-1.55-.01-2.59-.01-.1-.03-.19-.06-.37-.12-.8-.16-1.18-.16-1.66.01-1.55.73-2.28 2.62-3.24.56-.28.9-.85.9-1.48 0-.47-.2-.84-.54-1.21-.2-.21-.35-.44-.48-.69-.31-.62-.4-1.19-.39-1.98 0-.06 0-.06 0-.12 0-1.65.81-2.65 2.16-2.65s2.16 1 2.16 2.65c0 1.04-.23 1.97-.99 2.79-.34.37-.54.74-.54 1.21 0 .62.35 1.19.9 1.48 1.87.95 2.6 1.69 2.63 3.25.01.4.02.77.05 1.37.11 2.45.06 3.22-.34 3.9-.47.81-1.6 1.24-3.89 1.26-1.19.01-1.64-.02-2.36-.18-.4-.09-.81.16-.9.56s.16.81.56.9c.86.2 1.41.24 2.71.22 2.76-.03 4.37-.64 5.17-2.01.61-1.04.67-1.93.54-4.73-.03-.59-.04-.94-.05-1.33-.05-2.27-1.14-3.38-3.45-4.56-.05-.03-.08-.08-.08-.13 0-.02.03-.08.14-.2.61-.66 1-1.43 1.2-2.27.14-.56.18-1.03.18-1.54 0-2.42-1.41-4.15-3.66-4.15s-3.66 1.73-3.66 4.15v.11c-.01 1.01.1 1.79.55 2.67.19.37.42.71.72 1.03.11.12.14.18.14.2 0 .06-.03.11-.08.13-2.34 1.19-3.43 2.29-3.44 4.57 0 .58.04 1.03.18 1.9.03.18.04.26.05.36.13.89.15 1.45.02 2.09-.3 1.56-1.51 2.21-3.69 2.21-3.42 0-4.4-.28-5.34-1.55-.86-1.16-.58-5.29.31-6.91.26-.48.57-.81 1.07-1.2.29-.22 1.9-1.3 2.42-1.67.45-.32.71-.84.71-1.39v-.15c0-.52-.25-1-.65-1.34-.69-.57-1.17-2.03-1.17-3.48 0-1.93 1.11-3.13 2.65-3.13s2.65 1.2 2.65 3.13c0 1.46-.46 2.91-1.14 3.48-.42.34-.65.84-.65 1.4 0 .64.35 1.23.92 1.52.41.21.57.29.79.41.37.19.82.05 1.01-.31.19-.37.05-.82-.31-1.01-.23-.12-.4-.21-.81-.42-.06-.03-.11-.1-.11-.18 0-.12.03-.19.11-.25 1.1-.91 1.69-2.77 1.69-4.64 0-2.73-1.75-4.63-4.15-4.63s-4.15 1.9-4.15 4.63c0 1.85.61 3.72 1.71 4.64.07.06.11.13.11.19v.15c0 .06-.03.12-.09.16-.49.35-2.12 1.44-2.46 1.7z" fillRule="evenodd" />

                </svg>
                <div>{message}</div>
              </div>
              <br />
              <div className={css.dateSummary}>
                <svg
                  className={css.dateSummary1}
                  viewBox="0 0 24 24"
                  role="presentation"
                  aria-hidden="true"
                  focusable="false"
                  style={{
                    height: '20px', width: '20px', display: 'block', fill: 'currentcolor', float: 'left', paddingRight: '10px',
                  }}
                >
                  <path className={css.dateSummary1} d="m22 9.5v-1.5-5h-4.75v-2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h-7.5v-2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h-4.75v5 1.5 12.51c0 .54.44.99.99.99h18.02c.54 0 .99-.44.99-.99zm-18.5-5h3.25v.5c0 .41.34.75.75.75s.75-.34.75-.75v-.5h7.5v.5c0 .41.34.75.75.75s.75-.34.75-.75v-.5h3.25v3.5h-17zm0 17v-12h17v12z" fillRule="evenodd" />

                </svg>
                <div className={css.dateSummary1}>{checkIn}</div>

                <svg
                  className={css.dateSummary1}
                  viewBox="0 0 24 24"
                  role="presentation"
                  aria-hidden="true"
                  focusable="false"
                  style={{
                    height: '15px', width: '15px', display: 'block', fill: 'currentcolor',
                  }}
                >
                  <path className={css.dateSummary1} d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0 .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0 -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15 6.15h-21.79a.5.5 0 0 0 -.5.5z" fillRule="evenodd" />
                </svg>
                <div className={css.dateSummary1}>{checkOut}</div>
              </div>
            </div>
          </div>
          <br />
          <div className={css.dividingSection} />
          <div className={css.costSummary}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td>{`$ ${roomPrice} x ${selectedNights} nights`}</td>
                  <td className={css.prices}>{`$ ${roomPrice * selectedNights}`}</td>
                </tr>
                <tr>
                  <td>Cleaning fee</td>
                  <td className={css.prices}>{`$ ${serviceFee * selectedNights}`}</td>
                </tr>
                <tr>
                  <td>Service fee</td>
                  <td className={css.prices}>{`$ ${cleaningFee * selectedNights}`}</td>
                </tr>
                <tr>
                  <td>Taxes</td>
                  <td className={css.prices}>{`$ ${(tax * selectedNights).toFixed(1)}`}</td>
                </tr>
                <tr />
                <tr>
                  <td style={{ fontWeight: '600', fontSize: '15px' }}>Total (USD)</td>
                  <td className={css.prices} style={{ fontWeight: '600' }}>{`$ ${totalCost}`}</td>
                </tr>
              </tbody>
            </table>
            <div className={css.dividingSection} />
          </div>
          <button className={css.book} type="submit" onClick={this.handleClick}>Sign Up</button>
        </div>
      </div>
    );
  }
}

BookingSummary.propTypes = {
  roomId: PropTypes.number,
  makeBooking: PropTypes.func,
  message: PropTypes.string,
  roomname: PropTypes.string,
  checkIn: PropTypes.string,
  checkOut: PropTypes.string,
  serviceFee: PropTypes.number,
  tax: PropTypes.number,
  cleaningFee: PropTypes.number,
  totalCost: PropTypes.number,
  price: PropTypes.number,
  selectedNights: PropTypes.string,
  closeBookingPopup: PropTypes.func,
  ratings: PropTypes.string,
  reviews: PropTypes.number,
};

BookingSummary.defaultProps = {
  roomId: 1,
  makeBooking: () => { },
  message: '1 adult',
  roomname: '',
  checkIn: '',
  checkOut: '',
  serviceFee: 0,
  tax: 0,
  cleaningFee: 0,
  totalCost: 0,
  price: 0,
  selectedNights: '',
  closeBookingPopup: () => { },
  ratings: '',
  reviews: 0,
};
