import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Scrollspy from 'react-scrollspy';

import './SpyNavigation.scss';

const SpyNavigation = ({ onUpdate, offset, items, children }) => {
  const location = useLocation();
  const [noNav, setNoNav] = useState(false);

  useEffect(() => {
    if (location.hash !== '#') {
      const el = document.getElementById(location.hash.substr(1));

      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }

  }, [location.hash, offset]);
  
  useEffect(() => {
    const nav = document.querySelector('.nav');
    if (nav && nav.classList.contains('nav--none')) {
      setNoNav(true);
    }
  }, []);

  return (
    <div className={`snav ${noNav ? 'snav--top' : ''}`}>
      <div className="container">
        <div className="flex aic jcsb">
          <Scrollspy 
            onUpdate={onUpdate}
            offset={offset}
            className="snav__list"
            items={items}
            currentClassName="tab-item--active">
              {items.map((el, i) => (
                <li className="snav__item tab-item" key={i}>
                  <Link to={`${location.pathname}#${el}`}>
                    {el}
                  </Link>
                </li>
              ))}
          </Scrollspy>
          {children}
        </div>
      </div>
    </div>
  );
}

export default SpyNavigation;
