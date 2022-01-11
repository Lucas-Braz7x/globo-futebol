import React from 'react';
import '../../sass/global-styles.scss';
import './styles.scss';
export const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className='header-title'>
            <h1><span>O Elenco do</span> campeão</h1>
          </div>
          <p className='header-subTitle'>
            <span>Conheça os jogadores do Palmeiras,</span> vencedor da libertadores 2021</p>
        </div>
        <div className='header-content'>
          <span>Publicado em 03.08.2021 • Atualizado em 04.08.2021</span>
          <p>
            Na conquista do tricampeonato da Libertadores pelo Palmeiras,
            candidatos a herói do título não faltaram.
            O carioca Deyverson de 30 anos saiu do banco na prorrogação
            para marcar o gol da vitória por 2 a 1 sobre o Flamengo e
            ser eleito o melhor do jogo. Com defesas importantes,
            Weverton também pode ser considerado um dos protagonistas do confronto.
          </p>
        </div>
      </header>
    </>
  )
}
