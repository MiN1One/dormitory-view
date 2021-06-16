import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosSearch } from 'react-icons/io';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { BsPerson, BsStar } from 'react-icons/bs';
import { VscSignIn } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

import './Navigation.scss';
import Dropdown from '../UI/Dropdown/Dropdown';
import Scrollbars from '../UI/Scrollbar/Scrollbar';
import useFindRegions from '../../hooks/useFindRegions';
import useFetchData from '../../hooks/useFetchData';

const Navigation = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const {
    user: { user, favorites }, 
    main: { popular }
  } = useSelector(state => state);
  const [scroll, setScroll] = useState(0);
  const [search, setSearch] = useState('');

  const { regions, onSearchForRegion } = useFindRegions({
    getBySearch: true,
    regionSearch: true
  });

  const { data, makeRequest } = useFetchData();
  
  const handleScroll = useCallback(() => {
    setScroll(document.documentElement.scrollTop);
  }, []);
  
  useEffect(() => {
    if (location.pathname === '/') {
      document.addEventListener('scroll', handleScroll);
      return () => document.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, location.pathname]);

  if (location.pathname === '/') {
    className = 'nav--hide';
    if (scroll > (window.innerHeight - window.innerHeight * 20 / 100)) {
      className = 'nav--active';
    }
  } else {
    className = 'nav--sticky';
  }

  const popularItems = popular && [...Object.keys(popular)].map((el) => (
    <div 
      className="dropdown__item" 
      key={el}
      onMouseDown={() => history.replace(`/${popular[el].city}/${el}`)}>
        {t(`regions:${popular[el].city}.regions.${el}`)}
        <span className="c-grey-l f-xs flex">{t(`regions:${popular[el].city}.title`)}</span>
    </div>
  ));

  const regionsEl = [];
  for (const [key, val] of Object.entries(regions)) {
    let el;
    if (val.regionOnly) {
      el = (
        <div 
          className="dropdown__item" 
          key={key} 
          onMouseDown={() => history.replace(`/${val.city}/${key}`)}>
            {t(`regions:${val.city}.regions.${key}`)}
            <span className="c-grey-l f-xs flex">{t(`regions:${val.city}.title`)}</span>
        </div>
      )
    } else {
      el = (
        <div 
          className="dropdown__item" 
          key={key} 
          onMouseDown={() => history.replace(`/${key}/all`)}>
            {t(`regions:${key}.title`)}
        </div>
      );
    }

    regionsEl.push(el);
  }

  return (
    <nav role="navigation" className={`nav ${className ? className : ''}`}>
      <div className="container">
        <div className="nav__content">
          <div className="flex aic">
            <Link to="/" className="mr-3 c-black">LOGO</Link>
            <form className="nav__form">
              <input 
                className="nav__input"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  onSearchForRegion(e.target.value);
                }} />
              <button type="submit" className="nav__btn nav__btn--search">Search</button>
              <div className="nav__dropdown">
                <Scrollbars style={{ width: '100%', height: '25rem' }}>
                  <div className="dropdown__body">
                    {data || regionsEl.length > 0 
                      ? (data ? data : regionsEl)
                      : popularItems
                    }
                  </div>
                </Scrollbars>
                <div className="dropdown__head">
                  <h6 className="heading heading--6">
                    {data || regionsEl.length > 0
                      ? 'Search results'
                      : 'Popular regions'
                    }
                  </h6>
                </div>
              </div>
              <IoIosSearch className="icon nav__icon icon--dark" />
            </form>
          </div>
          <div className="flex h-100">
            <Dropdown
              title={<span className="inline ml-5">Help</span>}
              className="nav__link nav__link--drop"
              dropTitle="Help"
              items={[
                {
                  title: 'About',
                  click: () => history.push('/help#about')
                },
                {
                  title: 'Book',
                  click: () => history.push('/help#book')
                },
                {
                  title: 'Refund',
                  click: () => history.push('/help#refund')
                }
              ]} />
            {user?.token 
              ? (
                <>
                  <Link to="/myprofile" className="nav__link ml-1">
                    <BsStar className="icon--sm icon--yellow mr-5" />
                    Favorites
                    <span className="nav__badge">{favorites.length}</span>
                  </Link>
                  <Link to="/myprofile" className="nav__link nav__link--user ml-1">
                    <BsPerson className="icon icon--tertiary mr-5" />
                    {user.name}
                    {/* <span className="nav__badge">0</span> */}
                  </Link>
                </>
              )
              : (
                <Link to="/auth/login" className="nav__link ml-1">
                  <VscSignIn className="icon icon--yellow mr-5" />
                  Signin
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;