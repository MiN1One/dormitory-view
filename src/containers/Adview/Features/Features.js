import React from 'react';
import Specifications from '../../../components/Specs/Specifications';

const Features = ({ data }) => {

  const facilities = data.features.facilities.map((el, i) => {
    const Facility = Specifications('adview__specs-item').facilities[el];
    return Facility && <Facility key={i} />;
  });

  const security = data.features.security.map((el, i) => {
    const Security = Specifications('adview__specs-item').security[el];
    return Security && <Security key={i} />;
  });

  const others = Specifications('adview__specs-item').facilities.others(data.features.others);

  const bills = data.features.bills.map((el, i) => {
    const Bill = Specifications('adview__specs-item').bills[el];
    return Bill && <Bill key={i} />;
  });
  
  const places = data.features.places.map((el, i) => {
    const Place = Specifications('adview__specs-item').places[el];
    return Place && <Place key={i} />;
  });

  const rules = data.features.rules.map((el, i) => {
    const Rule = Specifications('adview__specs-item').rules[el];
    return Rule && <Rule key={i} />;
  });

  return (
    <div id="features">
      <div className="adview__specs-wrapper" >
        <h5 className="heading heading--5 c-black mb-3">Facilites:</h5>
        <div className="adview__specs-list">
          {facilities}
          {others}
        </div>
      </div>
      <div className="adview__specs-wrapper">
        <h5 className="heading heading--5 c-black mb-3">Security and safety:</h5>
        <div className="adview__specs-list">{security}</div>
      </div>
      <div className="adview__specs-wrapper">
        <h5 className="heading heading--5 c-black mb-3">Rules:</h5>
        <div className="adview__specs-list">{rules}</div>
      </div>
      <div className="adview__specs-wrapper">
        <h5 className="heading heading--5 c-black mb-3">Included Bills:</h5>
        <div className="adview__specs-list">{bills}</div>
      </div>
      <div className="adview__specs-wrapper">
        <h5 className="heading heading--5 c-black mb-3">Nearby places:</h5>
        <div className="adview__specs-list">{places}</div>
      </div>
    </div>
  );
}

export default Features;
