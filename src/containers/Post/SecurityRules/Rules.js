import React from 'react';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import Specifications from '../../../components/Specs/Specifications';
import { GoCheck } from 'react-icons/go';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { BsPlus } from 'react-icons/bs';
import { FaKeycdn } from 'react-icons/fa';

const Rules = ({ data, setData }) => {
  
  const onAddRemoveRule = (rule) => {
    let newList = [ ...data.rules ];

    if (newList.includes(rule)) {
      newList = newList.filter(el => el !== rule);
    } else {
      newList.push(rule);
    }

    setData(p => ({
      ...p,
      rules: newList
    }));
  };

  const rules = [];
  const Rules = { ...Specifications('flex aic').rules };
  for (const [key, Element] of Object.entries(Rules)) {
    rules.push((
      <div 
        className="post__input input input--main" 
        key={key} 
        tabIndex="0"
        onClick={() => onAddRemoveRule(key)}>
          <Element />
          <div className="input__checkbox-wrapper">
            <span className="input__checkbox filters__checkbox">
              {data.rules.includes(key) && <GoCheck className="icon--xs icon--green" />}
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
          {/* <button className="post__btn">
            <BsPlus className="icon--mid icon--dark" />
          </button> */}
        </Scrollbar>
      </div>
    </>
  );
};

export default React.memo(Rules);
