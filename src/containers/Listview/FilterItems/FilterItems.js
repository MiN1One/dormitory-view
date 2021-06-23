import React from 'react';
import { IoIosClose } from 'react-icons/io';

const FilterItems = ({ 
  scrollbar, 
  active, 
  className, 
  clear, 
  value,
  title,
  name,
  click
}) => {

  const getToFilter = (filters) => {
    const el = document.getElementById(filters);
    if (el) {
      scrollbar.current.scrollTop(el.offsetTop - el.offsetLeft);
    }
  };

  const itemClass = [...className];
  itemClass.push('filters__item');
  if (active) {
    itemClass.push('filters__item--active');
  }

  return (
    <div className="filters__item-wrapper">
      <div 
        tabIndex="0" 
        onClick={() => {
          if (!name && click) return click();
          name && getToFilter(name);
        }} 
        className={itemClass.join(' ')}>
          {title}
          {value
            ? (
              active && (
                <span className="filters__indicator">
                  {value}
                </span>
              )
            )
            : <span className="filters__item__dot" />
          }
      </div>
      <button 
        className="filters__item__btn filters__btn-close tooltip"
        onClick={() => clear()}>
          <IoIosClose className="icon icon--grey" />
          <span className="tooltip__text tooltip__text--top tooltip__text--center">
            Clear
          </span>
      </button>
    </div>
  );
}

export default FilterItems;
