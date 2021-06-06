import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import useFindRegions from '../../../hooks/useFindRegions';

const Searchbar = ({ animate, setAnimate }) => {
  const [search, setSearch] = useState('');
  const { t } = useTranslation('regions');
  const { regions, onSearchForRegion } = useFindRegions();

  const classes = ['header__searchbar'];
  if (animate)
    classes.push('header__searchbar--animate');

  const items = [];
  console.log(regions);
  for (let key in regions) {
    if (search !== '' && regions.length > 0) {
      items.push((
        <li className="header__searchbar__item">
          {t(`regions:${key}.title`)}
        </li>
      ));
    }
  }

  return (
    <div className={classes.join(' ')}>
      <div className="container">
        <form className="header__searchbar__content">
          <div className="pos-rel">
            <IoIosSearch className="header__searchbar__icon icon icon--grey" />
            <input 
              placeholder="Search by city, region or university name"
              className="header__searchbar__input"
              type="text"
              onFocus={() => setAnimate(true)}
              onBlur={() => setAnimate(false)}
              onChange={(e) => {
                setSearch(e.target.value);
                onSearchForRegion(e.target.value);
              }}
              value={search} />
            <button 
              onMouseDown={() => setSearch('')}
              type="button" 
              className="header__searchbar__btn-search">
              <IoIosClose className="icon icon--grey" />
            </button>
          </div>
          <button type="submit" className="header__searchbar__btn">
            Search
          </button>
          {animate && (
            <div className="header__searchbar__drop">
              <Scrollbar style={{ height: '100%', width: '100%' }}>
                <div className="header__searchbar__title">Popular regions</div>
                <ul className="header__searchbar__list">
                  {items}
                </ul>
              </Scrollbar>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Searchbar;
