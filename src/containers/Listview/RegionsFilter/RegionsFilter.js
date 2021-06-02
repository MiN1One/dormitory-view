import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsArrowLeft } from 'react-icons/bs';
import { GoCheck, GoLocation } from 'react-icons/go';
import { IoIosSearch } from 'react-icons/io';
import { IoChevronForward } from 'react-icons/io5';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import useFindRegions from '../../../hooks/useFindRegions';

const RegionsFilter = ({ setFilters, filters }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const { t } = useTranslation('regions');
  const { regions, onSearchForRegion } = useFindRegions();

  const regionsEl = [];
  for (let key in regions) {
    regionsEl.push((
      <div 
        className="filters__item" 
        key={key}
        onClick={() => setSelectedCity(key)}
        tabIndex="0">
          {t(`regions:${key}.title`)}
          <IoChevronForward className="icon--xs icon--grey" />
      </div>
    ));
  }

  const subRegionsEl = selectedCity && regions[selectedCity].regions.map((el, i) => {
    return (
      <li
        key={i}
        tabIndex="0"
        className="filters__item">
          <div className="wh-100" onClick={() => {
            setFilters(prev => ({
              ...prev,
              map: {
                city: selectedCity,
                region: [el]
              }
            }))
          }}>
            {t(`regions:${selectedCity}.regions.${el}`)}
          </div>
          <div 
            className="input__checkbox-wrapper" 
            onClick={() => {
              let newRegionsList;
              if (filters.map && filters.map.region.includes(el)) {
                newRegionsList = filters.map.region.filter(r => r !== el);
                setFilters(prev => ({
                  ...prev,
                  map: {
                    city: selectedCity,
                    region: newRegionsList
                  }
                }));
              } else {
                setFilters(prev => {
                  newRegionsList = [ ...prev.map.region, el ];
                  return {
                    ...prev,
                    map: {
                      city: selectedCity,
                      region: newRegionsList
                    }
                  };
                });
              }
          }}>
            <span className="input__checkbox filters__checkbox">
              {filters.map.region.includes(el) && (
                <GoCheck className="icon--xs icon--green" />
              )}
            </span>
          </div>
      </li>
    );
  })

  return (
    <div className="filters__section" id="regions">
      <div className="f-xl f-thin c-black mb-15 flex aic">
        <GoLocation className="icon--sm mr-1 icon--grey" />
        By region
      </div>
      <div className="filters__list">
        <div className="pos-rel">
          <input
            onChange={onSearchForRegion}
            className="filters__item filters__item--inp"
            placeholder="District or city name"
            type="text" />
          <IoIosSearch className="icon filters__search-icon" />
        </div>
        <Scrollbar style={{ width: '100%', height: 'calc(100% - 4.75rem)' }}>
          {regionsEl}
        </Scrollbar>
        {selectedCity &&
          <div className="filters__list filters__list--pop">
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <li 
                tabIndex="0"
                className="filters__item" 
                onClick={() => setSelectedCity(null)}>
                  <div className="flex aic">
                    <BsArrowLeft className="icon--sm icon--grey mr-1" />
                    Go back
                  </div>
              </li>
              <li 
                tabIndex="0"
                className="filters__item" 
                onClick={() => {
                  setFilters(prev => ({
                    ...prev,
                    map: {
                      city: selectedCity,
                      region: []
                    }
                  }));
                }}>
                  All in {t(`regions:${selectedCity}.title`)}
                  <div className="input__checkbox-wrapper">
                    <span className="input__checkbox filters__checkbox">
                      {(filters.map.region.length === 0 && selectedCity === filters.map.city) && (
                        <GoCheck className="icon--xs icon--green" />
                      )}
                    </span>
                  </div>
              </li>
              {subRegionsEl}
            </Scrollbar>
          </div>
        }
      </div>
    </div>
  );
}

export default RegionsFilter;
