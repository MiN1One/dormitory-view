import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BsArrowLeft, BsArrowUp } from 'react-icons/bs';
import { IoChevronForward, IoSchoolOutline } from 'react-icons/io5';
import { GoCheck, GoLocation } from 'react-icons/go';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import { IoIosClose, IoIosSearch } from 'react-icons/io';

import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import './Filters.scss';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { BiDollar } from 'react-icons/bi';
import Specifications from '../../../components/Specs/Specifications';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useFindRegions from '../../../hooks/useFindRegions';
import PriceFilter from '../PriceFilter/PriceFilter';
import RegionsFilter from '../RegionsFilter/RegionsFilter';
import BillsFilter from '../BillsFilter/BillsFilter';
import FacilitiesFilter from '../FacilitiesFilter/FacilitiesFilter';

const Filters = props => {
  const { onSlide, slide, setFilters, filters } = props;
  const { t } = useTranslation('regions');

  const scrollRef = useRef();
  const filtersRef = useRef();

  const getToFilter = (filters) => {
    const el = document.getElementById(filters);
    if (el) {
      scrollRef.current.scrollTop(el.offsetTop - el.offsetLeft);
      // el.scrollIntoView();
    }
  };

  const classes = ['filters'];
  slide && classes.push('filters--slide');

  return (
    <div className={classes.join(' ')} ref={filtersRef}>
      <Scrollbar
        onScroll={() => scrollRef.current.getScrollTop()}
        className="filters__scroller"
        ref={scrollRef}>
          <button className="filters__btn btn--slider" onClick={() => scrollRef.current.scrollTop(0)}>
            <BsArrowUp className="icon--mid icon--dark" />
          </button>
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
            <PriceFilter {...props} />
            <RegionsFilter {...props} />
            <BillsFilter {...props} />
            <FacilitiesFilter {...props} />
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
          </div>
      </Scrollbar>
    </div>
  );
};

export default Filters;
