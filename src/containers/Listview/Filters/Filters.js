import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { BsArrowLeft } from 'react-icons/bs';
import { IoChevronForward } from 'react-icons/io5';
import { GoLocation } from 'react-icons/go';
import { GiForkKnifeSpoon } from 'react-icons/gi';

import './Filters.scss';

const Filters = ({ onSlide, slide }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className={`filters ${slide ? 'filters--slide' : ''}`}>
      <Scrollbars 
        autoHide
        autoHideTimeout={1500}
        autoHideDuration={250} 
        className="filters__scroller">
        <div className="filters__content">
          <div className="filters__head flex aie jcsb mb-2">
            <div className="heading heading--3 f-normal c-black">Filters</div>
            <button className="btn--slider" onClick={onSlide}>
              <BsArrowLeft className="icon icon--dark filters__icon" />
            </button>
          </div>
          <div className="filters__section">
            <div className="f-xl f-thin c-grey-l mb-1 flex aic">
              <GoLocation className="icon--sm mr-5 icon--grey-l" />
              By region
            </div>
            <Scrollbars 
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={250} 
              style={{ width: '100%', height: '35vh' }} 
              className="filters__list">
              <div className="filters__item" onClick={() => setSelectedCity('tashkent')}>
                Tashkent
                <IoChevronForward className="icon--xs icon--grey" />
              </div>
              <div className="filters__item">
                Samarkand
                <IoChevronForward className="icon--xs icon--grey" />
              </div>
              <div className="filters__item">
                Bukhoro
                <IoChevronForward className="icon--xs icon--grey" />
              </div>
              <div className="filters__item">
                Fergana
                <IoChevronForward className="icon--xs icon--grey" />
              </div>
              <div className="filters__item">
                Andijan
                <IoChevronForward className="icon--xs icon--grey" />
              </div>
              {selectedCity &&
                <ul className="filters__list filters__list--pop">
                  <li className="filters__item" onClick={() => setSelectedCity(null)}>Go back</li>
                  <li className="filters__item">All in Tashkent</li>
                  <li className="filters__item">Shaykhantakhur</li>
                  <li className="filters__item">Mirza-Ulugbek</li>
                  <li className="filters__item">Mirza-Ulugbek</li>
                  <li className="filters__item">Mirza-Ulugbek</li>
                  <li className="filters__item">Mirza-Ulugbek</li>
                  <li className="filters__item">Mirza-Ulugbek</li>
                  <li className="filters__item">Mirza-Ulugbek</li>
                  <li className="filters__item">Mirza-Ulugbek</li>
                  <li className="filters__item">Nurabad</li>
                </ul>
              }
            </Scrollbars>
          </div>
          <div className="filters__section">
            <div className="f-xl f-thin c-grey-l flex aic">
              <GiForkKnifeSpoon className="icon--sm icon--grey-l mr-5" />
              By facilites
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Filters;
