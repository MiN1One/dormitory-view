import React from 'react';
import { GoCheck } from 'react-icons/go';

import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import Specifications from '../../../components/Specs/Specifications';

const Bills = ({ data, setData }) => {
  const bills = [];
  const Bills = { ...Specifications('flex aic').bills };
  for (const [key, Element] of Object.entries(Bills)) {
    bills.push((
      <div 
        className="post__input input input--main" 
        key={key} 
        tabIndex="0"
        onClick={() => {
          let newList = [ ...data.bills ];
          if (data.bills.includes(key)) {
            newList = newList.filter(el => el !== key);
          } else {
            newList.push(key);
          }

          setData(p => ({
            ...p,
            bills: newList
          }));
        }}>
        <Element />
        <div className="input__checkbox-wrapper">
          <span className="input__checkbox filters__checkbox">
            {data.bills.includes(key) && <GoCheck className="icon--xs icon--green" />}
          </span>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="post__title post__title--lg">
        Bills
      </div>
      <div className="post__list">
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          {bills}
        </Scrollbar>
      </div>
    </>
  );
};

export default React.memo(Bills);