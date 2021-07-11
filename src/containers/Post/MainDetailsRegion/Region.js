import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoCheck } from 'react-icons/go';
import { GoLocation } from 'react-icons/go';
import { IoIosSearch } from 'react-icons/io';
import { IoChevronForward } from 'react-icons/io5';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import useFindRegions from '../../../hooks/useFindRegions';

const Region = ({ data, setData }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const { regions, onSearchForRegion } = useFindRegions();
  const { t } = useTranslation(['regions', 'translation']);

  const regionsEl = [];
  for (let key in regions) {
    regionsEl.push((
      <div 
        key={key+Date.now()}
        className="post__input" 
        tabIndex="0" 
        onClick={() => setSelectedCity(key)}>
          {t(`regions:${key}.title`)}
          <IoChevronForward className="icon--xs icon--green" />
      </div>
    ));
  }

  const subRegions = 
    selectedCity && regions[selectedCity] && regions[selectedCity].regions.map(el => (
      <div 
        className="post__input" 
        tabIndex="0" 
        key={el+Date.now()}
        onClick={() =>
          setData(p => ({
            ...p,
            city: selectedCity,
            region: el
          }))
        }>
          {t(`regions:${selectedCity}.regions.${el}`)}
          {data.region === el && <GoCheck className="icons--xs icon--green" />}
      </div>
    ));

  return (
    <div className="post__section__item">
      <div className="post__list-wrapper">
        <div className="post__title post__title--lg">
          <GoLocation className="icon--mid mr-1 icon--green" />
          Region &mdash;&nbsp;
          <span className="c-grey-l f-thin">
            {t(`regions:${data.city}.title`)}, {t(`regions:${data.city}.regions.${data.region}`)}
          </span>
        </div>
        <div className="post__list">
          <div className="pos-rel">
            <IoIosSearch className="icon icon--grey post__input-icon" />
            <input 
              type="text"
              placeholder="City or district name"
              className="post__input input input--main"
              onChange={(e) => onSearchForRegion(e.target.value)} />
          </div>
          <Scrollbar 
            style={{ width: '100%', height: 'calc(100% - 5rem)' }}>
            {regionsEl}
          </Scrollbar>
        </div>
      </div>
      <div className="post__list-wrapper">
        <div className="post__list">
          {selectedCity && (
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              {subRegions}
            </Scrollbar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Region;
