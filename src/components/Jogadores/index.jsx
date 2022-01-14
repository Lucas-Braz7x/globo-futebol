import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss';

import {
  filterAgeOptions,
  filterPositionOptions,
  titleFilterAge,
  titleFilterPosition
} from '../constants/Filtros';

import { Dropdown } from '../UI/Dropdown';
import { PlayerCard } from '../PlayerCard';
import { Checkbox } from '../UI/Checkbox';
import { Divisor } from '../UI/Divisor';
import Modal from '../UI/Modal';
import { handleOpenModal } from '../../utils';

export const Jogadores = () => {
  const [data, setData] = useState([]);
  const [jogadores, setJogadores] = useState([]);

  const [filterAge, setFilterAge] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [isCheckedGols, setIsCheckedGols] = useState(false);
  const [isCheckedFinals, setIsCheckedFinals] = useState(false);

  const [modalOpened, setModalOpened] = useState(false);
  const [playerId, setPlayerId] = useState();

  useEffect(() => {
    getContent();
    setFilterAge(titleFilterAge);
    setFilterPosition(titleFilterPosition);
  }, [])

  useEffect(() => {
    if (!data) {
      console.log('carregando');
    }
    let filteredData = [];

    if (filterPosition === titleFilterPosition) {
      filteredData = data;
    } else {
      filteredData = data.filter(
        noticia => noticia.posicao === filterPosition
      );
    }

    if (filterAge !== titleFilterAge) {
      const ageFormatted = filterAge.split('-');
      filteredData = filteredData.filter(age => age.idade >= parseInt(ageFormatted[0]) && age.idade <= parseInt(ageFormatted[1]))
    }

    if (isCheckedGols) {
      filteredData = filteredData.filter(gols => gols.gols > 0)
    }
    if (isCheckedFinals) {
      filteredData = filteredData.filter(finals => finals.final === "sim")
    }

    setJogadores(filteredData);

  }, [filterPosition, filterAge, isCheckedGols, isCheckedFinals])

  const getContent = useCallback(async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/server/libertadores-palmeiras-teste-dev.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const players = await response.json();
    await setData(players);
    await setJogadores(players);
  }, [])

  return (
    <div className='container'>
      <div className='filters'>
        <Dropdown
          onFilter={e => setFilterPosition(e)}
          title={titleFilterPosition}
          filter={filterPositionOptions}
        />
        <Dropdown
          onFilter={(e) => setFilterAge(e)}
          title={titleFilterAge}
          filter={filterAgeOptions}
        />
        <div className='filters-check'>
          <Checkbox
            isChecked={() => setIsCheckedGols(!isCheckedGols)}
            content="Somente quem marcou gol" />
          <Checkbox
            isChecked={() => setIsCheckedFinals(!isCheckedFinals)}
            content="Somente quem jogou na final" />
        </div>
      </div>

      <Divisor />

      <div className='card-container'>
        {jogadores.map((player, indice) => (
          <PlayerCard
            key={indice}
            id={indice}
            foto={player.foto}
            nome={player.nome}
            posicao={player.posicao}
            idade={player.idade}
            jogos={player.jogos}
            gols={player.gols}
            handleOpenModal={() => handleOpenModal(indice, setPlayerId, setModalOpened)}
          />
        ))}

      </div>

      <Modal
        id={playerId}
        setPlayerId={setPlayerId}
        data={jogadores}
        open={modalOpened}
        onClose={() => setModalOpened(!modalOpened)}
      />
    </div>
  )
}

