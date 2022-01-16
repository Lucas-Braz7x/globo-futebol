import React from 'react';
import './styles.scss';
import prop_types from 'prop-types';

export const Checkbox = ({ content, isChecked }) => {
  return (
    <label className="checkbox-container" htmlFor="">
      <input type="checkbox" onClick={isChecked} />
      <span>{content}</span>
    </label>
  )
}

Checkbox.propTypes = {
  isChecked: prop_types.func.isRequired,
  content: prop_types.string.isRequired,
}
