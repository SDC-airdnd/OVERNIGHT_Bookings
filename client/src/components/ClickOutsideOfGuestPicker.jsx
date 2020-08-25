import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClickOutsideOfGuestPicker extends Component {
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
    const { clickOutsideOfGuestPicker } = this.props;

    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      clickOutsideOfGuestPicker();
    }
  }

  render() {
    const { children } = this.props;
    return <div ref={this.setWrapperRef}>{children}</div>;
  }
}

ClickOutsideOfGuestPicker.propTypes = {
  children: PropTypes.element.isRequired,
  clickOutsideOfGuestPicker: PropTypes.func.isRequired,
};
