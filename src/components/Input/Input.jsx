import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = props => {
  return (
    <input
      type={props.type}
      onChange={props.onChange ? props.onChange() : null}
      placeholder={props.placeholder ? props.placeholder : ""}
      children={props.children}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Input;
