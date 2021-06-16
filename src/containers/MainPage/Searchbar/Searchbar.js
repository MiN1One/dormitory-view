import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoLocation } from 'react-icons/go';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import { IoChevronForward } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import useFetchData from '../../../hooks/useFetchData';
import useFindRegions from '../../../hooks/useFindRegions';

const Searchbar = ({ animate, setAnimate, data: popular }) => {
  const [search, setSearch] = useState('');
  const { t } = useTranslation('regions');
  const history = useHistory();
  
  const { onSearchForRegion, regions } = useFindRegions({
    getBySearch: true,
    regionSearch: true
  });

  const { data, makeRequest, loading } = useFetchData();

  const classes = ['header__searchbar'];
  if (animate)
    classes.push('header__searchbar--animate');

  const items = [];
  for (let key in regions) {
    let el;
    if (regions[key].regionOnly) {
      el = (
        <li
          tabIndex="0"
          className="header__searchbar__item" 
          key={key}
          onMouseDown={() => history.push(`/${regions[key].city}/${key}`)}>
            <div className="flex fdc">
              {t(`regions:${regions[key].city}.regions.${key}`)}
              <span className="c-grey-l mt-5"> {t(`regions:${regions[key].city}.title`)}</span>
            </div>
            <IoChevronForward className="icon--xs" />
        </li>
      );
    } else {
      el = (
        <li
          tabIndex="0"
          className="header__searchbar__item" 
          key={key} 
          onMouseDown={() => history.push(`/${key}/all`)}>
            {t(`regions:${key}.title`)}
            <IoChevronForward className="icon--xs" />
        </li>
      );
    }

    items.push(el);
  }

  const popularItems = popular && [...Object.keys(popular)].map((el, i) => (
    <li
      tabIndex="0"
      className="header__searchbar__item" 
      key={i}
      onMouseDown={() => history.push(`/${popular[el].city}/${el}`)}>
        <div className="flex fdc">
          {t(`regions:${popular[el].city}.regions.${el}`)}
          <span className="c-grey-l mt-5"> {t(`regions:${popular[el].city}.title`)}</span>
        </div>
        <IoChevronForward className="icon--xs" />
    </li>
  ));
 
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
                // makeRequest({
                //   url: `api/apartments`,
                //   dataAt: ['data', 'docs']
                // });
              }}
              value={search} />
            <button 
              onMouseDown={() => {
                setSearch('');
                onSearchForRegion('');
              }}
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
                <div className="header__searchbar__title">
                  {(data || items.length > 0) 
                    ? 'Search results' 
                    : (
                      <>
                        <GoLocation className="icon--sm mr-1 icon--grey" />
                        Popular regions
                      </>
                    )
                  }
                </div>
                <ul className="header__searchbar__list">
                  {(data || items.length > 0) 
                    ? (data ? data : items)
                    : popularItems
                  }
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
