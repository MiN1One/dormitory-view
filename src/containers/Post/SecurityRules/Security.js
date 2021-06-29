import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import Specifications from '../../../components/Specs/Specifications';
import { GoCheck } from 'react-icons/go';
import { RiLock2Line } from 'react-icons/ri';
import React from 'react';

const Security = ({ data, setData }) => {
  const security = [];
  const Security = { ...Specifications('flex aic').security };
  for (const [key, Element] of Object.entries(Security)) {
    security.push((
      <div 
        className="post__input input input--main" 
        key={key} 
        tabIndex="0"
        onClick={() => {
          let newList = [ ...data.security ];
          if (newList.includes(key)) {
            newList = newList.filter(el => el !== key);
          } else {
            newList.push(key);
          }

          setData(p => ({
            ...p,
            security: newList
          }));
        }}>
          <Element />
          <div className="input__checkbox-wrapper">
            <span className="input__checkbox filters__checkbox">
              {data.security.includes(key) && <GoCheck className="icon--xs icon--green" />}
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

export default React.memo(Security);