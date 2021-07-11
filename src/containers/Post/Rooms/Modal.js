import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Facilities from './FacilitiesView';
import ModalUI from '../../../components/UI/Modal/Modal';
import MainAddRoomView from './MainAddRoomView';
import CONFIG from './Config';
import RoomInput from './RoomsListView';
import { isEmptyObject } from '../../../utilities/utils';
import OffersView from './OffersView';

const Modal = ({
  setData,
  data,
  close,
  resetEditIndex,
  editIndex
}) => {
  const [mode, setMode] = useState(null);
  const { t } = useTranslation();
  const [room, setRoom] = useState(
    editIndex !== null ? data.roomOptions[editIndex] : CONFIG.defaultRoom
  );

  const [error, setError] = useState(null);

  const onModalClose = () => {
    if (mode) return; 
    
    close();
    resetEditIndex();
  };

  const onSaveRoom = () => {
    if (mode) return;

    if (room.price === '') {
      return setError(t(`error.input.price`));
    }
    
    if (isEmptyObject(room.rooms)) {
      return setError(t(`error.input.rooms`));
    }

    const options = [...data.roomOptions];
    if (editIndex !== null) {
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
  };

  let view = (
    <MainAddRoomView 
      error={error}
      setRoom={setRoom}
      room={room}
      setMode={setMode} />
  );

  if (mode === 'facilities') {
    view = <Facilities setRoom={setRoom} room={room} />;
  } else if (mode === 'rooms') {
    view = <RoomInput setRoom={setRoom} room={room} />;
  } else if (mode === 'offers') {
    view = <OffersView setRoom={setRoom} room={room} />;
  }

  return (
    <ModalUI
      title={mode === 'facilities' ? t('cats.facilities.title') : 'Room options'}
      hideClose={mode}
      close={onModalClose}
      action={mode ? () => setMode(null) : onSaveRoom}
      size="lg"
      actionTitle={(editIndex !== null || mode)  ? 'Save' : 'Add'}
    >
      {view}
    </ModalUI>
  );
};

export default Modal;