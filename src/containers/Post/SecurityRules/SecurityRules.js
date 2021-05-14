import React from 'react';

import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import Specifications from '../../../components/Specs/Specifications';
import { GoCheck } from 'react-icons/go';
import { RiLock2Line } from 'react-icons/ri';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { BsPlus } from 'react-icons/bs';

const SecurityRules = () => {
  return (
    <div className="post__section" id="securityandrules">
      <div className="container">
        <div className="post__section__item">
          <div className="post__list-wrapper">
            <Security />
          </div>
          <div className="post__list-wrapper">
            <Rules />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityRules;

const Security = () => {
  const security = [];
  const Security = { ...Specifications('flex aic').security };
  for (const [key, val] of Object.entries(Security)) {
    security.push((
      <div className="post__input input input--main" key={key} tabIndex="0">
        {val()}
        <div className="input__checkbox-wrapper">
          <span className="input__checkbox filters__checkbox">
            <GoCheck className="icon--xs icon--green" />
          </span>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="post__title post__title--lg">
        <RiLock2Line className="icon--mid icon--green mr-1" />
        Security
      </div>
      <div className="post__list">
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          {security}
        </Scrollbar>
      </div>
    </>
  );
};

const Rules = () => {
  const rules = [];
  const Rules = { ...Specifications('flex aic').rules };
  for (const [key, val] of Object.entries(Rules)) {
    rules.push((
      <div className="post__input input input--main" key={key} tabIndex="0">
        {val()}
        <div className="input__checkbox-wrapper">
          <span className="input__checkbox filters__checkbox">
            <GoCheck className="icon--xs icon--green" />
          </span>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="post__title post__title--lg">
        <GiForkKnifeSpoon className="icon--mid icon--green mr-1" />
        Rules
      </div>
      <div className="post__list">
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          {rules}
          <button className="post__btn">
            <BsPlus className="icon--mid icon--dark" />
          </button>
        </Scrollbar>
      </div>
    </>
  );
};
