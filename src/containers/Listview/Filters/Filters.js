import React, { useEffect, useRef, useState } from 'react';
import { BsArrowLeft, BsCheck } from 'react-icons/bs';
import { IoChevronForward, IoSchoolOutline, IoWifi } from 'react-icons/io5';
import { GoCheck, GoLocation } from 'react-icons/go';
import { GiBathtub, GiForkKnifeSpoon, GiKnifeFork, GiMedicalThermometer, GiSofa } from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import { IoIosClose, IoIosSearch } from 'react-icons/io';

import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import './Filters.scss';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { BiDollar } from 'react-icons/bi';
import { MdLocalLaundryService } from 'react-icons/md';
import Specifications from '../../../components/Specs/Specifications';

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

  const Facilities = { ...Specifications('flex aic').facilities };
  delete Facilities.others;

  const facilities = [];
  for (let key in Facilities) {
    facilities.push((
      <div className="filters__item" key={key}>
        {Facilities[key]()}
        <div className="input__checkbox-wrapper">
          <span className="input__checkbox filters__checkbox">
            <GoCheck className="icon--xs icon--green" />
          </span>
        </div>
      </div>
    ))
  }

  const Bills = { ...Specifications('flex aic').bills };

  const bills = [];
  for (let key in Bills) {
    bills.push((
      <div className="filters__item" key={key}>
        {Bills[key]()}
        <div className="input__checkbox-wrapper">
          <span className="input__checkbox filters__checkbox">
            <GoCheck className="icon--xs icon--green" />
          </span>
        </div>
      </div>
    ))
  }

  return (
    <div className={`filters ${slide ? 'filters--slide' : ''}`}>
      <Scrollbar
        onScroll={() => scrollRef.current.getScrollTop()}
        className="filters__scroller"
        ref={scrollRef}>
        <div className="filters__content">
          <div className="filters__head flex aie jcsb mb-2">
            <div className="heading heading--3 f-normal c-black">Filters</div>
            <button className="btn--slider" onClick={onSlide}>
              <BsArrowLeft className="icon icon--dark filters__icon" />
            </button>
          </div>
          <div className="filters__list--row">
            <div className="filters__item-wrapper">
              <div 
                tabIndex="0" 
                onClick={() => getToFilter('facilities')} 
                className="filters__item">
                  Facilities
              </div>
              <button className="filters__item-btn filters__btn-close tooltip">
                <IoIosClose className="icon icon--grey" />
                <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
              </button>
            </div>
            <div className="filters__item-wrapper">
              <div 
                tabIndex="0" 
                onClick={() => getToFilter('regions')} 
                className="filters__item">
                  Regions
              </div>
            </div>
            <div className="filters__item-wrapper">  
              <Dropdown
                positionX="left"
                className="filters__item"
                noIcon
                dropTitle="Number of rooms:"
                title={
                  <>
                    Rooms
                    <span className="c-grace f-sm">{4}</span>
                  </>
                }
                height={15}
                items={[
                  { title: 'Any', click: () => {}, active: false },
                  { title: 1, click: () => {}, active: false, checkbox: { val: false, click: () => {} } },
                  { title: 2, click: () => {}, active: false, checkbox: { val: false, click: () => {} } },
                  { title: 3, click: () => {}, active: false, checkbox: { val: false, click: () => {} } },
                  { title: 4, click: () => {}, active: false, checkbox: { val: true, click: () => {} } }
                ]} />
              <button className="filters__item-btn filters__btn-close tooltip">
                <IoIosClose className="icon icon--grey" />
                <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
              </button>
            </div>
            <div className="filters__item-wrapper">
              <div 
                tabIndex="0" 
                onClick={() => getToFilter('university')} 
                className="filters__item">
                  University
              </div>
              <button className="filters__item-btn filters__btn-close tooltip">
                <IoIosClose className="icon icon--grey" />
                <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
              </button>
            </div>
            <div className="filters__item-wrapper">
              <div 
                tabIndex="0" 
                onClick={() => getToFilter('bills')} 
                className="filters__item">
                  Bills
                  <span className="filters__item__notif"></span>
              </div>
              <button className="filters__item-btn filters__btn-close tooltip">
                <IoIosClose className="icon icon--grey" />
                <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
              </button>
            </div>
            <div className="filters__item-wrapper">
              <Dropdown
                title={
                  <>
                    Ownership
                    <span className="filters__item__notif"></span>
                  </>
                }
                noIcon
                className="filters__item"
                items={[
                  {
                    title: 'Any',
                    click: () => {}
                  },
                  {
                    title: 'University',
                    active: true,
                    click: () => {}
                  },
                  {
                    title: 'Private',
                    click: () => {}
                  }
                ]}
                dropTitle="Owned by:"
                positionX="right" />
              <button className="filters__item-btn filters__btn-close tooltip">
                <IoIosClose className="icon icon--grey" />
                <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
              </button>
            </div>
            <div className="filters__item-wrapper">
              <div 
                tabIndex="0" 
                onClick={() => getToFilter('price')} 
                className="filters__item filters__item--active">
                  Price 
                  <span className="c-grace f-sm">{0} - {0}</span>
              </div>
              <button className="filters__item-btn filters__btn-close tooltip">
                <IoIosClose className="icon icon--grey" />
                <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
              </button>
            </div>
          </div>
          <div className="filters__section" id="price">
            <div className="f-xl f-thin c-black mb-15 flex aic">
              By Price
            </div>
            <div className="filters__form">
              <div className="flex aic mb-1 jcsb">
                <div className="flex aic c-black f-thin f-sm">
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
                    if (
                      e.target.value !== '' && 
                      (parseInt(e.target.value) < 150 || parseInt(e.target.value) < 0)
                    ) {
                      e.target.value = `${150}`;
                    }
                  }} />
                <input 
                  type="number" 
                  className="filters__input filters__input--sm" 
                  placeholder="to"
                  onBlur={(e) => {
                    if (
                      e.target.value !== '' &&
                      (parseInt(e.target.value) > 746 || parseInt(e.target.value) < 0)
                    ) {
                      e.target.value = `${746}`;
                    }
                  }} />
              </div>
            </div>
          </div>
          <div className="filters__section" id="regions">
            <div className="f-xl f-thin c-black mb-15 flex aic">
              <GoLocation className="icon--sm mr-1 icon--grey" />
              By region
            </div>
            <div className="filters__list">
              <div className="pos-rel">
                <input
                  className="filters__item filters__item--inp"
                  placeholder="District or city name"
                  type="text" />
                <IoIosSearch className="icon filters__search-icon" />
              </div>
              <Scrollbar style={{ width: '100%', height: 'calc(100% - 4.75rem)' }}>
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
              </Scrollbar>
              {selectedCity &&
                <div className="filters__list filters__list--pop">
                  <Scrollbar style={{ width: '100%', height: '100%' }}>
                    <li className="filters__item" onClick={() => setSelectedCity(null)}>
                      <div className="flex aic">
                        <BsArrowLeft className="icon--sm icon--grey mr-1" />
                        Go back
                      </div>
                    </li>
                    <li className="filters__item">
                      All in Tashkent
                      <div className="input__checkbox-wrapper">
                        <span className="input__checkbox filters__checkbox">
                          <GoCheck className="icon--xs icon--green" />
                        </span>
                      </div>
                    </li>
                    <li className="filters__item">Shaykhantakhur</li>
                    <li className="filters__item">Mirza-Ulugbek</li>
                    <li className="filters__item">Nurabad</li>
                  </Scrollbar>
                </div>
              }
            </div>
          </div>
          <div className="filters__section" id="bills">
            <div className="f-xl f-thin c-black flex aic mb-15">
              <GiForkKnifeSpoon className="icon--sm icon--dark mr-1" />
              By bills included
            </div>
            <div className="filters__list">
              <Scrollbar style={{ width: '100%', height: '100%' }}>
                {bills}
              </Scrollbar>
            </div>
          </div>
          <div className="filters__section" id="university">
            <div className="f-xl f-thin c-black flex aic mb-15">
              <IoSchoolOutline className="icon--sm icon--grey mr-1" />
              By university
            </div>
            <div className="filters__list">
              <div className="pos-rel">
                <input
                  className="filters__item filters__item--inp"
                  placeholder="Search in Tashkent..."
                  type="text" />
                <IoIosSearch className="icon filters__search-icon" />
              </div>
              <Scrollbar
                style={{ width: '100%', height: 'calc(100% - 4.75rem)' }} >
                  <div className="filters__item" tabIndex="0">
                    Webster University
                    <div className="input__checkbox-wrapper">
                      <span className="input__checkbox filters__checkbox">
                        <GoCheck className="icon--xs icon--green" />
                      </span>
                    </div>
                  </div>
                  <div className="filters__item" tabIndex="0">Inha University</div>
                  <div className="filters__item" tabIndex="0">Westminster University</div>
                  <div className="filters__item" tabIndex="0">National University</div>
                  <div className="filters__item" tabIndex="0">Amity University</div>
              </Scrollbar>
            </div>
          </div>
          <div className="filters__section" id="facilities">
            <div className="f-xl f-thin c-black flex aic mb-15">
              <BiDollar className="icon--sm icon--grey mr-5" />
              By facilities
            </div>
            <div className="filters__list">
              <Scrollbar style={{ width: '100%', height: '100%' }}>
                {facilities}
              </Scrollbar>
            </div>
          </div>
        </div>
      </Scrollbar>
    </div>
  );
};

export default Filters;
