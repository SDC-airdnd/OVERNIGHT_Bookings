/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import ClickOutsideOfGuestPicker from './ClickOutsideOfGuestPicker.jsx';
import css from '../../../public/dist/App.css';

const GuestPicker = (props) => {
  const {
    guest,
    adults,
    numChildren,
    infants,
    clickOutsideOfGuestPicker,
    increaseGuest,
    decreaseGuest,
    guestExpandToggle,
  } = props;

  const convGuest = (str) => {
    str = str.slice(0, 1) + '"' + str.slice(1);
    str = str.slice(0, 8) + '"' + str.slice(8);
    str = str.slice(0, 12) + '"' + str.slice(12);
    str = str.slice(0, 21) + '"' + str.slice(21);
    str = str.slice(0, 25) + '"' + str.slice(25);
    str = str.slice(0, 33) + '"' + str.slice(33);
    return str;
  };

  const maxGuests = JSON.parse(convGuest(guest));

  console.log(typeof maxGuests, maxGuests);

  return (
    <ClickOutsideOfGuestPicker
      clickOutsideOfGuestPicker={clickOutsideOfGuestPicker}
    >
      <div className={css.picker}>
        <div>
          <div className={css.guestType}>
            Adults
            <div className={css.buttonSection}>
              <button
                type='submit'
                className={css.adults}
                id='adults'
                disabled={adults === 1}
                onClick={decreaseGuest}
              >
                -{' '}
              </button>
              <div className={css.countAdults}>{adults}</div>
              <button
                type='submit'
                className={css.adults}
                id='adults'
                disabled={adults === maxGuests.adults}
                onClick={increaseGuest}
              >
                {' '}
                +{' '}
              </button>
            </div>
          </div>
          <div />
          <br />
          <br />
          <div className={css.guestType}>
            Children
            <div className={css.buttonSection}>
              <button
                type='submit'
                className={css.children}
                id='children'
                disabled={numChildren === 0}
                onClick={decreaseGuest}
              >
                -
              </button>
              <div className={css.count}>{numChildren}</div>
              <button
                type='submit'
                className={css.children}
                id='children'
                disabled={numChildren === maxGuests.children}
                onClick={increaseGuest}
              >
                +
              </button>
            </div>
          </div>
          <div className={css.guestTypeInfo}>Ages 2-12</div>
          <br />
          <div className={css.guestType}>
            Infants
            <div className={css.buttonSection}>
              <button
                type='submit'
                className={css.infants}
                id='infants'
                disabled={infants === 0}
                onClick={decreaseGuest}
              >
                -
              </button>
              <div className={css.count}>{infants}</div>
              <button
                type='submit'
                className={css.infants}
                id='infants'
                disabled={infants === maxGuests.infants}
                onClick={increaseGuest}
              >
                +
              </button>
            </div>
          </div>
          <div className={css.guestTypeInfo}>Under 2</div>
        </div>
        <br />
        <div>
          {`${maxGuests.adults} guest maximum. `}
          {`${maxGuests.children} children and ${maxGuests.infants} infants are allowed in this room.`}
        </div>
        <button type='submit' className={css.close} onClick={guestExpandToggle}>
          Close
        </button>
      </div>
    </ClickOutsideOfGuestPicker>
  );
};

GuestPicker.propTypes = {
  guest: PropTypes.string,
  adults: PropTypes.number,
  numChildren: PropTypes.number,
  infants: PropTypes.number,
  clickOutsideOfGuestPicker: PropTypes.func,
  increaseGuest: PropTypes.func,
  decreaseGuest: PropTypes.func,
  guestExpandToggle: PropTypes.func,
};

GuestPicker.defaultProps = {
  guest: '',
  adults: 0,
  numChildren: 0,
  infants: 0,
  clickOutsideOfGuestPicker: () => {},
  increaseGuest: () => {},
  decreaseGuest: () => {},
  guestExpandToggle: () => {},
};

export default GuestPicker;
