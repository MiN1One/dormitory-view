import React, { useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { GoCheck } from 'react-icons/go';

import './Dropdown.scss';
import Backdrop from '../Backdrop/Backdrop';
import Scrollbar from '../Scrollbar/Scrollbar';

const Dropdown = ({ title, items, dropTitle, positionX, positionY, className, noIcon, height, width }) => {
  const [show, setShow] = useState(false);
  
  const listItems = items.map((el, i) => (
    !el.checkbox 
      ? <div 
          key={i}
          tabIndex="0" 
          className={`
            drop__dropdown__item 
            ${el.active ? 'drop__dropdown__item--active' : ''}
          `}
          onClick={() => {
            el.click();
            setShow(false);
          }}>
            {el.title}
      </div>
      : <div className="pos-rel" key={i}>
          <div 
            tabIndex="0" 
            className="drop__dropdown__item"
            onClick={() => {
              el.click();
              setShow(false);
            }}>
              {el.title}
          </div>
          {el.checkbox && 
            <div 
              className="input__checkbox-wrapper drop__dropdown__checkbox" 
              onClick={el.checkbox.click}>
                <span className="input__checkbox">
                  {el.checkbox.val && <GoCheck className="icon--xs icon--green" />}
                </span>
            </div>
          }
      </div>
  ));

  return (
    <>
      {show && <Backdrop z={1} close={() => setShow(false)} opaque />}
      <div className={`drop drop--${positionX || 'center'} drop--${positionY || 'bottom'}`}>
        <div 
          className={className ? className : `drop__btn ${show ? 'drop__btn--active' : ''}`} 
          tabIndex="0" 
          onClick={() => setShow(prev => !prev)}>
            {title}
            {!noIcon && <IoChevronDownOutline 
              className="icon--xs icon--grey ml-5" />}
        </div>
        {show && 
          <div className="drop__dropdown">
            {((!positionY || positionY === 'bottom') && dropTitle) && 
              <div className="drop__dropdown__title">{dropTitle}</div>
            }
            {height
              ? <Scrollbar style={{ width: `${width || 'auto'}`, height: `${height}rem` }}>
                {listItems}
              </Scrollbar>
              : listItems
            }
            {(positionY && positionY === 'top' && dropTitle) && 
              <div className="drop__dropdown__title">{dropTitle}</div>
            }
          </div>
        }
      </div>
    </>
  );
};

export default Dropdown;
