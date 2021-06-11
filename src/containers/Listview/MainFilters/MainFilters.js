import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { useParams } from 'react-router';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { isEmptyObject } from '../../../utilities/utils';

const MainFilters = ({ scrollbar, setFilters, filters, defaultFilters }) => {

  const getToFilter = (filters) => {
    const el = document.getElementById(filters);
    if (el) {
      scrollbar.current.scrollTop(el.offsetTop - el.offsetLeft);
      // el.scrollIntoView();
    }
  };

  const classes = {
    region: [],
    bills: [],
    price: [],
    facilities: [],
    ownership: []
  };

  const diffMap = 
    defaultFilters.map.region !== filters.map.region || 
    defaultFilters.map.city !== filters.map.city;
  const diffFacilites = !isEmptyObject(filters.facilities);
  const diffBills = filters.bills.length > 0;
  const diffPrice = !isEmptyObject(filters.price);

  const activeClass = 'filters__item--active';

  diffMap && classes.region.push(activeClass);
  diffFacilites && classes.facilities.push(activeClass);
  diffBills && classes.bills.push(activeClass);
  diffPrice && classes.price.push(activeClass);
  filters.ownership && classes.ownership.push(activeClass);

  for (let key in classes) {
    classes[key].push('filters__item');
    classes[key] = classes[key].join(' ');
  }

  return (
    <div className="filters__list--row">
      <div className="filters__item-wrapper">
        <div 
          tabIndex="0" 
          onClick={() => getToFilter('facilities')} 
          className={classes.facilities}>
            Facilities
            <span className="filters__item__dot" />
        </div>
        {diffFacilites && (
          <button 
            className="filters__item-btn filters__btn-close tooltip"
            onClick={() => 
              setFilters(prev => ({
                ...prev,
                facilities: {}
              }))
            }>
              <IoIosClose className="icon icon--grey" />
              <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
          </button>
        )}
      </div>
      <div className="filters__item-wrapper">
        <div 
          tabIndex="0" 
          onClick={() => getToFilter('regions')} 
          className={classes.region}>
            Regions
            <span className="filters__item__dot" />
        </div>
        {diffMap && (
          <button 
            className="filters__item-btn filters__btn-close tooltip"
            onClick={() => 
              setFilters(prev => ({
                ...prev,
                map: {
                  city: defaultFilters.map.city,
                  region: defaultFilters.map.region
                }
              }))
            }>
              <IoIosClose className="icon icon--grey" />
              <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
          </button>
        )}
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
          <span className="tooltip__text tooltip__text--top tooltip__text--center">
            Clear
          </span>
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
          className={classes.bills}>
            Bills
            <span className="filters__item__dot" />
        </div>
        {diffBills && (
          <button 
            onClick={() => 
              setFilters(prev => ({
                ...prev,
                bills: []
              }))
            }
            className="filters__item-btn filters__btn-close tooltip">
              <IoIosClose className="icon icon--grey" />
              <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
          </button>
        )}
      </div>
      <div className="filters__item-wrapper">
        <Dropdown
          title={
            <>
              Ownership
              <span className="filters__item__dot" />
            </>
          }
          noIcon
          className={classes.ownership}
          items={[
            {
              title: 'Any',
              active: !filters.ownership,
              click: () => setFilters(prev => ({
                ...prev,
                ownership: undefined
              }))
            },
            {
              title: 'University',
              active: filters.ownership === 'university-owned',
              click: () => setFilters(prev => ({
                ...prev,
                ownership: 'university-owned'
              }))
            },
            {
              title: 'Private',
              active: filters.ownership === 'private',
              click: () => setFilters(prev => ({
                ...prev,
                ownership: 'private'
              }))
            }
          ]}
          dropTitle="Owned by:"
          positionX="right" />
        {filters.ownership && (
          <button 
            className="filters__item-btn filters__btn-close tooltip" 
            onClick={() => 
              setFilters(prev => ({
                ...prev,
                ownership: undefined
            }))}>
            <IoIosClose className="icon icon--grey" />
            <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
          </button>
        )}
      </div>
      <div className="filters__item-wrapper">
        <div 
          tabIndex="0" 
          onClick={() => getToFilter('price')} 
          className={classes.price}>
            Price 
            {diffPrice && (
              <span className="filters__price-indicator"> 
                {filters.price.from && filters.price.from} - {filters.price.to && filters.price.to}
              </span>
            )}
        </div>
        {diffPrice && (
          <button 
            onClick={() =>
              setFilters(p => ({
                ...p,
                price: {}
              }))
            }
            className="filters__item-btn filters__btn-close tooltip">
              <IoIosClose className="icon icon--grey" />
              <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
          </button>
        )}
      </div>
      <div className="filters__item-wrapper">
        <div 
          tabIndex="0" 
          onClick={() => setFilters(defaultFilters)} 
          className="filters__item filters__item--red">
            Clear filters
        </div>
      </div>
    </div>
  );
}

export default MainFilters;
