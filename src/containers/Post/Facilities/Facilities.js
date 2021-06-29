import React from 'react';

import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import Specifications from '../../../components/Specs/Specifications';

const Facilities = ({ data, setData }) => {
  const facilities = [];
  const Facilities = { ...Specifications('flex aic').facilities };
  delete Facilities.others;
  for (const [key, Element] of Object.entries(Facilities)) {
    facilities.push((
      <div 
        className="post__input input input--main" 
        key={key} 
        tabIndex="0"
        onClick={() => {
          // setData(p => {
          //   let facilities = [ ...p.facilities ];

          //   if (facilities.includes(key)) {
          //     facilities = facilities.filter(el => el !== key);
          //   } else {
          //     facilities = [...facilities, key];
          //   }

          //   return {
          //     ...p,
          //     facilities
          //   }
          // });
        }}>
          <Element />
          <div className="input__checkbox-wrapper">
            <span className="input__checkbox filters__checkbox">
              {/* {data.facilities.includes(key) && <GoCheck className="icon--xs icon--green" />} */}
            </span>
          </div>
      </div>
    ));
  }

  return (
    <div className="post__list post__list--sm">
      <Scrollbar style={{ width: '100%', height: '100%' }}>
        {facilities}
      </Scrollbar>
    </div>
  );
};

export default Facilities;
