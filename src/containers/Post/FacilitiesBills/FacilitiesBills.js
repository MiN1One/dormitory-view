import React from 'react';

import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import Specifications from '../../../components/Specs/Specifications';
import { GoCheck } from 'react-icons/go';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { BiDollar } from 'react-icons/bi';

const FcilitiesBills = () => {

  return (
    <div className="post__section" id="facilitiesandbills">
      <div className="container">
        <div className="post__section__item">
          <div className="post__list-wrapper">
            <Facilities />
          </div>
          <div className="post__list-wrapper">
            <Bills />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FcilitiesBills;

const Facilities = () => {
  const facilities = [];
  const Facilities = { ...Specifications('flex aic').facilities };
  delete Facilities.others;
  for (const [key, val] of Object.entries(Facilities)) {
    facilities.push((
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
        Facilities
      </div>
      <div className="post__list">
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          {facilities}
        </Scrollbar>
      </div>
    </>
  );
};

const Bills = () => {
  const bills = [];
  const Bills = { ...Specifications('flex aic').bills };
  for (const [key, val] of Object.entries(Bills)) {
    bills.push((
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
        <BiDollar className="icon--mid icon--green mr-1" />
        Bills
      </div>
      <div className="post__list">
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          {bills}
        </Scrollbar>
      </div>
    </>
  );
};