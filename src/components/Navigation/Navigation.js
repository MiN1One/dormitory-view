import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosSearch } from 'react-icons/io';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';

import './Navigation.scss';

const Navigation = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  
  const [search, setSearch] = useState('');
  const [scroll, setScroll] = useState(0);

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
    if (scroll > window.innerHeight) {
      className = 'nav--active';
    }
  }

  const regions = regionsList.map((el, i) => (
    <div className="dropdown__item" key={i} onMouseDown={() => history.replace(`/${el}`)}>
      {el}
      <span className="c-grey-l f-sm flex">{el}</span>
    </div>
  ));

  return (
    <nav role="navigation" className={`nav ${className ? className : ''}`}>
      <div className="flex aic">
        <Link to="/" className="mr-3">LOGO</Link>
        <div className="nav__input-wrapper">
          <input 
            className="input input--dark nav__input"
            type="text"
            placeholder={t('main.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
          <div className="nav__dropdown">
            <div className="dropdown__head">
              <h6 className="heading heading--6">{t('nav.popular regions')}</h6>
            </div>
            <Scrollbars style={{ width: '100%', height: '25rem' }}>
              <div className="dropdown__body">
                {regions}
              </div>
            </Scrollbars>
          </div>
          <IoIosSearch className="icon nav__icon" />
        </div>
      </div>
      <div className="flex">
        <Link to="/auth/login" className="nav__link">{t('nav.login')}</Link>
        <Link to="/help" className="nav__link">{t('nav.help')}</Link>
      </div>
    </nav>
  );
};

export default Navigation;