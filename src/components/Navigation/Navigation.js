import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { BsPerson, BsStar } from 'react-icons/bs';
import { VscSignIn } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

import './Navigation.scss';
import Dropdown from '../UI/Dropdown/Dropdown';
import NavSearchbar from '../NavSearchbar/NavSearchbar';

const Navigation = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { user, favorites } = useSelector(state => state.user);
  const [scroll, setScroll] = useState(0);

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

  return (
    <nav role="navigation" className={`nav ${className ? className : ''}`}>
      <div className="container">
        <div className="nav__content">
          <div className="flex aic">
            <Link to="/" className="mr-3 c-black">LOGO</Link>
            <NavSearchbar />
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

export default React.memo(Navigation);