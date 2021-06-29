import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import DEFAULT_ROOM from './DefaultRoom';
import Facilities from '../Facilities/Facilities';
import ModalUI from '../../../components/UI/Modal/Modal';
import MainModalView from './MainModalView';

const Modal = ({ setData, data, close, resetEditIndex, editIndex }) => {
  const [facilities, setFacilities] = useState(false);
  const { t } = useTranslation();
  const [room, setRoom] = useState(
    editIndex !== null ? data.roomOptions[editIndex] : DEFAULT_ROOM
  );

  const onSaveRoom = () => {
    if (!facilities) {
      const options = [...data.roomOptions];
      if (editIndex) {
        options[editIndex] = room;
      } else {
        options.push(room);
      }

      setData(p => ({
        ...p,
        roomOptions: options
      }));
      resetEditIndex();
      close();
    }
  };

  return (
    <ModalUI
      title={facilities ? t('cats.facilities.title') : 'Room options'}
      close={() => {
        if (!facilities) {
          close();
          resetEditIndex();
        } 
      }}
      action={onSaveRoom}
      size="lg"
      actionTitle="Add"
    >
      {!facilities
        ? (
          <MainModalView 
            setRoom={setRoom}
            room={room}
            setFacilities={() => setFacilities(true)} />
        )
        : (
          <Facilities 
            setFacilities={() => setFacilities(false)}
            setRoom={setRoom}
            room={room} />
        )
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