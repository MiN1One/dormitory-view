import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const PriceFilter = ({ setFilters, filters }) => {
  const [tempPrice, setTempPrice] = useState({
    from: '',
    to: ''
  });

  const onResetPrices = () => {
    setFilters(prev => ({
      ...prev,
      price: {}
    }));
    setTempPrice({
      from: '',
      to: ''
    });
  };

  const onApplyPrice = (e, price) => {
    if (tempPrice[price] === '') {
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

    if (
      e.target.value !== '' && 
      (parseInt(e.target.value) < 150 || parseInt(e.target.value) < 0)
    ) {
      e.target.value = `${150}`;
    }
  };

  return (
    <div className="filters__section" id="price">
      <div className="filters__title">
        By Price
      </div>
      <div className="filters__form">
        <div className="flex aic mb-1 jcsb">
          <div className="flex aic c-black f-thin f-sm">
            <span>min: 150</span>
            <span className="inline mr-1 ml-1 f-xs">|</span>
            <span>max: 746</span>
          </div>
          <button 
            className="filters__btn-close tooltip" 
            onClick={onResetPrices}>
              <IoIosClose className="icon icon--grey" />
              <span className="tooltip__text tooltip__text--top tooltip__text--center">
                Clear
              </span>
          </button>
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
    </div>
  );
}

export default PriceFilter;