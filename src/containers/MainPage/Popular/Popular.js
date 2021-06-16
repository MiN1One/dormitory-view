import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

import CardH from '../../../components/CardH/CardH';
import './Popular.scss';

const Popular = ({ data, activeRegion, setActiveRegion }) => {
  const { t } = useTranslation('regions');

  let cards = null, regions = null;
  if (data && activeRegion) {
    regions = [...Object.keys(data)].map((el, i) => (
      <div 
        key={i}
        tabIndex="0" 
        onClick={() => setActiveRegion(el)}
        className={`tab-item ${el === activeRegion ? 'tab-item--active' : ''}`}>
          {t(`regions:${data[el].city}.regions.${el}`)}
      </div>
    ));
  
    cards = data[activeRegion].data.map((el, i) => <CardH data={el} key={i} />);
  }

  return (
    <section className="popular">
      <div className="container">
        <div className="popular__head">
          <h2 className="heading heading--2 mb-3">Popular properties</h2>
          <div className="flex">
            {regions}
          </div>
        </div>
        <div className="popular__body">
          <div className="w-100 flex fwrap">
            {cards}            
          </div>
          <Link to={`/${(data && activeRegion) && data[activeRegion].city}/${activeRegion && activeRegion}`} className="btn btn--cta btn--wide btn--arrow">
            <span>See all in {t(`regions:${(data && activeRegion) && data[activeRegion].city}.regions.${activeRegion && activeRegion}`)}</span>
            <HiArrowNarrowRight className="icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Popular);