import React, { useRef, useState } from 'react';
import { BsArrowLeft, BsArrowUp } from 'react-icons/bs';
import { IoSchoolOutline } from 'react-icons/io5';
import { GoCheck } from 'react-icons/go';

import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import './Filters.scss';
import { useTranslation } from 'react-i18next';
import PriceFilter from '../PriceFilter/PriceFilter-class';
import RegionsFilter from '../RegionsFilter/RegionsFilter';
import BillsFilter from '../BillsFilter/BillsFilter';
import FacilitiesFilter from '../FacilitiesFilter/FacilitiesFilter';
import MainFilters from '../MainFilters/MainFilters';
import NumRoomsFilter from '../NumRoomsFilter/NumRoomsFilter';
import { IoIosSearch } from 'react-icons/io';

const Filters = props => {
  const { onSlide, slide } = props;
  const { t } = useTranslation();
  const [scroll, setScroll] = useState(0);

  const scrollRef = useRef();
  const filtersRef = useRef();

  const classes = ['filters'];
  slide && classes.push('filters--slide');

  return (
    <div className={classes.join(' ')} ref={filtersRef}>
      <Scrollbar
        onScroll={() => setScroll(scrollRef.current.getScrollTop())}
        className="filters__scroller"
        ref={scrollRef}>
          {scroll > filtersRef.current?.offsetHeight * 0.6 && (
            <button 
              className="filters__btn btn--slider" 
              onClick={() => scrollRef.current.scrollTop(0)}>
                <BsArrowUp className="icon--mid icon--dark" />
            </button>
          )}
          <div className="filters__content">
            <div className="filters__head flex aie jcsb mb-2">
              <div className="heading heading--3 f-normal c-black">Filters</div>
              <button className="btn--slider" onClick={onSlide}>
                <BsArrowLeft className="icon icon--dark filters__icon" />
              </button>
            </div>
            <MainFilters scrollbar={scrollRef} {...props} />
            <PriceFilter {...props} />
            <RegionsFilter {...props} />
            <NumRoomsFilter {...props} />
            <BillsFilter {...props} />
            <FacilitiesFilter {...props} />
            <div className="filters__section" id="university">
              <div className="filters__title">
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

export default React.memo(Filters);
