import { useRef } from 'react';
import { useParams } from 'react-router';
import { parseQuery } from '../utilities/utils';

const useDefaultFilters = () => {
  const params = useParams();

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

  const f = defaultFilters.current;
  
  const presetFilters = useRef({
    facilities: {},
    ownership: parseQuery('ownership') || f.ownership,
    price: {
      from: +parseQuery('price[from]') || f.price.from,
      to: +parseQuery('price[to]') || f.price.to
    },
    bills: (parseQuery('bills[all]') && parseQuery('bills[all]').split(',')) || f.bills,
    numberOfRooms: +parseQuery('numberOfRooms') || f.numberOfRooms,
    map: {
      city: parseQuery('city') || f.map.city,
      region: 
        parseQuery('region') 
          ? (parseQuery('region') !== 'all' ? parseQuery('region').split(',') : [])
          : f.map.region
    }
  });

  return {
    presetFilters: presetFilters.current,
    defaultFilters: defaultFilters.current
  };
}

export default useDefaultFilters;
