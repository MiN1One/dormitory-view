import React, { useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { BsArrowLeft, BsCheck } from 'react-icons/bs';
import { IoChevronForward } from 'react-icons/io5';
import { GoLocation } from 'react-icons/go';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import { AiOutlineDollarCircle } from 'react-icons/ai';

import './Filters.scss';

const Filters = ({ onSlide, slide }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [filterByPrice, setFilterByPrice] = useState(false);
  const scrollRef = useRef();
  const location = useLocation();

  const getToFilter = (filters) => {
    const el = document.getElementById(filters);
    if (el) {
      scrollRef.current.scrollTop(el.offsetTop - el.offsetLeft);
      // el.scrollIntoView();
    }
  };

  return (
    <div className={`filters ${slide ? 'filters--slide' : ''}`}>
      <Scrollbars 
        autoHide
        onScroll={() => scrollRef.current.getScrollTop()}
        autoHideTimeout={1500}
        autoHideDuration={250} 
        className="filters__scroller"
        ref={scrollRef}>
        <div className="filters__content">
          <div className="filters__head flex aie jcsb mb-2">
            <div className="heading heading--3 f-normal c-black">Filters</div>
            <button className="btn--slider" onClick={onSlide}>
              <BsArrowLeft className="icon icon--dark filters__icon" />
            </button>
          </div>
          <div className="flex fwrap mb-2">
            <div 
              tabIndex="0" 
              onClick={() => getToFilter('regions')} 
              className="filters__item filters__item--sm">
                Regions
            </div>
            <div 
              tabIndex="0" 
              onClick={() => getToFilter('facilities')} 
              className="filters__item filters__item--sm">
                Facilities
            </div>
            <div 
              tabIndex="0" 
              onClick={() => getToFilter('ownership')}
              className="filters__item filters__item--sm">
                Ownership
            </div>
            <div 
              tabIndex="0" 
              onClick={() => getToFilter('price')} 
              className="filters__item filters__item--active filters__item--sm">
                Price 
                <span className="c-grace f-sm">{0} - {0}</span>
                <button className="filters__item__btn filters__btn-close tooltip">
                  <IoIosClose className="icon icon--grey" />
                  <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
                </button>
            </div>
            <div 
              tabIndex="0" 
              onClick={() => getToFilter('bills')} 
              className="filters__item filters__item--sm">
                Bills
            </div>
            <div 
              tabIndex="0" 
              onClick={() => getToFilter('numrooms')} 
              className="filters__item filters__item--sm">
                Number of rooms
            </div>
            <div 
              tabIndex="0" 
              onClick={() => getToFilter('numrooms')} 
              className="filters__item filters__item--sm">
                University
            </div>
          </div>
          <div className="filters__section" id="price">
            <div className="f-xl f-thin c-grey mb-15 flex aic">
              <AiOutlineDollarCircle className="icon--sm mr-5 icon--grey" />
              By Price
            </div>
            <div className="filters__form">
              <div className="flex aic mb-1 jcsb">
                <div className="flex aic c-grace f-thin f-sm">
                  <span>min: 150</span>
                  <span className="inline mr-1 ml-1 f-xs">|</span>
                  <span>max: 746</span>
                </div>
                <button className="filters__btn-close tooltip" onClick={() => setFilterByPrice(false)}>
                  <IoIosClose className="icon icon--grey" />
                  <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
                </button>
              </div>
              <div className="flex">
                <input 
                  type="number" 
                  className="filters__input filters__input--sm" 
                  placeholder="from"
                  onBlur={(e) => {
                    if (e.target.value !== '' && parseInt(e.target.value) < 150) {
                      e.target.value = `${150}`;
                    }
                  }} />
                <input 
                  type="number" 
                  className="filters__input filters__input--sm" 
                  placeholder="to"
                  onBlur={(e) => {
                    if (e.target.value !== '' && parseInt(e.target.value) > 746) {
                      e.target.value = `${746}`;
                    }
                  }} />
              </div>
            </div>
          </div>
          <div className="filters__section" id="regions">
            <div className="f-xl f-thin c-grey mb-15 flex aic">
              <GoLocation className="icon--sm mr-5 icon--grey" />
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
                  <li className="filters__item" onClick={() => setSelectedCity(null)}>
                    <div className="flex aic">
                      <BsArrowLeft className="icon--sm icon--grey mr-1" />
                      Go back
                    </div>
                  </li>
                  <li className="filters__item">
                    All in Tashkent
                    <div className="input__checkbox-wrapper">
                      <span className="input__checkbox">
                        <BsCheck className="icon--sm icon--green" />
                      </span>
                    </div>
                  </li>
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
          <div className="filters__section" id="facilities">
            <div className="f-xl f-thin c-grey flex aic">
              <GiForkKnifeSpoon className="icon--sm icon--grey mr-5" />
              By facilites
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Filters;
