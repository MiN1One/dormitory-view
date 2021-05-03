import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosSearch } from 'react-icons/io';
import { CgChevronDown } from 'react-icons/cg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';

import './Navigation.scss';
import { VscSignIn } from 'react-icons/vsc';

const Navigation = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { user } = useSelector(state => state.user);
  const [scroll, setScroll] = useState(0);
  const [search, setSearch] = useState('');

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
    if (scroll > 500) {
      className = 'nav--active';
    }
  } else {
    className = 'nav--static';
  }

  const regions = regionsList.map((el, i) => (
    <div className="dropdown__item" key={i} onMouseDown={() => history.replace(`/${el}`)}>
      {el}
      <span className="c-grey-l f-sm flex">{el}</span>
    </div>
  ));

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
                onChange={(e) => setSearch(e.target.value)} />
              <button type="submit" className="nav__btn nav__btn--search">Search</button>
              <div className="nav__dropdown">
                <Scrollbars style={{ width: '100%', height: '25rem' }}>
                  <div className="dropdown__body">
                    {regions}
                  </div>
                </Scrollbars>
                <div className="dropdown__head">
                  <h6 className="heading heading--6">Popular regions</h6>
                </div>
              </div>
              <IoIosSearch className="icon nav__icon icon--dark" />
            </form>
          </div>
          <div className="flex h-100">
            <Link to="/" className="nav__link">
              <CgChevronDown className="icon--sm icon--yellow mr-5" />
              Help
            </Link>
            {(user && user.token) 
              ? <Link to="/myprofile" className="nav__btn">{user.name}</Link>
              : <Link to="/auth/login" className="nav__link">
                  <VscSignIn className="icon icon--yellow mr-5" />
                  Signin
              </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;