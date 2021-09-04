import { memo } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import config from '../config';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const ListHead = ({ data, filter, sortState, currencyState }) => {
  const params = useParams();
  const { t } = useTranslation();
  const [sortBy, setSortBy] = sortState;
  const [currency, setCurrency] = currencyState;

  const resultsFound = data?.numberOfDocuments > 0;

  return (
    <div className="listview__top">
      <div className="w-50">
        {resultsFound && (
          <h6 className="heading heading--3 mb-1 c-black">
            Results
          </h6>
        )}
        {filter.map.city !== params.city && (
          <div className="listview__cur-region">
            City:&nbsp;
            {filter.map.city === 'all'
              ? t('regions:all.regions.all')
              : t(`regions:${filter.map.city}.title`)
            }
          </div>
        )}
        {(
          filter.map.city !== 'all' && 
          !filter.map.region.isEqual(
            params.region !== 'all' ? [params.region] : []
          )
        ) && (
          <div className="listview__cur-region">
            Selected regions:&nbsp;
            {filter.map.region.length > 0
              ? filter.map.region.map(el => t(`regions:${filter.map.city}.regions.${el}`)).join(', ')
              : t(`regions:${filter.map.city}.regions.all`)
            }
          </div>
        )}
        {resultsFound && (
          <div className="f-lg c-grey-l">
            {data.numberOfDocuments} property/ies found by filter
          </div>
        )}
      </div>
      {resultsFound && (
        <div className="flex">
          <div className="mr-1">
            <Dropdown 
              title={currency.symbol}
              dropTitle="Currency:"
              positionX="right"
              items={
                Object.keys(config.CURRENCIES).map((el) => ({
                  title: config.CURRENCIES[el].symbol,
                  click: () => setCurrency({ val: el, symbol: config.CURRENCIES[el].symbol }),
                  active: currency.val === el
                }))
              } />
          </div>
          <div >
            <Dropdown 
              title={t(`translation:utils.sort.${sortBy}`)}
              dropTitle="Sort by:"
              positionX="right"
              width="19rem"
              height={15}
              items={config.SORT_OPTIONS.map(el => ({
                title: t(`translation:utils.sort.${el}`),
                click: () => setSortBy(el),
                active: sortBy === el
              }))} />
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ListHead);
