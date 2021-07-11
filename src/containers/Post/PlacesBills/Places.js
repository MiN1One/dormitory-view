import React, { useState } from 'react';
import { BsPlus, BsTrash } from 'react-icons/bs';

import Specifications from '../../../components/Specs/Specifications';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import Modal from '../../../components/UI/Modal/Modal';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const DEFAULT_PLACE = 'mosque';

const Places = ({ data, setData }) => {
  const [modal, setModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(DEFAULT_PLACE);
  const [placeSpec, setPlaceSpec] = useState('');

  const onSavePlace = () => {
    setData(p => ({
      ...p,
      places: {
        ...p.places, 
        [selectedPlace]: selectedPlace in p.places ? [...p.places[selectedPlace], placeSpec] : [placeSpec]
      }
    }));
    
    // Reset options
    setSelectedPlace(DEFAULT_PLACE);
    setPlaceSpec('');
    setModal(false);
  };

  const onRemovePlace = (place, index) => {
    setData(prev => ({
      ...prev,
      places: {
        ...prev.places,
        [place]: prev.places[place].filter((_, i) => i !== index)
      }
    }));
  };

  const Places = Specifications('flex aic').places;
    
  const items = [];
  for (let key in Places) {
    items.push({
      title: key,
      click: () => setSelectedPlace(key),
      active: selectedPlace === key
    });
  }

  const places = [];
  for (let key in data.places) {
    if (key in Places) {
      const Element = Places[key];

      data.places[key].forEach((el, i) => {
        places.push((
          <div 
            className="post__input input input--main" 
            tabIndex="0" 
            key={key+Date.now()+el}>
              <Element spec={el} />
              <div className="post__input__btn-group">
                <button 
                  className="post__input__btn" 
                  onClick={() => onRemovePlace(key, i)}>
                    <BsTrash className="icon--xs icon--grey" />
                </button>
              </div>
              <span>{key}</span>
          </div>
        ));
      });
    }
  }

  const placesOptions = Specifications().placesOptions;
  const activePlace = placesOptions[selectedPlace];

  const activePlaceOption = activePlace && (
    <div>
      <div className="modal__title">{activePlace.title}</div>
      <input 
        value={placeSpec}
        onChange={(e) => setPlaceSpec(e.target.value)}
        className="modal__input" 
        type={activePlace.spec.type} 
        placeholder={activePlace.spec.placeholder} />
    </div>
  );

  return (
    <>
      {modal && (
          <Modal
            title="Nearby places"
            actionTitle="Add"
            action={onSavePlace}
            close={() => setModal(false)}
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
            {activePlaceOption}
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
        <button className="post__btn" onClick={() => setModal(true)}>
          <BsPlus className="icon--mid icon--dark" />
        </button>
      </div>
    </>
  );
};

export default React.memo(Places);