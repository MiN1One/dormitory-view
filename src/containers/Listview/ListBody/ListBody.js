import { memo } from 'react';
import { FcIdea } from 'react-icons/fc';
import { IoSchoolOutline } from 'react-icons/io5';

import Card from '../Card/Card';
import Spinner from '../../../components/UI/Spinner/Spinner';
import useDefaultFilters from '../../../hooks/useDefaultFilters';

const ListBody = ({
  data,
  loading,
  setFilter,
  slide,
  currency
}) => {
  const { presetFilters } = useDefaultFilters();

  const propertyCards = data && data.map(el => {
    return (
      <Card 
        slide={slide} 
        data={el} 
        key={el._id} 
        symbol={currency.symbol} />
    );
  });

  if (loading) {
    return (
      <div className="listview__empty">
        <div className="listview__empty__content">
          <Spinner className="loader--lg listview__loader" />
        </div>
      </div>
    );
  }

  if (data && data.length) {
    return (
      <ul className="listview__list">
        {propertyCards}
      </ul>
    );
  }

  return (
    <div className="listview__empty">
      <div className="listview__empty__content">
        <div className="flex fdc aic mb-2">
          <FcIdea className="listview__empty__icon" />
          No properties found within this filter
        </div>
        <div className="flex">
          <button 
            className="btn--white listview__empty__btn mr-1" 
            onClick={() => setFilter(presetFilters)}>
              Clear filters
          </button>
          <button className="btn--white listview__empty__btn">
            <IoSchoolOutline className="icon mr-1" />
            Post enquiry
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ListBody);
