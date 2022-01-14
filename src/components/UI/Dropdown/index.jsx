import React, { useCallback, useEffect, useRef, useState } from 'react';
import './styles.scss';
import prop_types from 'prop-types';

export const Dropdown = ({ title, filter, onFilter }) => {
  const [dropdownValue, setDropdownValue] = useState(title);
  const dropdownRef = useRef();
  const [active, setActive] = useState(false);

  useEffect(() => {
    onFilter(dropdownValue);
  }, [dropdownValue])

  const handleActive = () => setActive(!active);

  const handleDropdownValue = e => {
    let valor = dropdownValue;
    setDropdownValue(e.target.textContent);
    e.target.textContent = valor;
    handleActive(!active);
  };

  const handleFilters = useCallback(() => {
    return (
      filter.map(currentFilter => (
        <li key={currentFilter} onClick={e => handleDropdownValue(e)}>{currentFilter}</li>
      ))
    )
  })

  return (
    <div onClick={handleActive} className={`menu-dropdown ${active ? "open" : ""}`}>
      <span>{dropdownValue}</span>
      <img src={process.env.PUBLIC_URL + '/Images/seta-baixo.svg'} alt="" />
      <nav
        className={`menu ${active ? "active" : ""}`}
        ref={dropdownRef}
      >
        <ul>
          {handleFilters()}
        </ul>
      </nav>
    </div>
  )
}


Dropdown.propTypes = {
  filter: prop_types.string.isRequired,
  title: prop_types.string.isRequired,
  onFilter: prop_types.func.isRequired
}
