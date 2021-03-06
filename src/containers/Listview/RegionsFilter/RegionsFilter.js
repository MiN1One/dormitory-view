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

  const onSelectRegion = (region) => {
    let newRegionsList;
    if (filters.map.region.includes(region)) {
      newRegionsList = filters.map.region.filter(r => r !== region);
      setFilters(prev => ({
        ...prev,
        map: {
          city: selectedCity,
          region: newRegionsList
        }
      }));
    } else {
      setFilters(prev => {
        newRegionsList = [ ...prev.map.region, region ];
        return {
          ...prev,
          map: {
            city: selectedCity,
            region: newRegionsList
          }
        };
      });
    }
  };

  const onSelectCity = (region) => {
    setFilters(prev => ({
      ...prev,
      map: {
        city: selectedCity,
        region: [region]
      }
    }))
  };

  const regionsEl = [];
  for (let key in regions) {
    const active = filters.map.city === key;
    regionsEl.push((
      <div 
        className={`filters__item ${active ? 'filters__item--active' : ''}`} 
        key={key}
        onClick={() => setSelectedCity(key)}
        tabIndex="0">
          {t(`regions:${key}.title`)}
          {active
            ? <GoCheck className="icons--xs icon--green" />
            : <IoChevronForward className="icon--xs icon--grey" />
          }
      </div>
    ));
  }

  const subRegionsEl = selectedCity && regions[selectedCity].regions.map((el, i) => {
    return (
      <li
        key={i}
        tabIndex="0"
        className="filters__item">
          <div className="wh-100" onClick={() => onSelectCity(el)}>
            {t(`regions:${selectedCity}.regions.${el}`)}
          </div>
          <div 
            className="input__checkbox-wrapper" 
            onClick={() => onSelectRegion(el)}>
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
      <div className="filters__title">
        <GoLocation className="icon--sm mr-1 icon--grey" />
        By region
      </div>
      <div className="filters__list">
        <div className="pos-rel">
          <input
            onChange={(e) => onSearchForRegion(e.target.value)}
            className="filters__item filters__item--inp"
            placeholder="District or city name"
            type="text" />
          <IoIosSearch className="icon filters__search-icon" />
        </div>
        <Scrollbar style={{ width: '100%', height: 'calc(100% - 4.75rem)' }}>
          <div 
            className="filters__item" 
            onClick={() => 
              setFilters(p => ({
                ...p,
                map: {
                  city: 'all',
                  region: []
                }
              }))
            }
            tabIndex="0">
              {t('regions:all.regions.all')}
              <span className="input__checkbox filters__checkbox">
                {filters.map.city === 'all' && (
                  <GoCheck className="icon--xs icon--green" />
                )}
              </span>
          </div>
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
                  {t(`regions:${selectedCity}.regions.all`)}
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

export default React.memo(RegionsFilter);
