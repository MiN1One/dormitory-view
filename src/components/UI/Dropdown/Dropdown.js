import React, { useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';

import './Dropdown.scss';
import Backdrop from '../Backdrop/Backdrop';

const Dropdown = ({ title, items, dropTitle, positionX, positionY, className }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {show && <Backdrop z={9997} close={() => setShow(false)} opaque />}
      <div className={`drop drop--${positionX || 'center'} drop--${positionY || 'bottom'}`}>
        <div 
          className={className ? className : `drop__btn ${show ? 'drop__btn--active' : ''}`} 
          tabIndex="0" 
          onClick={() => setShow(prev => !prev)}>
            {title}
            <IoChevronDownOutline 
              className="icon--xs icon--grey ml-5" />
        </div>
        {show && 
          <div className="drop__dropdown">
            {(!positionY || positionY === 'bottom') && 
              <div className="drop__dropdown__title">{dropTitle}</div>
            }
            {items.map((el, i) => (
              <div 
                key={i}
                tabIndex="0" 
                className={`drop__dropdown__item ${el.active ? 'drop__dropdown__item--active' : ''}`}
                onClick={() => {
                  el.click();
                  setShow(false);
                }}>
                  {el.title}
              </div>
            ))}
            {(positionY && positionY === 'top') && 
              <div className="drop__dropdown__title">{dropTitle}</div>
            }
          </div>
        }
      </div>
    </>
  );
};

export default Dropdown;
