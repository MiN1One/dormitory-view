import React, { useState, useEffect } from 'react';

const PriceFilter = ({ setFilters, filters }) => {
  const defaultPrice = {
    from: filters.price.from ? filters.price.from : '',
    to: filters.price.to ? filters.price.to : ''
  };

  const [tempPrice, setTempPrice] = useState(defaultPrice);

  useEffect(() => {
    setTempPrice(defaultPrice);
  }, [filters.price]);

  const onApplyPrice = (e, price) => {
    if (!tempPrice[price] || tempPrice[price] === '') {
      const f = { ...filters };
      delete f.price[price];
      console.log(f.price[price])
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
      <div className="filters__title">
        By Price
      </div>
      <div className="flex">
        <input 
          type="number" 
          className="filters__input filters__input--sm" 
          placeholder="from"
          value={tempPrice.from}
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
          value={tempPrice.to}
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

export default PriceFilter;