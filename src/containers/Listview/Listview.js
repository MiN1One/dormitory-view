import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsPlus } from 'react-icons/bs';
import { IoSchoolOutline } from 'react-icons/io5';
import { FcIdea } from 'react-icons/fc';

import './Listview.scss';
import Filters from './Filters/Filters';
import Card from './Card/Card';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Pagination from '../../components/Pagination/Pagination';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import { parseQuery, sort } from '../../utilities/utils';
import useFetchData from '../../hooks/useFetchData';
import Spinner from '../../components/UI/Spinner/Spinner';

const 
  NUM_ITEMS_PER_VIEW = 12,
  PAGE_INTERVAL = 5;

const Listview = () => {
  const params = useParams();
  const location = useLocation();
  const { t } = useTranslation(['regions', 'translation']);

  const defaultFilters = useRef({
    facilities: {},
    ownership: undefined,
    price: {
      from: 0,
      to: 0
    },
    bills: [],
    numberOfRooms: undefined,
    map: {
      city: params.city,
      region: params.region !== 'all' ? [params.region] : []
    }
  });

  const [filter, setFilter] = useState(defaultFilters.current);

  const { data, loading, error, makeRequest } = useFetchData();

  const [newData, setNewData] = useState(null);
  
  const [slide, setSlide] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(parseQuery('page', location.search)) || 1);
  const [sortBy, setSortBy] = useState('-createdAt');
  const [currency, setCurrency] = useState({ val: 'usd', symbol: 'USD'});

  const diffMap = 
      filter.map.city !== defaultFilters.current.map.city || 
      !defaultFilters.current.map.region.isEqual(filter.map.region);

  useEffect(() => {
    let region = `?region[regex]=\\b(${filter.map.region.join('|')})\\b`;
    let city = filter.map.city !== 'all' ? `&city=${filter.map.city}` : '';
    
    let facilitiesQuery = '';
    for (const [key, val] of Object.entries(filter.facilities)) {
      facilitiesQuery = `${facilitiesQuery}&${key}[all]=${val[0]}`;
    }

    const 
      currencyQuery = currency !== 'usd' ? `&currency=${currency.val}` : '',
      priceFrom = filter.price.from ? `&price[from]=${filter.price.from}` : '',
      priceTo = filter.price.to ? `&price[to]=${filter.price.to}` : '',
      billsQuery = filter.bills.length > 0 ? `&bills[all]=${filter.bills.join(',')}` : '',
      ownership = filter.ownership ? `&ownership=${filter.ownership}` : '',
      numberOfRooms = filter.numberOfRooms ? `&numberOfRooms[all]=${filter.numberOfRooms}` : '';

    setTimeout(() => {
      makeRequest({
        url: `api/apartments${region}${city}${facilitiesQuery}${billsQuery}${priceFrom}${priceTo}${ownership}&project=price,_id,imageCover,city,region,ownership,title,createdAt&count=true&limit=${NUM_ITEMS_PER_VIEW}&page=${currentPage}${numberOfRooms}${currencyQuery}`,
        dataSecondary: 'numberOfDocuments',
        dataAt: ['data', 'docs']
      });
    }, 75);
  }, [
    makeRequest, 
    filter.facilities, 
    filter.map, 
    filter.price.from,
    filter.price.to, 
    filter.ownership, 
    filter.bills,
    filter.numberOfRooms,
    currentPage,
    currency
  ]);

  useEffect(() => {
    if (data) {
      setNewData(data.data);
    }
  }, [data]);

  const sortData = useCallback((list) => {
    const order = sortBy.charAt(0);
    const prop = [sortBy.substr(1)];

    if (prop[0] === 'price') prop.push(0);
    
    return sort({
      list: list,
      property: prop,
      order,
      isDate: prop[0] === 'createdAt'
    });
  }, [sortBy]);

  // SORTING
  useEffect(() => {
    data && setNewData(sortData(data.data));
  }, [data, sortBy, sortData]);

  console.log({
    filter,
    newData,
    data,
    sortBy,
    currency
  });

  const items = newData?.map(el => {
    return <Card slide={slide} data={el} key={el._id} symbol={currency.symbol} />
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
        differentRegion={diffMap}
        slide={slide} 
        onSlide={() => setSlide(prev => !prev)}
        setFilters={(f) => setFilter(f)}
        filters={filter}
        defaultFilters={defaultFilters.current}
        currency={currency} />
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
            <div className="listview__top">
              <div className="w-50">
                <h6 className="heading heading--3 mb-1 c-black">Results</h6>
                <div className="listview__results">
                  for {t(`regions:${params.city}.title`)}, {t(`regions:${params.city}.regions.${params.region}`)}
                </div>
                {diffMap && (
                  <>
                    {(filter.map.city !== defaultFilters.current.map.city &&
                      filter.map.city !== 'all'
                    ) && (
                      <div className="listview__cur-region">
                        City:&nbsp;
                        {t(`regions:${filter.map.city}.title`)}
                      </div>
                    )}
                    {filter.map.region.length > 0 && (
                      <div className="listview__cur-region">
                        Selected regions:&nbsp;
                        {filter.map.region.map(el => t(`regions:${filter.map.city}.regions.${el}`)).join(', ')}
                      </div>
                    )}
                  </>
                )}
                {data?.numberOfDocuments > 0 && (
                  <div className="f-lg c-grey-l">
                    found {data.numberOfDocuments} properties by filter
                  </div>
                )}
              </div>
              {data?.data.length > 0 && (
                <div className="flex">
                  <div className="mr-1">
                    <Dropdown 
                      title={currency.symbol}
                      dropTitle="Currency:"
                      items={[
                        {
                          title: 'USD',
                          click: () => setCurrency({ val: 'usd', symbol: 'USD'}),
                          active: currency.val === 'usd'
                        },
                        {
                          title: 'UZS',
                          click: () => setCurrency({ val: 'uzsom', symbol: 'UZS' }),
                          active: currency.val === 'uzsom'
                        },
                        {
                          title: 'EUR',
                          click: () => setCurrency({ val: 'eu', symbol: 'EU'}),
                          active: currency.val === 'eu'
                        }
                      ]} />
                  </div>
                  <Dropdown 
                    title={t(`translation:utils.sort.${sortBy}`)}
                    dropTitle="Sort by:"
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
              )}
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
                      <button className="btn--white listview__empty__btn mr-1" onClick={() => setFilter(defaultFilters.current)}>
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
                  {loading 
                    ? (
                      <div className="listview__empty">
                        <div className="listview__empty__content">
                          <Spinner className="loader--lg listview__loader" />
                        </div>
                      </div>
                    ) 
                    : items}
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
