import React from 'react';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { GoCheck } from 'react-icons/go';
import Specifications from '../../../components/Specs/Specifications';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';

const FacilitiesFilter = ({ filters, setFilters }) => {

  const Facilities = { ...Specifications('flex aic').facilities };
  delete Facilities.others;

  const facilities = [];
  for (let key in Facilities) {
    facilities.push((
      <div 
        className="filters__item" 
        key={key}
        tabIndex="0"
        onClick={() => {
          if (!filters.facilities[key]) {
            setFilters(prev => {
              let val = prev[key] ? !prev[key][0] : true;
              if (key === 'bath' || key === 'kitchen') {
                val = 'private';
              }
              return {
                ...prev,
                facilities: {
                  ...prev.facilities,
                  [key]: [val]
                }
              }
            });
          } else {
            const newFilters = { 
              ...filters, 
              facilities: { ...filters.facilities }
            };
            delete newFilters.facilities[key];
            setFilters(newFilters);
          }
        }}>
        {Facilities[key]()}
        <div className="input__checkbox-wrapper">
          <span className="input__checkbox filters__checkbox">
            {(filters.facilities[key] && filters.facilities[key][0]) && (
              <GoCheck className="icon--xs icon--green" />
            )}
          </span>
        </div>
      </div>
    ));
  }

  return (
    <div className="filters__section" id="facilities">
      <div className="filters__title">
        <GiForkKnifeSpoon className="icon--sm icon--dark mr-1" />
        By facilities
      </div>
      <div className="filters__list">
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          {facilities}
        </Scrollbar>
      </div>
    </div>
  );
}

export default React.memo(FacilitiesFilter);
