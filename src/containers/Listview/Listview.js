import React, { useState } from 'react';
import { useParams } from 'react-router';

import './Listview.scss';
import Filters from './Filters/Filters';
import Card from './Card/Card';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';

const Listview = () => {
  const [slide, setSlide] = useState(false);
  const params = useParams();

  return (
    <main className="listview">
      <Filters slide={slide} onSlide={() => setSlide(!slide)} />
      <div className="container">
        <div className="listview__content">
          <div className={`listview__container ${slide ? 'listview__container--expand' : ''}`}>
            <Breadcrumbs 
              items={[
                {
                  title: 'City',
                  path: `/${params.city}`,
                  active: false
                },
                {
                  title: 'Region',
                  path: `/${params.region}`,
                  active: true
                }
              ]} 
              white />
            <div className="mb-3 mt-2">
              <h6 className="heading heading--3 mb-5 c-black">Results</h6>
              <div className="f-lg c-grace">found 158 properties by filter</div>
            </div>
            <ul className="listview__list">
              <Card slide={slide} />
              <Card slide={slide} />
              <Card slide={slide} />
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Listview;
