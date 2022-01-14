import React from 'react';
import './styles.scss';
import prop_types from 'prop-types';

export const Button = ({ children }) => {
  return (
    <button>
      {children}
    </button>)
}

Button.propTypes = {
  children: prop_types.element
}
