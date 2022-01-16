import React, { useCallback, useEffect, useRef, useState } from 'react';
import './styles.scss';
import prop_types from 'prop-types';
import { titleFilterAge } from '../../../constants/Filtros';

export const Dropdown = ({ title, filter, onFilter }) => {
  const [dropdownValue, setDropdownValue] = useState(title);
  const dropdownRef = useRef();
  const [active, setActive] = useState(false);

  useEffect(() => {
    onFilter(dropdownValue);
  }, [dropdownValue])

  const handleActive = () => {
    setActive(!active);
  };

  const handleDropdownValue = event => {
    const valor = dropdownValue;
    setDropdownValue(event.target.textContent);
    event.target.textContent = valor;
    handleActive(!active);
  };

  const handleFilters = useCallback(() => {
    return (
      filter.map(currentFilter => (
        <li key={currentFilter} onClick={e => handleDropdownValue(e)}>
          {currentFilter} {title === titleFilterAge && 'anos'}
        </li>
      ))
    )
  })

  return (
    <>
      <div onClick={handleActive} className={`menu-dropdown ${active ? "open" : ""}`}>
        <span>{dropdownValue}</span>
        <img src={process.env.PUBLIC_URL + '/Images/icones/seta-baixo.svg'} alt="Ícone seta para baixo" />
        <nav
          className={`menu ${active ? "active" : ""}`}
          ref={dropdownRef}
        >
          <ul>
            {handleFilters()}
          </ul>
        </nav>
      </div>
      <div onClick={handleActive} className={`${active ? "overlay" : ""}`}></div>
    </>
  )
}


Dropdown.propTypes = {
  filter: prop_types.array.isRequired,
  title: prop_types.string.isRequired,
  onFilter: prop_types.func.isRequired
}
