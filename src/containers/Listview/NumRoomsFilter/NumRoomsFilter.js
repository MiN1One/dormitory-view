import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs"
import { HiOutlineMinusSm } from "react-icons/hi";

const NumRoomsFilter = ({ setFilters, filters }) => {
  const [tempVal, setTempVal] = useState('');

  useEffect(() => 
    setTempVal(filters.numberOfRooms),
  [filters.numberOfRooms]);

  return (
    <div className="filters__section" id="rooms">
      <div className="filters__title">By number of rooms</div>
      <div className="flex jcsb">
        <button 
          className="filters__btn-sub filters__btn-sub--danger" 
          onClick={() => 
            setFilters(p => ({
              ...p,
              numberOfRooms: p.numberOfRooms ? (parseInt(p.numberOfRooms) === 1 ? undefined : p.numberOfRooms - 1) : 1
            }))
          }>
            <HiOutlineMinusSm className="icon icon--grey" />
        </button>
        <input 
          className="filters__input filters__input--mid"
          placeholder="Room count"
          type="number"
          value={tempVal || ''}
          onChange={(e) => setTempVal(e.target.value)}
          onBlur={() => {
            if (tempVal && tempVal !== '') {
              setFilters(p => ({
                ...p,
                numberOfRooms: tempVal
              }))
            }
          }} />
        <button 
          className="filters__btn-sub" 
          onClick={() => 
            setFilters(p => ({
              ...p,
              numberOfRooms: !p.numberOfRooms ? 1 : +p.numberOfRooms + 1
            })
          )}>
            <BsPlus className="icon icon--grey" />
        </button>
      </div>
    </div>
  );
};

export default NumRoomsFilter;