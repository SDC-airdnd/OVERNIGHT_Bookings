import React from 'react';
import PropTypes from 'prop-types';
import css from '../../../public/dist/App.css';

const MonthNav = ({ month }) => (
  <span className={css['label-month']}>
    {month()}
  </span>
);

MonthNav.propTypes = { month: PropTypes.func.isRequired };

export default MonthNav;
