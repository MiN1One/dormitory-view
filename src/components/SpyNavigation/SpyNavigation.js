import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Scrollspy from 'react-scrollspy';

import './SpyNavigation.scss';

const SpyNavigation = ({ onUpdate, offset, items, children }) => {
  const location = useLocation();

  return (
    <div className="snav">
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