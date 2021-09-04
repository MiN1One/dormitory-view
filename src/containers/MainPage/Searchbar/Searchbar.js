import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { GoLocation } from 'react-icons/go';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import { IoChevronForward } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import useFetchData from '../../../hooks/useFetchData';
import useFindRegions from '../../../hooks/useFindRegions';
import img from '../../../assets/images/dan-gold-4HG3Ca3EzWw-unsplash.jpg';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';

const Searchbar = ({ animate, setAnimate, data: popular }) => {
  const { t } = useTranslation(['regions', 'translation']);
  const history = useHistory();
  const searchRef = useRef();
  const dispatch = useDispatch();

  const { onSearchForRegion, regions } = useFindRegions({
    getBySearch: true,
    regionSearch: true
  });

  const { data, makeRequest, loading, setData } = useFetchData();

  const classes = ['header__searchbar'];
  if (animate)
    classes.push('header__searchbar--animate');

  const onPerformSearch = (e) => {
    e.preventDefault();

    if (searchRef.current.value !== '') {
      dispatch(actions.setSearch(searchRef.current.value));
      history.replace(`/list/all/all?search=${searchRef.current.value}`);
    }
  };

  const onInputSearch = (e) => {
    onSearchForRegion(e.target.value);
    if (e.target.value.length >= 2) {
      setTimeout(() => {
        makeRequest({
          url: `api/apartments?search=${e.target.value}&project=_id,title,imageCover,city,region,price`,
          dataAt: ['data', 'docs']
        });
      }, 75);
    } else if (e.target.value < 2 || e.target.value === '') {
      setData(null);
    }
  };

  const onClearSearch = () => {
    onSearchForRegion('');
    searchRef.current.value = '';
    setData(null);
  };

  const regionItems = [];
  for (let key in regions) {
    let regionSearchItem;
    if (regions[key].regionOnly) {
      regionSearchItem = (
        <li
          tabIndex="0"
          className="header__searchbar__item" 
          key={key}
          onMouseDown={() => history.push(`/list/${regions[key].city}/${key}`)}>
            <div className="flex fdc">
              {t(`regions:${regions[key].city}.regions.${key}`)}
              <span className="c-grey-l f-sm mt-5"> {t(`regions:${regions[key].city}.title`)}</span>
            </div>
            <IoChevronForward className="icon--xs" />
        </li>
      );
    } else {
      regionSearchItem = (
        <li
          tabIndex="0"
          className="header__searchbar__item" 
          key={key} 
          onMouseDown={() => history.push(`/list/${key}/all`)}>
            {t(`regions:${key}.title`)}
            <IoChevronForward className="icon--xs" />
        </li>
      );
    }

    regionItems.push(regionSearchItem);
  }

  const popularItems = popular && [...Object.keys(popular)].map((el, i) => (
    <li
      tabIndex="0"
      className="header__searchbar__item" 
      key={i}
      onMouseDown={() => history.push(`/list/${popular[el].city}/${el}`)}>
        <div className="flex fdc">
          {t(`regions:${popular[el].city}.regions.${el}`)}
          <span className="c-grey-l f-sm mt-5"> {t(`regions:${popular[el].city}.title`)}</span>
        </div>
        <IoChevronForward className="icon--xs" />
    </li>
  ));

  const searchItems = data?.map(el => (
    <li 
      className="header__searchbar__item" 
      tabIndex="0"
      key={el._id}
      onMouseDown={() => history.push(`/list/${el.city}/${el.region}/${el._id}`)}>
        <div className="flex aic">
          <figure className="header__searchbar__figure">
            <img className="img img--cover" src={img} alt={el.title} />
          </figure>
          <div className="flex fdc">
            {el.title}
            <span className="mt-5 f-sm c-grey-l">
              {t(`regions:${el.city}.regions.${el.region}`)}, {t(`regions:${el.city}.title`)}
            </span>
          </div>
        </div>
        <div className="header__searchbar__price">
          <span className="f-sm">from </span>
          ${el.price[0]}
          <span className="f-sm"> / month</span>
        </div>
    </li>
  ));

  return (
    <div className={classes.join(' ')}>
      <div className="container">
        <form className="header__searchbar__content" onSubmit={onPerformSearch}>
          <div className="pos-rel">
            <IoIosSearch className="header__searchbar__icon icon icon--grey" />
            <input 
              placeholder="Search by city, region, university name or by title"
              className="header__searchbar__input"
              type="text"
              onFocus={() => setAnimate(true)}
              onBlur={() => setAnimate(false)}
              ref={searchRef}
              onChange={onInputSearch} />
            <button 
              onMouseDown={onClearSearch}
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
                  {(data || regionItems.length > 0) 
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
                  {(data || regionItems.length > 0) 
                    ? (
                      <>
                        {regionItems}
                        {searchItems}
                      </>
                    )
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

export default React.memo(Searchbar);
