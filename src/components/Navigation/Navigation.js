import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { BsFillPersonFill, BsFolder } from 'react-icons/bs';
import { IoChevronDownOutline } from 'react-icons/io5';
import { VscSignIn } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

import config from '../../config';
import './Navigation.scss';
import Dropdown from '../UI/Dropdown/Dropdown';
import NavSearchbar from '../NavSearchbar/NavSearchbar';

const Navigation = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { user, favorites } = useSelector(state => state.user);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => setScroll(document.documentElement.scrollTop);
      document.addEventListener('scroll', handleScroll);
      return () => document.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname]);

  if (location.pathname === '/') {
    className = 'nav--hide';
    if (scroll > (window.innerHeight - window.innerHeight * 20 / 100)) {
      className = 'nav--active';
    }
  } else if (location.pathname.includes('/post/')) {
    className = 'nav--none';
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
              title={(
                <>
                  <IoChevronDownOutline className="icon--xs icon--grey ml-5" />
                  <span className="inline">Help</span>
                </>
              )}
              className="nav__link nav__link--drop"
              dropTitle="Help"
              noIcon
              items={config.HELP_SECTIONS.map(el => ({
                title: t(`nav.${el}`),
                click: () => history.push(`/help#${el}`)
              }))} />
            {user
              ? (
                <>
                  <Link to="/user/myprofile/favorites" className="nav__link">
                    <BsFolder className="icon--sm icon--yellow mr-1" />
                    Favorites
                    <span className="nav__badge">{favorites?.length || 0}</span>
                  </Link>
                  <Link to="/users/myprofile/" className="nav__link nav__link--user">
                    PROFILE
                    <BsFillPersonFill className="icon--white icon ml-5" />
                    {/* <span className="nav__badge">0</span> */}
                  </Link>
                </>
              )
              : (
                <Link
                  to={{
                    pathname: '/auth/signin',
                    state: { ...location }
                  }}
                  className="nav__link">
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