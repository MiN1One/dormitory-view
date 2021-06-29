import React from 'react';
import { useTranslation } from 'react-i18next';

import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const CONFIG = {
  condition: ['good', 'medium', 'poor'],
  kitchen: ['private', 'public'],
  bath: ['private', 'public']
};

const Main = ({ setFacilities, setRoom, room }) => {
  const { t } = useTranslation();

  return (
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
          className="modal__input " 
          placeholder="Rooms"
          type="number"
          value={room.numberOfRooms}
          onChange={(e) => 
            setRoom(p => ({
              ...p,
              numberOfRooms: e.target.value
            }))
          } /> 
      </div>
      <div className="modal__item">
        <div className="modal__title">Rooms</div>
        <input 
          className="modal__input" 
          placeholder="e.g. kitchen, bedroom, balcony"
          type="text" />
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
      <div className="modal__item">
        <div className="modal__title">Facilities</div>
        <div className="modal__input" onClick={setFacilities}>
          All
        </div>
      </div>
    </div>
  );
};

export default React.memo(Main);