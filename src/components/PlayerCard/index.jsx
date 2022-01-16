import React from 'react';
import './styles.scss';
import prop_types from 'prop-types';
import { Grafico } from '../Grafico';

export const PlayerCard = ({ id, foto, nome, posicao, idade, jogos, gols, handleOpenModal }) => {

  return (
    <div className="card">
      <div className='card-image'>
        <img
          src={process.env.PUBLIC_URL + `Images/jogadores/${foto}`}
          alt={`Imagem do ${nome} jogador do palmeiras`}
        />
      </div>

      <div>
        <div className="card-name">
          <p>{nome}</p>
        </div>

        <span>{posicao} | {idade} anos</span>
        <Grafico
          jogos={jogos}
          gols={gols}
        />
        <div onClick={() => handleOpenModal(id)} className="saiba-mais"></div>
      </div>
    </div>
  )
}

PlayerCard.propTypes = {
  id: prop_types.number.isRequired,
  foto: prop_types.string.isRequired,
  nome: prop_types.string.isRequired,
  posicao: prop_types.string.isRequired,
  idade: prop_types.number.isRequired,
  jogos: prop_types.number.isRequired,
  gols: prop_types.number.isRequired,
  handleOpenModal: prop_types.func.isRequired,
}
