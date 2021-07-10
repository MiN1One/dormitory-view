import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiMinus } from 'react-icons/bi';
import { BsPen } from 'react-icons/bs';

import Specifications from '../../../components/Specs/Specifications';

const RoomOptionCard = ({
  onEdit,
  data,
  index,
  onRemoveRoom
}) => {
  const { t } = useTranslation();

  const setDisplayValue = (field) => field ? 'Yes' : 'No';

  const facilitiesList = [];
  const Facilities = Specifications('flex aic').facilities;
  delete Facilities.others;
  for (const [key, Element] of Object.entries(Facilities)) {
    facilitiesList.push((
      <div className="rooms__feature" key={key}>
        <Element />
        {setDisplayValue(data[key])}
      </div>
    ));
  }

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
          <span>Number of rooms</span>
          {data.numberOfRooms}
        </div>
        <div className="rooms__feature">
          <span>Condition</span>
          {data.condition}
        </div>
        {facilitiesList}
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
