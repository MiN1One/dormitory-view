import React from 'react';
import { BiMinus } from 'react-icons/bi';
import { BsPen } from 'react-icons/bs';

const RoomOptionCard = ({
  onEdit,
  data,
  index,
  setData,
  onRemoveRoom
}) => {

  const setValue = (field) => field ? 'Yes' : 'No';

  return (
    <>
      <div className="rooms__head">
        <div className="rooms__title">Room option {index + 1}</div>
        <div className="flex">
          <button 
            className="btn--rounded mr-5" 
            onClick={onEdit}
          >
            <BsPen className="icon--xs icon--dark" />
          </button>
          <button className="btn--rounded" onClick={onRemoveRoom}>
            <BiMinus className="icon--xs icon--dark" />
          </button>
        </div>
      </div>
      <div className="rooms__body">
        <div className="rooms__feature">
          <span className="f-mid-w">Condition:</span>
          {data.condition}
        </div>
        <span className="rooms__feature">
          <span className="f-mid-w">Rooms:</span>
          {data.numberOfRooms}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Kitchen:</span>
          {data.kitchen}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Bath:</span>
          {data.bath}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Air conditioner:</span>
          {setValue(data.air_condition)}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Computer:</span>
          {setValue(data.computer)}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Parking:</span>
          {setValue(data.parking)}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Furnitured:</span>
          {setValue(data.furnitured)}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Washing machine:</span>
          {setValue(data.washing_machine)}
        </span>
      </div>
      <div className="rooms__footer">
        <span className="rooms__feature rooms__feature--price">
          ${data.price} / month
        </span>
      </div> 
    </>
  );
}

export default React.memo(RoomOptionCard);
