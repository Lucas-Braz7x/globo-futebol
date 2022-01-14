import React, { useEffect, useState } from "react";
import './styles.scss';
import prop_types from 'prop-types';
import { PortalModal } from './Portal';
import { ReactComponent as ArrowLeft } from '../../../assets/icones/seta-esquerda.svg';
import { ReactComponent as ArrowRight } from '../../../assets/icones/seta-direita.svg';
import { Grafico } from '../../Grafico';
import { Button } from '../Button';

const Modal = ({ setPlayerId, id, data, open, onClose }) => {
  const [grafico, setGrafico] = useState(window.screen.width);

  useEffect(() => {
    window.addEventListener('resize', () => setGrafico(window.screen.width))
    return window.removeEventListener('resize', () => setGrafico(window.screen.width));
  }, [window])

  useEffect(() => {
    const onEsc = (event) => {
      if (event.keyCode === 27) onClose();
    }
    window.addEventListener('keydown', onEsc);
    return () => {
      window.removeEventListener('keydown', onEsc);
    }
  }, [onClose]);


  const cardModal = document.querySelector('.card-modal');
  const handleNextPlayer = (id) => {
    id === (data.length - 1) ? setPlayerId(0) : setPlayerId((s) => s + 1);
  }
  const handlePreviousPlayer = (id, element) => {
    console.log(element)
    id === 0 ? setPlayerId(data.length - 1) : setPlayerId((s) => s - 1);
  }

  if (!open) return null;

  const onOverlayClick = () => {
    onClose();
  }

  const onDialogClick = (event) => {
    event.stopPropagation();
  }

  return (
    <PortalModal>
      <div className='modal' onClick={onOverlayClick}>
        <div onClick={onDialogClick}>
          <div className={`card-modal`}>
            <div onClick={() => onClose()} className='icon-close'></div>
            <div>
              <div className='card-modal-image'>
                <img
                  src={process.env.PUBLIC_URL + `Images/jogadores/${data[id].foto}`}
                  alt={`Imagem do ${data[id].nome} jogador do palmeiras`}
                />
              </div>
              <div className='card-modal-position'>
                <span>{data[id].posicao}</span>
                {window.screen.width < 650 && <span><pre>|</pre></span>}
                <span> {data[id].idade}anos</span>
              </div>
              <div className='grafico-component'>
                <Grafico
                  modal={grafico <= 650 ? false : true}
                  jogos={data[id].jogos}
                  gols={data[id].gols}
                />
              </div>
            </div>

            <div>
              <h2>{data[id].nome}</h2>
              <div className='card-modal-text'>
                <p className='row'>
                  {data[id].texto}
                  {data[id].texto}
                  {data[id].texto}
                </p>
              </div>
            </div>

            <div className='buttons'>
              <Button>
                <div
                  className='button-content previous'
                  onClick={() => { handlePreviousPlayer(id, cardModal) }}
                >
                  <ArrowLeft
                    className='arrow-left'
                  />
                  <span id='anterior'>
                    Anterior
                  </span>
                </div>
              </Button>
              <Button>
                <div
                  className="button-content next"
                  onClick={() => { handleNextPlayer(id) }}
                >
                  <span id='button-next'>
                    Próximo
                  </span>
                  <ArrowRight
                    className='arrow-right'
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PortalModal>
  );
}

Modal.propTypes = {
  setPlayerId: prop_types.func,
  id: prop_types.number,
  data: prop_types.array,
  open: prop_types.bool,
  onClose: prop_types.func,
}

export default Modal;
