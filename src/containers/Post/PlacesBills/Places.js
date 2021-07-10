import React, { useState } from 'react';
import { BsPlus, BsTrash } from 'react-icons/bs';

import Specifications from '../../../components/Specs/Specifications';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import Modal from '../../../components/UI/Modal/Modal';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const Places = () => {
  const [addModal, setAddModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState('school');

  const Places = { ...Specifications('flex aic').places };
  const places = [];
  const items = [];

  for (let key in Places) {
    items.push({
      title: key,
      click: () => setSelectedPlace(key),
      active: false
    });
    places.push((
      <div className="post__input input input--main" tabIndex="0" key={key}>
        {Places[key]()}
        <div className="post__input__btn-group">
          <button className="post__input__btn">
            <BsTrash className="icon--xs icon--grey" />
          </button>
        </div>
        <span>{key}</span>
      </div>
    ));
  }

  const paramOptions = {
    bus_station: () =>
      <div>
        <div className="modal__title">Bus numbers (Optional)</div>
        <input type="text" className="modal__input" placeholder="Buses e.g. 75, 90" />
      </div>,
    school: () =>
      <>
        <div className="mb-15">
          <div className="modal__title">School number (Optional)</div>
          <input type="number" className="modal__input" placeholder="Number" />
        </div>
        {/* <div>
          <div className="modal__title">Type</div>
          <Dropdown
            title="Public"
            className="modal__input"
            items={[
              {
                title: 'Public',
                click: () => {},
                active: true
              },
              {
                title: 'Private',
                click: () => {},
                active: false
              }
            ]} />
        </div> */}
      </>,
    hospital: () =>
      <div>
        <div className="modal__title">Hospital name</div>
        <input type="text" className="modal__input" placeholder="Name" />
      </div>,
    libriary: () =>
      <div>
        <div className="modal__title">Bus numbers (Optional)</div>
        <input type="text" className="modal__input" placeholder="Buses e.g. 75, 90" />
      </div>,
    restaurant: () =>
      <div>
        <div className="modal__title">Name of the restaurant</div>
        <input type="text" className="modal__input" placeholder="Name" />
      </div>,
    market: () =>
      <div>
        <div className="modal__title">Market name</div>
        <input type="text" className="modal__input" placeholder="Name" />
      </div>,
    mosque: () => 
      <div>
        <div className="modal__title">Mosque name</div>
        <input type="text" className="modal__input" placeholder="Name" />
      </div>
  };

  return (
    <>
      {addModal && (
          <Modal
            title="Nearby places"
            actionTitle="Add"
            action={() => {}}
            close={() => setAddModal(false)}
          >
            <div className="mb-2">
              <div className="modal__title">Place</div>
              <Dropdown 
                className="modal__input"
                title={selectedPlace}
                dropTitle="Places:"
                height={15}
                items={items} 
              />
            </div>
            {paramOptions[selectedPlace]()}
          </Modal>
        )
      }
      <div className="post__title post__title--lg">
        Nearby places
      </div>
      <div className="post__list">
        <div className="post__input input input--main">
          <span className="c-grey-l">Place</span>
          <span className="c-grey-l">Name</span>
        </div>
        <Scrollbar style={{ width: '100%', height: 'calc(100% - 5rem)' }}>
          {places}
        </Scrollbar>
        <button className="post__btn" onClick={() => setAddModal(true)}>
          <BsPlus className="icon--mid icon--dark" />
        </button>
      </div>
    </>
  );
};

export default React.memo(Places);