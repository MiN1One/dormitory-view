import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Facilities from '../Facilities/Facilities';
import ModalUI from '../../../components/UI/Modal/Modal';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const CONFIG = {
  condition: ['good', 'medium', 'poor'],
  kitchen: ['private', 'public'],
  bath: ['private', 'public']
};

const Modal = ({ close }) => {
  const [facilities, setFacilities] = useState(false);
  const { t } = useTranslation();

  return (
    <ModalUI
      title={facilities ? t('cats.facilities.title') : 'Room options'}
      close={close}
      action={() => {}}
      size="lg"
      actionTitle="Add"
    >
      {!facilities
        ? <Main setFacilities={() => setFacilities(true)} />
        : <Facilities setFacilities={() => setFacilities(false)} />
      }
      {facilities && (
        <div className="rooms__modal__footer" onClick={() => setFacilities(null)}>
          <button className="rooms__modal__btn">
            Close
          </button>
        </div>
      )}
    </ModalUI>
  );
};

export default Modal;

const Main = ({ setFacilities, facilities, bills }) => {
  const { t } = useTranslation();

  return (
    <div className="modal__list">
      <div className="modal__item">
        <div className="modal__title">Condition</div>
        <Dropdown
          title="Medium"
          className="modal__input"
          items={CONFIG.condition.map(el => ({
            title: t(`condition.${el}`),
            click: () => {},
            active: false
          }))} />
      </div>
      <div className="modal__item">
        <div className="modal__title">Number of rooms</div>
        <input 
          className="modal__input " 
          placeholder="Rooms"
          type="number" /> 
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
          className="modal__input" />
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