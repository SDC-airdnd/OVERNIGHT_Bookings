import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class ClickOutsideOfCalendar extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    const { closeCalendar, handleBothUnclicked } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      closeCalendar();
      handleBothUnclicked();
    }
  }

  render() {
    const { children } = this.props;
    return <div ref={this.setWrapperRef}>{children}</div>;
  }
}

ClickOutsideOfCalendar.propTypes = {
  children: PropTypes.element.isRequired,
  closeCalendar: PropTypes.func.isRequired,
  handleBothUnclicked: PropTypes.func.isRequired,
};
