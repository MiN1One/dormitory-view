import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';

import './Listview.scss';
import Filters from './Filters/Filters';
import Card from './Card/Card';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Pagination from '../../components/Pagination/Pagination';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import { parseQuery } from '../../utilities/utils';

const Listview = () => {
  const params = useParams();
  const location = useLocation();
  
  const [slide, setSlide] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(parseQuery('page', location.search)) || 1);
  const [sortBy, setSortBy] = useState({ val: '+date', title: 'Date (ascend)'});

  console.log(currentPage);

  return (
    <main className="listview">
      <div className="listview__float">
        <div className="container">
          <Link to="/post/new" className="listview__post-btn">
            <BsPlus className="icon--mid mr-5" />
            Post
          </Link>
        </div>
      </div>
      <Filters slide={slide} onSlide={() => setSlide(prev => !prev)} />
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
            <div className="mb-3 mt-2 flex aie jcsb">
              <div className="">
                <h6 className="heading heading--3 mb-5 c-black">Results</h6>
                <div className="f-lg c-grace">found 158 properties by filter</div>
              </div>
              <Dropdown 
                title={sortBy.title}
                dropTitle={'Sort by:'}
                positionX="right"
                width={'17rem'}
                height={15}
                items={[
                  {
                    title: 'Date (ascend)',
                    click: () => setSortBy({ val: '+date', title: 'Date (ascend)'}),
                    active: sortBy.val === '+date'
                  },
                  {
                    title: 'Date (descend)',
                    click: () => setSortBy({ val: '-date', title: 'Date (descend)'}),
                    active: sortBy.val === '-date'
                  },
                  {
                    title: 'Price (ascend)',
                    click: () => setSortBy({ val: '+price', title: 'Price (ascend)'}),
                    active: sortBy.val === '+price'
                  },
                  {
                    title: 'Price (descend)',
                    click: () => setSortBy({ val: '-price', title: 'Price (descend)'}),
                    active: sortBy.val === '-price'
                  }
                ]} />
            </div>
            <ul className="listview__list">
              <Card slide={slide} />
              <Card slide={slide} />
              <Card slide={slide} />
              <Card slide={slide} />
              <Card slide={slide} />
              <Card slide={slide} />
            </ul>
            <Pagination 
              onChange={setCurrentPage}
              itemsCount={6}
              interval={6}
              currentPage={currentPage}
              itemsPerView={6} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Listview;
