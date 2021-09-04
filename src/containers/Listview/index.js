import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { BsPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import './index.scss';
import Filters from './Filters/Filters';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Pagination from '../../components/Pagination/Pagination';
import config from './config';
import { parseQuery, sort } from '../../utilities/utils';
import useFetchData from '../../hooks/useFetchData';
import useDefaultFilters from '../../hooks/useDefaultFilters';
import useTitle from '../../hooks/useTitle';
import ListHead from './ListHead/ListHead';
import ListBody from './ListBody/ListBody';
import FloatingBtn from '../../components/FloatingBtn/FloatingBtn';

const Listview = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation(['regions', 'translation']);
  const { search } = useSelector(s => s.main);

  useTitle(
    `${t(`regions:${params.city}.title`)}, ${t(`regions:${params.city}.regions.${params.region}`)}`
  );

  const { defaultFilters, presetFilters } = useDefaultFilters();
  const [filter, setFilter] = useState(presetFilters);
  const { data, loading, makeRequest } = useFetchData({ loading: true });
  const [newData, setNewData] = useState(null);
  const [slide, setSlide] = useState(false);
  const [sortBy, setSortBy] = useState(config.SORT_OPTIONS[1]);
  
  const [currentPage, setCurrentPage] = useState(
    +parseQuery('page', location.search) || 1
  );

  const [currency, setCurrency] = useState(
    (parseQuery('currency') && config.CURRENCIES[parseQuery('currency')]) ||
    config.CURRENCIES.usd
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
      numberOfRooms = filter.numberOfRooms ? `&numberOfRooms[all]=${filter.numberOfRooms}` : '',
      searchQuery = search !== '' ? `&search=${search}` : '';

    const 
      userRegionQuery = params.city !== filter.map.city ? `&city=${filter.map.city}` : '',
      userCityQuery = (params.region !== 'all' && ![params.region].isEqual(filter.map.region))
        ? `&region=${filter.map.region.length > 0 ? filter.map.region.join(',') : 'all'}` 
        : '';

    setTimeout(() => {
      makeRequest({
        url: `api/apartments${region}${city}${facilitiesQuery}${billsQuery}${priceFrom}${priceTo}${ownership}&project=price,_id,imageCover,city,region,ownership,title,createdAt,offers&count=true&limit=${config.NUM_ITEMS_PER_VIEW}&page=${currentPage}${numberOfRooms}${currencyQuery}${searchQuery}`,
        dataSecondary: 'numberOfDocuments',
        dataAt: ['data', 'docs'],
        callback: () => {
          history.push(`?query=true${userRegionQuery}${userCityQuery}${currencyQuery}${priceFrom}${priceTo}${billsQuery}${ownership}${numberOfRooms}${searchQuery}${facilitiesQuery}`);
        }
      });
    }, 100);
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
    history,
    search
  ]);

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

  useEffect(() => 
    data && setNewData(sortData(data.data)), 
  [data, sortBy, sortData]);

  useEffect(() => data && setNewData(data.data), [data]);

  console.log({
    filter,
    newData,
    data,
    sortBy,
    currency
  });

  const breadcrumbItems = [
    {
      title: t(`regions:${params.city}.title`),
      path: `/list/${params.city}/all`,
      active: true
    },
    {
      title: t(`regions:${params.city}.regions.${params.region}`),
      path: `/list/${params.city}/${params.region}`,
      active: true
    }
  ];

  return (
    <main className="listview">
      <FloatingBtn
        label={t('translation:nav.post')}
        action={() => history.push('/post/new')}
        icon={<BsPlus className="icon--mid mr-5" />} />
      <Filters 
        differentRegion={diffMap}
        slide={slide} 
        onSlide={() => setSlide(prev => !prev)}
        setFilters={setFilter}
        filters={filter}
        defaultFilters={defaultFilters}
        currency={currency} />
      <div className="container">
        <div className="listview__content">
          <div className={`listview__container ${slide ? 'listview__container--expand' : ''}`}>
            <Breadcrumbs items={breadcrumbItems} white />
            <ListHead
              data={data}
              filter={filter}
              sortState={[sortBy, setSortBy]}
              currencyState={[currency, setCurrency]} />
            <ListBody
              data={newData}
              loading={loading}
              setFilter={setFilter}
              slide={slide}
              currency={currency} />
            {data?.numberOfDocuments > config.NUM_ITEMS_PER_VIEW && (
              <Pagination 
                onChange={setCurrentPage}
                itemsCount={data.numberOfDocuments}
                interval={config.PAGE_INTERVAL}
                currentPage={currentPage}
                itemsPerView={config.NUM_ITEMS_PER_VIEW} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Listview;
