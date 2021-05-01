import { useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { IoIosSearch } from 'react-icons/io';
import { useHistory } from "react-router";

import './Searchbar.scss';

const Searchbar = ({ onFocus, focus, onBlur }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const history = useHistory();

  const regionsList = [
    'Tashkent', 
    'Tashkent Region', 
    'Fergana', 
    'Bukhara', 
    'Andijan', 
    'Nukus', 
    'Termez', 
    'Sirdarya',
    'Samarkand',
    'Khorezm'
  ];

  const regions = regionsList.map((el, i) => (
    <div className="dropdown__item" key={i} onMouseDown={() => history.replace(`/${el}`)}>
      {el}
      <span className="c-grey-l f-sm flex">{el}</span>
    </div>
  ));

  return (
    <div className={`search ${focus ? 'search--active' : ''}`} tabIndex="0">
      <div className="pos-rel">
        <IoIosSearch className="icon--mid icon--dark search__icon" />
        <input 
          className="input search__input" 
          type="text" 
          placeholder={t('main.searh-hero')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur} />
      </div>
      <button className="search__btn">
        {t('main.search')}
      </button>
      {focus && 
        <div className="search__dropdown">
          <div className="dropdown__head">
            <h6 className="heading heading--6">
              {t('nav.popular regions')}
            </h6>
          </div>
          <Scrollbars style={{ width: '100%', height: '18rem' }}>
            <div className="dropdown__body">
              {regions}
            </div>
          </Scrollbars>
        </div>
      }
    </div>
  );
};

export default Searchbar;