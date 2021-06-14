import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import { IoSchoolOutline } from 'react-icons/io5';

import './Listview.scss';
import Filters from './Filters/Filters';
import Card from './Card/Card';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Pagination from '../../components/Pagination/Pagination';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import { parseQuery, sort } from '../../utilities/utils';
import { useTranslation } from 'react-i18next';
import useFetchData from '../../hooks/useFetchData';
import Spinner from '../../components/UI/Spinner/Spinner';
import { FcIdea } from 'react-icons/fc';

const 
  NUM_ITEMS_PER_VIEW = 2,
  PAGE_INTERVAL = 5;

const Listview = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation(['regions', 'translation']);

  const defaultFilters = useRef({
    facilities: {},
    ownership: undefined,
    price: {},
    bills: [],
    numberOfRooms: undefined,
    map: {
      city: params.city,
      region: params.region !== 'all' ? [params.region] : []
    }
  });

  const [filter, setFilter] = useState(defaultFilters.current);

  const diffMap = 
    (
      parseQuery('city') && 
      (parseQuery('city') !== defaultFilters.current.map.city)
    ) ||
    (
      parseQuery('region') && 
      (parseQuery('region').split(',').isEqual(defaultFilters.current.map.region))
    );

  const { data, loading, error, makeRequest } = useFetchData();
  const [newData, setNewData] = useState(null);
  
  const [slide, setSlide] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(parseQuery('page', location.search)) || 1);
  const [sortBy, setSortBy] = useState('-createdAt');

  // useEffect(() => {
  //   const query = location.search !== '?' ? location.search : '';

  //   history.replace(`/${filter.map.region}/${filter.map.city}${query}`);
  // }, [filter.map.region, filter.map.city, location.search, history]);

  useEffect(() => {
    let region = `?region[regex]=\\b(${filter.map.region.join('|')})\\b`;
    let city = filter.map.city !== 'all' ? `&city=${filter.map.city}` : '';

    // const page = parseQuery('page') ? `&page=${parseQuery('page')}` : '';
    
    let facilitiesQuery = '';
    for (const [key, val] of Object.entries(filter.facilities)) {
      facilitiesQuery = `${facilitiesQuery}&${key}[all]=${val[0]}`;
    }

    const priceFrom = filter.price.from ? `&price[from]=${filter.price.from}` : '';
    const priceTo = filter.price.to ? `&price[to]=${filter.price.to}` : '';
    const billsQuery = filter.bills.length > 0 ? `&bills[all]=${filter.bills.join(',')}` : '';
    const ownership = filter.ownership ? `&ownership=${filter.ownership}` : '';
    const numberOfRooms = filter.numberOfRooms ? `&numberOfRooms[all]=${filter.numberOfRooms}` : '';

    setTimeout(() => {
      makeRequest({
        url: `api/apartments${region}${city}${facilitiesQuery}${billsQuery}${priceFrom}${priceTo}${ownership}&project=price,_id,imageCover,city,region,ownership,title,createdAt&count=true&limit=${NUM_ITEMS_PER_VIEW}&page=${currentPage}${numberOfRooms}`,
        dataSecondary: 'numberOfDocuments',
        dataAt: ['data', 'docs']
      });
    }, 75);
  }, [
    makeRequest, 
    filter.facilities, 
    filter.map, 
    filter.price, 
    filter.ownership, 
    filter.bills,
    filter.numberOfRooms,
    currentPage,
  ]);

  useEffect(() => {
    if (data) {
      setNewData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const order = sortBy.charAt(0);
      const prop = [sortBy.substr(1)];

      if (prop[0] === 'price') prop.push(0);
      
      const sortedList = sort({
        list: data.data,
        property: prop, 
        order,
        isDate: prop[0] === 'createdAt'
      });

      setNewData(sortedList);
    }
  }, [data, sortBy]);

  console.log(filter);

  const items = newData?.map(el => {
    return <Card slide={slide} data={el} key={el._id} />
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
        filters={filter}
        defaultFilters={defaultFilters.current} />
      <div className="container">
        <div className="listview__content">
          <div className={`listview__container ${slide ? 'listview__container--expand' : ''}`}>
            <Breadcrumbs
              items={[
                {
                  title: t(`regions:${params.city}.title`),
                  path: `/${params.city}/all`,
                  active: params.region === 'all'
                },
                {
                  title: t(`regions:${params.city}.regions.${params.region}`),
                  path: `/${params.city}/${params.region}`,
                  active: params.region !== 'all'
                }
              ]} 
              white />
            <div className="mb-3 mt-2 flex aie jcsb w-100">
              <div className="listview__results">
                <h6 className="heading heading--3 mb-1 c-black">Results</h6>
                <div className="f-xl c-grey mb-5">
                  for {t(`regions:${params.city}.title`)}, {t(`regions:${params.city}.regions.${params.region}`)}
                </div>
                {(diffMap && filter.map.region.length > 0) && (
                  <div className="listview__cur-region">
                    Selected regions:&nbsp;
                    {filter.map.region.map(el => 
                      t(`regions:${filter.map.city}.regions.${el}`)
                    ).join(', ')}
                  </div>
                )}
                {data?.length > 0 && (
                  <div className="f-lg c-grey-l">
                    found {data.length} properties by filter
                  </div>
                )}
              </div>
              <Dropdown 
                title={t(`translation:utils.sort.${sortBy}`)}
                dropTitle={'Sort by:'}
                positionX="right"
                width="19rem"
                height={15}
                items={[
                  {
                    title: t('translation:utils.sort.+createdAt'),
                    click: () => setSortBy('+createdAt'),
                    active: sortBy === '+createdAt'
                  },
                  {
                    title: t('translation:utils.sort.-createdAt'),
                    click: () => setSortBy('-createdAt'),
                    active: sortBy === '-createdAt'
                  },
                  {
                    title: t('translation:utils.sort.+price'),
                    click: () => setSortBy('+price'),
                    active: sortBy === '+price'
                  },
                  {
                    title: t('translation:utils.sort.-price'),
                    click: () => setSortBy('-price'),
                    active: sortBy === '-price'
                  }
                ]} />
            </div>
            {!newData || newData?.length === 0
              ? (
                <div className="listview__empty">
                  <div className="listview__empty__content">
                    <div className="flex fdc aic mb-2">
                      <FcIdea className="listview__empty__icon" />
                      No properties found within this filter
                    </div>
                    <div className="flex">
                      <button className="btn--white listview__empty__btn mr-1" onClick={() => setFilter(defaultFilters)}>
                        Clear filters
                      </button>
                      <button className="btn--white listview__empty__btn">
                        <IoSchoolOutline className="icon mr-1" />
                        Post enquiry
                      </button>
                    </div>
                  </div>
                </div>
              )
              : (
                <ul className="listview__list">
                  {loading ? <Spinner /> : items}
                </ul>
              )
            }
            {data?.numberOfDocuments > NUM_ITEMS_PER_VIEW && (
              <Pagination 
                onChange={setCurrentPage}
                itemsCount={data.numberOfDocuments}
                interval={PAGE_INTERVAL}
                currentPage={currentPage}
                itemsPerView={NUM_ITEMS_PER_VIEW} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Listview;
