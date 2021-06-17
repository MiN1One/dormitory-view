import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
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
  PAGE_INTERVAL = 5,
  CURRENCIES = {
    usd: { val: 'usd', symbol: 'USD' },
    uzsom: { val: 'uzsom', symbol: 'UZSOM' },
    eu: { val: 'eu', symbol: 'EUR' },
  },
  DEFAULT_FILTERS = {
    facilities: {},
    ownership: undefined,
    price: {
      from: 0,
      to: 0
    },
    bills: [],
    numberOfRooms: undefined,
    map: {
      city: 'all',
      region: []
    }
  };

const Listview = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation(['regions', 'translation']);

  DEFAULT_FILTERS.map = {
    city: params.city,
    region: params.region !== 'all' ? [params.region] : []
  };

  const presetFilters = useRef({
    facilities: {},
    ownership: parseQuery('ownership') || undefined,
    price: {
      from: +parseQuery('price[from]') || 0,
      to: +parseQuery('price[to]') || 0
    },
    bills: (parseQuery('bills[all]') && parseQuery('bills').split(',')) || [],
    numberOfRooms: +parseQuery('numberOfRooms') || undefined,
    map: {
      city: parseQuery('city') || params.city,
      region: 
        parseQuery('region') 
          ? (parseQuery('region') !== 'all' ? parseQuery('region').split(',') : [])
          : (params.region !== 'all' ? [params.region] : [])
    }
  });

  const [filter, setFilter] = useState(presetFilters.current);

  const { data, loading, error, makeRequest } = useFetchData({
    loading: true
  });

  const [newData, setNewData] = useState(null);
  
  const [slide, setSlide] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(parseQuery('page', location.search)) || 1);
  const [sortBy, setSortBy] = useState('-createdAt');
  const [currency, setCurrency] = useState(
    (parseQuery('currency') && CURRENCIES[parseQuery('currency')]) ||
    { val: 'usd', symbol: 'USD'}
  );

  const diffMap = 
    filter.map.city !== params.city || 
    (params.region !== 'all' && ![params.region].isEqual(filter.map.region));

  useEffect(() => {
    let region = `?region[regex]=\\b(${filter.map.region.join('|')})\\b`;
    let city = filter.map.city !== 'all' ? `&city=${filter.map.city}` : '';
    
    let facilitiesQuery = '';
    for (const [key, val] of Object.entries(filter.facilities)) {
      facilitiesQuery = `${facilitiesQuery}&${key}[all]=${val[0]}`;
    }

    const 
      currencyQuery = currency.val !== 'usd' ? `&currency=${currency.val}` : '',
      priceFrom = filter.price.from ? `&price[from]=${filter.price.from}` : '',
      priceTo = filter.price.to ? `&price[to]=${filter.price.to}` : '',
      billsQuery = filter.bills.length > 0 ? `&bills[all]=${filter.bills.join(',')}` : '',
      ownership = filter.ownership ? `&ownership=${filter.ownership}` : '',
      numberOfRooms = filter.numberOfRooms ? `&numberOfRooms[all]=${filter.numberOfRooms}` : '';

    const 
      userRegionQuery = params.city !== filter.map.city ? `&city=${filter.map.city}` : '',
      userCityQuery = (params.region !== 'all' && ![params.region].isEqual(filter.map.region))
        ? `&region=${filter.map.region.length > 0 ? filter.map.region.join(',') : 'all'}` 
        : '';

    history.push(`?query=true${userRegionQuery}${userCityQuery}${currencyQuery}${priceFrom}${priceTo}${billsQuery}${ownership}${numberOfRooms}`);

    setTimeout(() => {
      makeRequest({
        url: `api/apartments${region}${city}${facilitiesQuery}${billsQuery}${priceFrom}${priceTo}${ownership}&project=price,_id,imageCover,city,region,ownership,title,createdAt,offers&count=true&limit=${NUM_ITEMS_PER_VIEW}&page=${currentPage}${numberOfRooms}${currencyQuery}`,
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
    currency,
    params.city,
    params.region,
    history
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
        defaultFilters={DEFAULT_FILTERS}
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
                    {filter.map.city !== params.city && (
                      <div className="listview__cur-region">
                        City:&nbsp;
                        {filter.map.city === 'all'
                          ? t('regions:all.regions.all')
                          : t(`regions:${filter.map.city}.title`)
                        }
                      </div>
                    )}
                    <div className="listview__cur-region">
                      Selected regions:&nbsp;
                      {filter.map.region.length > 0 
                        ? filter.map.region.map(el => t(`regions:${filter.map.city}.regions.${el}`)).join(', ')
                        : t(`regions:${filter.map.city}.regions.all`)
                      }
                    </div>
                  </>
                )}
                {data?.numberOfDocuments > 0 && (
                  <div className="f-lg c-grey-l">
                    found {data.numberOfDocuments} property/ies by filter
                  </div>
                )}
              </div>
              {data?.data.length > 0 && (
                <div className="flex">
                  <div className="mr-1">
                    <Dropdown 
                      title={currency.symbol}
                      dropTitle="Currency:"
                      items={
                        Object.keys(CURRENCIES).map((el) => ({
                          title: CURRENCIES[el].symbol,
                          click: () => setCurrency({ val: el, symbol: CURRENCIES[el].symbol }),
                          active: currency.val === el
                        }))
                      } />
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
            {loading 
              ? (
                <div className="listview__empty">
                  <div className="listview__empty__content">
                    <Spinner className="loader--lg listview__loader" />
                  </div>
                </div>
              ) 
              : (data?.data.length > 0
                ? (
                  <ul className="listview__list">
                    {items}
                  </ul>
                )
                : (
                  <div className="listview__empty">
                    <div className="listview__empty__content">
                      <div className="flex fdc aic mb-2">
                        <FcIdea className="listview__empty__icon" />
                        No properties found within this filter
                      </div>
                      <div className="flex">
                        <button className="btn--white listview__empty__btn mr-1" onClick={() => setFilter(presetFilters.current)}>
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
              )}
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
