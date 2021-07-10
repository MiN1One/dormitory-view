import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Facilities from './FacilitiesView';
import ModalUI from '../../../components/UI/Modal/Modal';
import MainAddRoomView from './MainAddRoomView';
import CONFIG from './Config';
import RoomInput from './RoomsListView';
import { isEmptyObject } from '../../../utilities/utils';

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

  return (
    <ModalUI
      title={mode === 'facilities' ? t('cats.facilities.title') : 'Room options'}
      hideClose={mode}
      close={() => {
        if (!mode) {
          close();
          resetEditIndex();
        }
      }}
      action={mode ? () => setMode(null) : onSaveRoom}
      size="lg"
      actionTitle={(editIndex !== null || mode)  ? 'Save' : 'Add'}
    >
      {!mode
        ? (
          <MainAddRoomView 
            error={error}
            setRoom={setRoom}
            room={room}
            setMode={(m) => setMode(m)} />
        )
        : (
          mode === 'facilities'
            ? (
              <Facilities 
                setRoom={setRoom}
                room={room} />
            )
            : (
              <RoomInput 
                setRoom={setRoom}
                room={room} />
            )
        )
      }
      {/* {mode && (
        <div className="rooms__modal__footer">
          <button className="rooms__modal__btn" onClick={() => setMode(null)}>
            Save
          </button>
        </div>
      )} */}
    </ModalUI>
  );
};

export default Modal;