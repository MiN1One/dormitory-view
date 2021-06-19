import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosSearch, IoIosClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import Scrollbar from '../UI/Scrollbar/Scrollbar';
import useFetchData from '../../hooks/useFetchData';
import useFindRegions from '../../hooks/useFindRegions';
import './NavSearchbar.scss';

const NavSearchbar = () => {
  const searchRef = useRef();
  const history = useHistory();
  const { t } = useTranslation(['regions']);
  const [focus, setFocus] = useState(false);
  const { popular } = useSelector(s => s.main);
  const { regions, onSearchForRegion } = useFindRegions({
    getBySearch: true,
    regionSearch: true
  });

  const onPerformSearch = (e) => {
    e.preventDefault();

    history.push(`/all/all?search=${searchRef.current.value}`);
  };

  const { data, makeRequest, setData } = useFetchData();
  
  const popularItems = popular && [...Object.keys(popular)].map((el) => (
    <div 
      className="navsearch__item" 
      key={el}
      onMouseDown={() => history.replace(`/${popular[el].city}/${el}`)}>
        {t(`regions:${popular[el].city}.regions.${el}`)}
        <span className="c-grey-l f-xs flex">{t(`regions:${popular[el].city}.title`)}</span>
    </div>
  ));

  const searchItems = data?.map((el) => (
    <div className="navsearch__item navsearch__item--full">
      <div className="navsearch__item__title">
        {el.title}
        <span className="f-xs c-grey-l">
          {t(`regions:${el.city}.regions.${el.region}`)}, {t(`regions:${el.city}.title`)}
        </span>
      </div>
      <div className="f-sm f-thin c-grey-l">
        from <span className="f-mid c-black"> ${el.price[0]} </span> / month
      </div>
    </div>
  ));

  const regionsEl = [];
  for (const [key, val] of Object.entries(regions)) {
    let el;
    if (val.regionOnly) {
      el = (
        <div 
          className="navsearch__item" 
          key={key} 
          onMouseDown={() => history.replace(`/${val.city}/${key}`)}>
            {t(`regions:${val.city}.regions.${key}`)}
            <span className="c-grey-l f-xs flex">{t(`regions:${val.city}.title`)}</span>
        </div>
      )
    } else {
      el = (
        <div 
          className="navsearch__item" 
          key={key} 
          onMouseDown={() => history.replace(`/${key}/all`)}>
            {t(`regions:${key}.title`)}
        </div>
      );
    }

    regionsEl.push(el);
  }

  return (
    <form className="navsearch" onSubmit={onPerformSearch}>
      <div className="w-100 pos-rel">
        <input 
          className="navsearch__input"
          type="text"
          placeholder="Search"
          ref={searchRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => {
            onSearchForRegion(e.target.value);
            if (e.target.value.length >= 2) {
              setTimeout(() => {
                makeRequest({
                  url: `api/apartments?search=${e.target.value}&project=price,_id,region,city,imageCover,title`,
                  dataAt: ['data', 'docs']
                });
              }, 75);
            } else if (e.target.value === '') {
              setData(null);
            }
          }} />
        <button 
          type="button"
          className="navsearch__btn-clear" 
          onClick={() => {
            searchRef.current.value = '';
            setData(null);
            onSearchForRegion('');
          }}>
            <IoIosClose className="icon--sm icon--grey" />
        </button>
      </div>
      <button 
        type="submit" 
        className="navsearch__btn">
          Search
      </button>
      {focus && (
        <div className="navsearch__dropdown">
          <Scrollbar style={{ width: '100%', height: '25rem' }}>
            <div className="navsearch__dropdown__body">
              {data || regionsEl.length > 0 
                ? (
                  <>
                    {searchItems}
                    {regionsEl}
                  </>
                )
                : popularItems
              }
            </div>
          </Scrollbar>
          <div className="navsearch__dropdown__head">
            <h6 className="heading heading--6">
              {data || regionsEl.length > 0
                ? 'Search results'
                : 'Popular regions'
              }
            </h6>
          </div>
        </div>
      )}
      <IoIosSearch className="icon navsearch__icon icon--dark" />
    </form>
  );
}

export default React.memo(NavSearchbar);