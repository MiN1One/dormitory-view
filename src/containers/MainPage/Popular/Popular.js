import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { FcHome } from 'react-icons/fc'
import { useTranslation } from 'react-i18next';

import CardH from '../../../components/CardH/CardH';
import './Popular.scss';

const Popular = ({ data, activeRegion, setActiveRegion }) => {
  const { t } = useTranslation('regions');

  let cards = [], regions;
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
        {cards.length > 0 && (
          <div className="popular__head">
            <h2 className="heading heading--2 mb-3">Popular properties</h2>
            <div className="flex">
              {regions}
            </div>
          </div>
        )}
        <div className="popular__body">
          {cards.length > 0 
            ? (
              <>
                <div className="w-100 flex fwrap">
                  {cards}       
                </div>
                <Link to={`/${(data && activeRegion) && data[activeRegion].city}/${activeRegion && activeRegion}`} className="btn btn--cta btn--wide btn--arrow">
                  <span>
                    See all in {t(`regions:${(data && activeRegion) && data[activeRegion].city}.regions.${activeRegion && activeRegion}`)}
                  </span>
                  <HiArrowNarrowRight className="icon" />
                </Link>
              </>
            )
            : (
              <div className="popular__empty">
                <div className="popular__empty__content">
                  <div className="tc mb-2">
                    <div className="flex fdc aic jcc mb-1">
                      <FcHome className="popular__icon mb-15" />
                      Be the first to post your property
                    </div>
                    <div className="f-xl f-thin c-grace">
                      There are no popular properties yet
                    </div>
                  </div>
                  <Link to="/post/new" className="btn btn--primary btn--wide btn--arrow">
                    <span>
                      Start adding
                    </span>
                    <HiArrowNarrowRight className="icon icon--dark" />
                  </Link>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}

export default React.memo(Popular);