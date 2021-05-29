import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import useFetchData from '../../../hooks/useFetchData';

import CardH from '../../../components/CardH/CardH';
import './Popular.scss';

const Popular = () => {
  const { t } = useTranslation();
  const [activeRegion, setActiveRegion] = useState();
  const { data, error, loading, makeRequest } = useFetchData();

  useEffect(() => {
    makeRequest({
      url: '/apartments?project=price,imageCover,offers,region,city,_id,title',
      dataAt: ['data', 'docs']
    });
  }, [activeRegion, makeRequest]);

  const cards = data?.map((el, i) => <CardH data={el} key={i} />);

  return (
    <section className="popular">
      <div className="container">
        <div className="popular__head">
          <h2 className="heading heading--2 mb-3">Popular properties</h2>
          <div className="flex">
            <div tabIndex="0" className="tab-item tab-item--active">Tashkent</div>
            <div tabIndex="0" className="tab-item">Bukhara</div>
            <div tabIndex="0" className="tab-item">Andijan</div>
            <div tabIndex="0" className="tab-item">Sirdarya</div>
            <div tabIndex="0" className="tab-item">Samarkand</div>
          </div>
        </div>
        <div className="popular__body">
          <div className="w-100 flex fwrap">
            {cards}            
          </div>
          <Link to="/" className="btn btn--cta btn--wide btn--arrow">
            <span>See all in Tashkent</span>
            <HiArrowNarrowRight className="icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Popular;