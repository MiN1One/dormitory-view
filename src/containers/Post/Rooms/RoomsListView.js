import { BiPlus, BiMinus } from 'react-icons/bi';

import Scrollbar from "../../../components/UI/Scrollbar/Scrollbar";
import CONFIG from './Config';
import useCountRooms from "../../../hooks/useCountRooms";

const RoomInput = ({ setRoom, room }) => {

  const roomsList = useCountRooms(room.rooms);

  const onAddRemoveFromList = (room, type) => {
    setRoom(p => {
      const tempRoom = {
        ...p,
        rooms: { ...p.rooms, }
      };

      if (room in p.rooms) {
        tempRoom.rooms[room] = type === '+' ? p.rooms[room] + 1 : p.rooms[room] - 1;
      } else {
        tempRoom.rooms[room] = 1;
      }

      if (CONFIG.rooms[room].countable) {
        tempRoom.numberOfRooms = type === '+' ? p.numberOfRooms + 1 : p.numberOfRooms - 1;
      }

      return tempRoom;
    });
  };

  const rooms = [];
  for (let key in CONFIG.rooms) {
    rooms.push((
      <div className="post__input input input--main" key={key}>
        {key}
        <div className="flex">
          {(key in room.rooms && room.rooms[key] > 0) && (
            <button 
              className="btn--rounded mr-5"
              onClick={() => onAddRemoveFromList(key, '-')}>
                <BiMinus className="icon--grey icon--sm" />
            </button>
          )}
          <button 
            disabled={room.rooms[key] === CONFIG.rooms[key].maxcount}
            className="btn--rounded"
            onClick={() => onAddRemoveFromList(key, '+')}>
              <BiPlus className="icon--grey icon--sm" />
          </button>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="post__title fdc ais mb-2">
        Number of rooms: {room.numberOfRooms}
        {roomsList && (
          <span className="modal__text modal__text--lg c-grey-l f-mid f-normal mt-5">
            {roomsList}
          </span>
        )}
      </div>
      <div className="post__list post__list--sm">
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          <div className="w-100 flex fwrap">
            {rooms}
          </div>
        </Scrollbar>
      </div>
    </>
  );
}

export default RoomInput;
