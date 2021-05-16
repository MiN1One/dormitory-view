import React from 'react';
import { FcMediumPriority } from 'react-icons/fc';
import { Link } from 'react-router-dom';

import './ErrorView.scss';

const ErrorView = () => {
  return (
    <div className="e">
      <div className="e__content">
        <FcMediumPriority className="e__icon" />
        <div className="flex aic">
          <div className="flex fdc aic">
            <div className="mb-15">
              <h1 className="e__heading heading heading--1">Page is not found</h1>
              <div className="f-xl c-grace mb-1">Please make sure, you have entered right address</div>
            </div>
            <div className="flex">
              <Link to="/" className="btn btn--primary mr-1">Home</Link>
              <button className="btn btn--cta">Help</button>
            </div>
          </div>
        </div>
      </div>
      <ul className="e__list">
        <li className="e__item">
          <Link to="/">Tashkent</Link>
        </li>
        <li className="e__item">
          <Link to="/">Andijan</Link>
        </li>
        <li className="e__item">
          <Link to="/">Termez</Link>
        </li>
        <li className="e__item">
          <Link to="/">Bukhara</Link>
        </li>
        <li className="e__item">
          <Link to="/">Fergana</Link>
        </li>
        <li className="e__item">
          <Link to="/">Samarkand</Link>
        </li>
        <li className="e__item">
          <Link to="/">Sirdarya</Link>
        </li>
        <li className="e__item">
          <Link to="/">Namangan</Link>
        </li>
        <li className="e__item">
          <Link to="/">Navoi</Link>
        </li>
        <li className="e__item">
          <Link to="/">Jizzakh</Link>
        </li>
      </ul>
      {/* <form className="e__form">
        <input className="input input--main e__input" placeholder="Search" type="text" />
        <button className="btn btn--cta e__btn">Search</button>
      </form> */}
    </div>
  );
};

export default React.memo(ErrorView);
