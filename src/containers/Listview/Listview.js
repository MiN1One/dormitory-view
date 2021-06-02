import React, { useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import useFetchData from '../../hooks/useFetchData';
import Spinner from '../../components/UI/Spinner/Spinner';
import { FcIdea } from 'react-icons/fc';

const Listview = () => {
  const params = useParams();
  const location = useLocation();
  const { t } = useTranslation(['regions']);
  
  const [filter, setFilter] = useState({
    facilities: {},
    price: {},
    bills: [],
    map: {
      city: params.city,
      region: [params.region]
    }
  });

  const { data, loading, error, makeRequest } = useFetchData();
  const [newData, setNewData] = useState(null);
  
  const [slide, setSlide] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(parseQuery('page', location.search)) || 1);
  const [sortBy, setSortBy] = useState({ val: '+date', title: 'Date (ascend)'});

  useEffect(() => {
    const region = (filter.map.region && filter.map.region !== 'all') 
      ? `?region[regex]=\\b(${filter.map.region.join('|')})\\b` : '';
    const city = (filter.map.city && filter.map.city !== 'all') 
      ? `&city=${filter.map.city}` : '';
    
    let facilitiesQuery = '';
    for (const [key, val] of Object.entries(filter.facilities)) {
      facilitiesQuery = `${facilitiesQuery}&${key}[all]=${val[0]}`;
    }

    const priceFrom = filter.price.from ? `&price[from]=${filter.price.from}` : '';
    const priceTo = filter.price.to ? `&price[to]=${filter.price.to}` : '';
    const billsQuery = filter.bills.length > 0 ? `&bills[all]=${filter.bills.join(',')}` : '';

    makeRequest({
      url: `/apartments${region}${city}${facilitiesQuery}${billsQuery}${priceFrom}${priceTo}&project=price,_id,imageCover,city,region,ownership`,
      dataAt: ['data', 'docs']
    });
  }, [makeRequest, filter]);

  useEffect(() => {
    function sortByPrice(a, b) {
      if (a.price[0] > b.price[0]) {
        return -1;
      } else if (a.price[0] < b.price[0]) {
        return 1;
      }
    }
    
    function sortByDate(a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      }
    }

    if (data) {
      let sortedData;
      if (sortBy === '-price' || sortBy === '+price') {
        sortedData = data?.sort(sortByPrice);
      } else if (sortBy === '-createdAt' || sortBy === '+createdAt') {
        sortedData = data?.sort(sortByDate);
      }

      setNewData(sortedData);
    }
  }, [sortBy, data]);

  console.log(currentPage);
  console.log(newData);
  console.log(data);
  console.log(filter);

  const items = data?.map((el, i) => {
    return <Card slide={slide} data={el} key={i} />
  });

  return (
    <main className="listview">
      <div className="listview__float">
        <div className="container">
          <Link to="/post/new" className="btn--pill">
            <BsPlus className="icon--mid mr-5" />
            New
          </Link>
        </div>
      </div>
      <Filters 
        slide={slide} 
        onSlide={() => setSlide(prev => !prev)}
        setFilters={(f) => setFilter(f)}
        filters={filter} />
      <div className="container">
        <div className="listview__content">
          <div className={`listview__container ${slide ? 'listview__container--expand' : ''}`}>
            <Breadcrumbs
              items={[
                {
                  title: t(`regions:${params.city}.title`),
                  path: `/${params.city}`,
                  active: false
                },
                {
                  title: t(`regions:${params.city}.regions.${params.region}`),
                  path: `/${params.region}`,
                  active: true
                }
              ]} 
              white />
            <div className="mb-3 mt-2 flex aie jcsb">
              <div className="">
                <h6 className="heading heading--3 mb-1 c-black">Results</h6>
                <div className="f-xl c-grey mb-5"> for {t(`regions:${params.city}.title`)}, {t(`regions:${params.city}.regions.${params.region}`)} district</div>
                {data?.length > 0 && (
                  <div className="f-lg c-grey-l">
                    found {data.length} properties by filter
                  </div>
                )}
              </div>
              <Dropdown 
                title={sortBy.title}
                dropTitle={'Sort by:'}
                positionX="right"
                width="17rem"
                height={15}
                items={[
                  {
                    title: 'Date (ascend)',
                    click: () => setSortBy({ val: '+date', title: 'Date (ascend)'}),
                    active: sortBy.val === '+createdAt'
                  },
                  {
                    title: 'Date (descend)',
                    click: () => setSortBy({ val: '-date', title: 'Date (descend)'}),
                    active: sortBy.val === '-createdAt'
                  },
                  {
                    title: 'Price (ascend)',
                    click: () => setSortBy({ val: '+price', title: 'Price (ascend)'}),
                    active: sortBy.val === '+price[0]'
                  },
                  {
                    title: 'Price (descend)',
                    click: () => setSortBy({ val: '-price', title: 'Price (descend)'}),
                    active: sortBy.val === '-price[0]'
                  }
                ]} />
            </div>
            <ul className="listview__list">
              {loading
                ? <Spinner />
                : (!data || data?.length === 0 
                    ? (
                      <div className="listview__empty">
                        <div className="listview__empty__alert">
                          <FcIdea className="icon--lg mr-1" />
                          No properties found with this filter
                        </div>
                      </div>
                    )
                    : items
                  )
              }
            </ul>
            {data?.length > 12 && (
              <Pagination 
                onChange={setCurrentPage}
                itemsCount={6}
                interval={6}
                currentPage={currentPage}
                itemsPerView={6} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Listview;
