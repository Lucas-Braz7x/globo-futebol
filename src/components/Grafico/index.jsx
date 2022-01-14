import React from 'react';
import prop_types from 'prop-types';
import './styles.scss';

export const Grafico = ({ jogos, gols, modal }) => {

  let bar = 100;
  const graficos = (bar, jogos) => {
    return jogos >= 10 ? bar : (jogos * bar) / 10
  }

  return (
    <div className={`grafico ${modal ? 'modal-open' : ' '}`}>
      <div className="info">
        <span>Jogos</span>
        <span>Gols</span>
      </div>
      <div className={"bar"}>
        <div className="bars">
          <span
            className="bar-jogos"
            style={!modal ? { width: graficos(bar, jogos) } : { height: graficos(bar, jogos) }}></span>
          <span>{jogos}</span>
        </div>

        <div className="bars">
          <span
            className="bar-gols"
            style={!modal ? { width: graficos(bar, gols) } : { height: graficos(bar, gols) }}></span>
          <span>{gols}</span>
        </div>
      </div>
    </div>
  )
}

Grafico.propTypes = {
  modal: prop_types.bool,
  jogos: prop_types.number,
  gols: prop_types.number
}

