import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

import CONFIG from './Config';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import useCountRooms from '../../../hooks/useCountRooms';

const Main = ({ setMode, setRoom, room, error }) => {
  const { t } = useTranslation();

  const rooms = useCountRooms(room.rooms);

  return (
    <>
      {error && (
        <div className="input__invalid mb-15">
          <AiOutlineExclamationCircle className="mr-5 icon--sm icon--red" />
          {error}
        </div>
      )}
      <div className="modal__list">
        <div className="modal__item">
          <div className="modal__title">Condition</div>
          <Dropdown
            title={t(`condition.${room.condition}`)}
            className="modal__input"
            items={CONFIG.condition.map(el => ({
              title: t(`condition.${el}`),
              click: () => {
                setRoom(p => ({
                  ...p,
                  condition: el
                }));
              },
              active: room.condition === el
            }))} />
        </div>
        <div className="modal__item">
          <div className="modal__title">Number of rooms</div>
          <input 
            className="modal__input" 
            placeholder="Rooms"
            type="number"
            readOnly
            value={room.numberOfRooms} /> 
        </div>
        <div className="modal__item">
          <div className="modal__title">Price</div>
          <input
            type="number"
            placeholder="Price in $ per month"
            className="modal__input"
            value={room.price}
            onChange={(e) => 
              setRoom(p => ({
                ...p,
                price: e.target.value
              }))
            } />
        </div>
        <div className="modal__item" tabIndex="0">
          <div className="modal__title">Rooms</div>
          <div className="modal__input" onClick={() => setMode('rooms')}>
            <span className="modal__text">
              {rooms || 'Select rooms'}
            </span>
          </div>
        </div>
        <div className="modal__item" tabIndex="0">
          <div className="modal__input" onClick={() => setMode('facilities')}>
            Facilities
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Main);