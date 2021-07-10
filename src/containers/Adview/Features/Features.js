import React from 'react';
import Specifications from '../../../components/Specs/Specifications';

const Features = ({ data, activeOption }) => {

  const specs = Specifications('adview__specs-item');

  const facilityItems = []; 
  for (const [key, El] of Object.entries(specs.facilities)) {
    if (data && data.roomOptions[activeOption][key]) {
      facilityItems.push(<El key={key} />);
    }
  }

  const security = data?.security.map((el, i) => {
    const Security = specs.security[el];
    return Security && <Security key={i} />;
  });

  const bills = data?.bills.map((el, i) => {
    const Bill = specs.bills[el];
    return Bill && <Bill key={i} />;
  });
  
  const places = data?.places.map((el, i) => {
    const Place = specs.places[el];
    return Place && <Place key={i} />;
  });

  const rules = data?.rules.map((el, i) => {
    const Rule = specs.rules[el];
    return Rule && <Rule key={i} />;
  });

  return (
    <div id="features">
      <div className="adview__specs-wrapper" >
        <h5 className="heading heading--5 c-black mb-3">
          Facilites&nbsp;&nbsp;
          <span className="f-light c-grace f-xl">
            Room option {activeOption + 1}
          </span>
        </h5>
        {/* <div className="f-mid-w c-black mb-15"></div> */}
        <div className="adview__specs-list">
          {facilityItems}
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
