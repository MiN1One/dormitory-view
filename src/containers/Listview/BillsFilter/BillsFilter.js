import React from 'react';
import { BiDollar } from 'react-icons/bi';
import { GoCheck } from 'react-icons/go';
import Specifications from '../../../components/Specs/Specifications';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';

const BillsFilter = ({ filters, setFilters }) => {

  const Bills = { ...Specifications('flex aic').bills };

  const bills = [];
  for (let key in Bills) {
    bills.push((
      <div 
        className="filters__item" 
        key={key} 
        tabIndex="0"
        onClick={() => {
          if (filters.bills.includes(key)) {
            const newList = filters.bills.filter((el) => el !== key);
            setFilters(prev => ({
              ...prev,
              bills: newList
            }));
          } else {
            setFilters(prev => ({
              ...prev,
              bills: [...prev.bills, key]
            }));
          }
        }}>
          {Bills[key]()}
          <div className="input__checkbox-wrapper">
            <span className="input__checkbox filters__checkbox">
              {filters.bills.includes(key) && (
                <GoCheck className="icon--xs icon--green" />
              )}
            </span>
          </div>
      </div>
    ))
  }

  return (
    <div className="filters__section" id="bills">
      <div className="filters__title">
        <BiDollar className="icon--sm icon--grey mr-5" />
        By bills included
      </div>
      <div className="filters__list">
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          {bills}
        </Scrollbar>
      </div>
    </div>
  );
}

export default React.memo(BillsFilter);
