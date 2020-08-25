import React from 'react';
import PropTypes from 'prop-types';
import css from '../../../public/dist/App.css';

const Cost = (props) => {
  const {
    price,
    selectedNights,
    serviceFee,
    cleaningFee,
    tax,
    totalCost,
  } = props;
  const roomPrice = parseFloat(price);

  return (
    <div className={css.rates}>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td>
              {`$ ${roomPrice} x ${selectedNights}`}
              {(selectedNights === 1) ? ' night' : ' nights'}
            </td>
            <td className={css.prices}>{`$ ${roomPrice * selectedNights}`}</td>
          </tr>
        </tbody>
      </table>
      <div className={css.dividingSection2} />
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td>Cleaning fee</td>
            <td className={css.prices}>{`$ ${serviceFee * selectedNights}`}</td>
          </tr>
        </tbody>
      </table>
      <div className={css.dividingSection1} />
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td>Service fee</td>
            <td className={css.prices}>{`$ ${cleaningFee * selectedNights}`}</td>
          </tr>
        </tbody>
      </table>
      <div className={css.dividingSection1} />
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td>Taxes</td>
            <td className={css.prices}>{`$ ${(tax * selectedNights).toFixed(1)}`}</td>
          </tr>
        </tbody>
      </table>
      <div className={css.dividingSection1} />
      <table style={{ width: '100%' }}>
        <tbody>
          <tr />
          <tr>
            <td style={{ fontWeight: '600', fontSize: '15px' }}>Total</td>
            <td className={css.prices} style={{ fontWeight: '600' }}>{`$ ${totalCost}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Cost.propTypes = {
  price: PropTypes.number,
  cleaningFee: PropTypes.number,
  serviceFee: PropTypes.number,
  tax: PropTypes.number,
  totalCost: PropTypes.number,
  selectedNights: PropTypes.string,
};

Cost.defaultProps = {
  price: 0,
  cleaningFee: 0,
  serviceFee: 0,
  tax: 0,
  totalCost: 0,
  selectedNights: '',
};

export default Cost;
