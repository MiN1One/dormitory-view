import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineLogin } from 'react-icons/ai';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';

import './Navigation.scss';

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
            <Link to="/" className="mr-3">LOGO</Link>
            <div className="nav__input-wrapper">
              <input 
                className="input input--dark nav__input"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
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
              <IoIosSearch className="icon nav__icon" />
            </div>
          </div>
          <div className="flex">
            <Link to="/help" className="nav__link">Help</Link>
            <Link to="/myprofile/wishes" className="nav__link">Wish list</Link>
            {(user && user.token) 
              ? <Link to="/myprofile" className="nav__link">{user.name}</Link>
              : <Link to="/auth/login" className="nav__link">
                {/* <IoIosLogIn className="icon mr-5" /> */}
                <AiOutlineLogin className="icon mr-5" />
                Login
              </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;