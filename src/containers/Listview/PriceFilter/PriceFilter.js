import React, { useState, useEffect } from 'react';
import useFetchData from '../../../hooks/useFetchData';

const PriceFilter = ({ setFilters, filters, currency }) => {
  const defaultPrice = {
    from: filters.price.from ? filters.price.from : '',
    to: filters.price.to ? filters.price.to : ''
  };

  const { data, makeRequest } = useFetchData();
  const [tempPrice, setTempPrice] = useState(defaultPrice);

  useEffect(() => {
    makeRequest({
      url: 'data/currency.json'
    });
  }, [makeRequest]);

  useEffect(() => {
    if (data) {
      // const { eu, usd } = data;

      // setFilters(p => {
      //   let def = { ...p };
      //   def.price.from = def.price.from * usd;
      //   def.price.to = def.price.to * usd;

      //   if (currency.val === 'eu') {
      //     def.price.from = def.price.from / eu;
      //     def.price.to = def.price.to / eu;
      //   }

      //   return def;
      // });
    }
  }, [currency.val, data]);

  useEffect(() => {
    setTempPrice(defaultPrice);
  }, [filters.price]);

  const onApplyPrice = (e, price) => {
    if (!tempPrice[price] || tempPrice[price] === '') {
      const f = { ...filters };
      delete f.price[price];
      return setFilters(f);
    }

    setFilters(prev => ({
      ...prev,
      price: {
        ...prev.price,
        [price]: tempPrice[price]
      }
    }));
  };

  return (
    <div className="filters__section" id="price">
      <div className="filters__title aie">
        By Price<span className="c-grace f-sm">&nbsp;&nbsp;in {currency.symbol}</span>
      </div>
      <div className="flex">
        <input 
          type="number" 
          className="filters__input filters__input--sm" 
          placeholder="from"
          value={tempPrice.from || ''}
          onBlur={(e) => onApplyPrice(e, 'from')}
          onChange={(e) => {
            setTempPrice(prev => 
              ({ ...prev, from: e.target.value })
            );
          }} />
        <input 
          type="number" 
          className="filters__input filters__input--sm" 
          placeholder="to"
          value={tempPrice.to || ''}
          onChange={(e) => {
            setTempPrice(prev => 
              ({ ...prev, to: e.target.value })
            );
          }}
          onBlur={(e) => onApplyPrice(e, 'to')} />
      </div>
    </div>
  );
}

export default React.memo(PriceFilter);