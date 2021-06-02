import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { useParams } from 'react-router';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const MainFilters = ({ scrollbar, setFilters, filters, defaultFilters }) => {

  const getToFilter = (filters) => {
    const el = document.getElementById(filters);
    if (el) {
      scrollbar.current.scrollTop(el.offsetTop - el.offsetLeft);
      // el.scrollIntoView();
    }
  };

  return (
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
              {filters.ownership && (
                <span className="filters__item__notif"></span>
              )}
            </>
          }
          noIcon
          className="filters__item"
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
          className="filters__item filters__item--active">
            Price 
            <span className="c-grace f-sm">{0} - {0}</span>
        </div>
        <button className="filters__item-btn filters__btn-close tooltip">
          <IoIosClose className="icon icon--grey" />
          <span className="tooltip__text tooltip__text--top tooltip__text--center">Clear</span>
        </button>
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
