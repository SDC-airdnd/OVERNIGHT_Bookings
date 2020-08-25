/* eslint-disable import/extensions */
/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import PropTypes from 'prop-types';
import GuestPicker from './GuestPicker.jsx';
import css from '../../../public/dist/App.css';

const Guest = (props) => {
  const {
    message,
    guestExpand,
    guestSelected,
    guestExpandToggle,
    guest,
    adults,
    numChildren,
    infants,
    clickOutsideOfGuestPicker,
    increaseGuest,
    decreaseGuest,
    updateTotalNights,
    guestButtonMessage,
  } = props;
  return (
    <div className={css.guest}>
      <div className={css.guestSection}>Guests</div>
      <div className={css.guestSection1}>
        <button
          className={guestExpand
            ? css.guestButton : css.guestButton0}
          type="button"
          expand={guestSelected.toString()}
          onClick={guestExpandToggle}
        >
          <div className={css.guestButton1}>
            <div className={css.message}>
              {message}
              <div className={css.goDown}>
                {guestExpand
                  ? (
                    <svg
                      viewBox="0 0 18 18"
                      role="presentation"
                      aria-hidden="true"
                      focusable="false"
                      style={{
                        height: '16px', width: '16px', display: 'block', fill: 'currentcolor',
                      }}
                    >
                      <path
                        d="m1.71 13.71a1 1 0 1 1 -1.42-1.42l8-8a1 1 0 0 1 1.41 0l8 8a1 1 0 1 1 -1.41 1.42l-7.29-7.29z"
                        fillRule="evenodd"
                      />

                    </svg>
                  )
                  : (
                    <svg
                      viewBox="0 0 18 18"
                      role="presentation"
                      aria-hidden="true"
                      focusable="false"
                      style={{
                        height: '16px', width: '16px', display: 'block', fill: 'currentcolor',
                      }}
                    >
                      <path
                        d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z"
                        fillRule="evenodd"
                      />
                    </svg>
                  )}
              </div>
            </div>
          </div>

        </button>
      </div>
      <div className={css.guestPicker}>
        {guestExpand
          ? (
            <GuestPicker
              adults={adults}
              numChildren={numChildren}
              infants={infants}
              guest={guest}
              increaseGuest={increaseGuest}
              decreaseGuest={decreaseGuest}
              guestButtonMessage={guestButtonMessage}
              guestExpandToggle={guestExpandToggle}
              updateTotalNights={updateTotalNights}
              clickOutsideOfGuestPicker={clickOutsideOfGuestPicker}
            />
          ) : null}
      </div>
    </div>
  );
};

Guest.propTypes = {
  message: PropTypes.string,
  guest: PropTypes.string,
  adults: PropTypes.number,
  numChildren: PropTypes.number,
  infants: PropTypes.number,
  clickOutsideOfGuestPicker: PropTypes.func,
  increaseGuest: PropTypes.func,
  decreaseGuest: PropTypes.func,
  guestExpandToggle: PropTypes.func,
  guestExpand: PropTypes.bool,
  guestSelected: PropTypes.bool,
  updateTotalNights: PropTypes.func,
  guestButtonMessage: PropTypes.func,
};

Guest.defaultProps = {
  message: '1 adult',
  guest: '"{}"',
  adults: 0,
  numChildren: 0,
  infants: 0,
  clickOutsideOfGuestPicker: () => { },
  increaseGuest: () => { },
  decreaseGuest: () => { },
  guestExpandToggle: () => { },
  guestExpand: false,
  guestSelected: false,
  updateTotalNights: () => { },
  guestButtonMessage: () => { },
};
export default Guest;
