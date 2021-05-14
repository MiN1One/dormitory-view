import React, { useState } from 'react';
import { BsPlus, BsTrash } from 'react-icons/bs';

import Specifications from '../../../components/Specs/Specifications';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import Modal from '../../../components/UI/Modal/Modal';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { RiPencilLine } from 'react-icons/ri';

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
      <>
        <div className="post__title">Bus numbers (Optional)</div>
        <input type="text" className="post__input input input--main" placeholder="Buses e.g. 75, 90" />
      </>,
    school: () =>
      <>
        <div className="mb-15">
          <div className="post__title">School number (Optional)</div>
          <input type="number" className="post__input input input--main" placeholder="Number" />
        </div>
        <div>
          <div className="post__title">Type</div>
          <Dropdown
            title="Public"
            className="post__input input input--main"
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
        </div>
      </>,
    hospital: () =>
      <>
        <div className="post__title">Hospital name</div>
        <input type="text" className="post__input input input--main" placeholder="Name" />
      </>,
    libriary: () =>
      <>
        <div className="post__title">Bus numbers (Optional)</div>
        <input type="text" className="post__input input input--main" placeholder="Buses e.g. 75, 90" />
      </>,
    restaurant: () =>
      <>
        <div className="post__title">Name of the restaurant</div>
        <input type="text" className="post__input input input--main" placeholder="Name" />
      </>,
    market: () =>
      <>
        <div className="post__title">Market name</div>
        <input type="text" className="post__input input input--main" placeholder="Name" />
      </>
  }

  return (
    <>
      {addModal && (
          <Modal
            title="Nearby places"
            footer="Add"
            action={() => {}}
            close={() => setAddModal(false)}
          >
            <div className="mb-15">
              <div className="post__title">Place</div>
              <Dropdown 
                className="post__input input input--main"
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
      <div className="post__section" id="places">
        <div className="container">
          <div className="post__section__item">
            <div className="post__list-wrapper">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Places;
