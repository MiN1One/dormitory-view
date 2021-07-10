import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { isEmptyObject } from '../../../utilities/utils';
import FilterItems from '../FilterItems/FilterItems';
import * as actions from '../../../store/actions';

const OWNERSHIP = ['any', 'university', 'private'];

const MainFilters = ({ 
  scrollbar, 
  differentRegion, 
  setFilters, 
  filters, 
  defaultFilters
}) => {

  const { t } = useTranslation();
  const { search, searchRef } = useSelector(s => s.main);
  const dispatch = useDispatch();

  const itemClass = ['filters__item'];

  const filtersConfig = {
    search: {
      active: search !== '', 
      className: itemClass,
      clear: () => {
        dispatch(actions.setSearch(''));
        searchRef.value = '';
      }, 
      title: 'Search',
      click: () => searchRef?.focus(),
      value: search !== '' && search
    },
    facilities: {
      active: !isEmptyObject(filters.facilities), 
      className: itemClass, 
      clear: () => 
        setFilters(prev => ({
          ...prev,
          facilities: {}
        })), 
      title: 'Facilities',
      name: 'facilities'
    },
    bills: {
      active: filters.bills.length > 0,
      className: itemClass,
      clear: () => 
        setFilters(prev => ({
          ...prev,
          bills: []
        })),
      title: 'Bills',
      name: 'bills'
    },
    price: {
      active: filters.price.to > 0 || filters.price.from > 0,
      className: itemClass,
      title: 'Price',
      name: 'price',
      value: `${filters.price.from > 0 ? filters.price.from : ''} - ${filters.price.to > 0 ? filters.price.to : ''}`,
      clear: () => 
        setFilters(p => ({
          ...p,
          price: {
            to: 0,
            from: 0
          }
        }))
    },
    numberOfRooms: {
      active: filters.numberOfRooms,
      className: itemClass,
      title: 'Rooms',
      name: 'rooms',
      value: filters.numberOfRooms,
      clear: () => setFilters(p => ({ ...p, numberOfRooms: undefined }))
    },
    regions: {
      active: differentRegion,
      className: itemClass,
      title: 'Regions',
      name: 'regions',
      clear: () => 
        setFilters(prev => ({
          ...prev,
          map: {
            city: defaultFilters.map.city,
            region: defaultFilters.map.region
          }
        }))
    },
    university: {
      active: false,
      className: itemClass,
      title: 'University',
      name: 'university',
      clear: () => {}
    }
  };

  const filterItems = [];
  for (let key in filtersConfig) {
    filterItems.push((
      <FilterItems 
        key={key}
        scrollbar={scrollbar}
        {...filtersConfig[key]} />
    ));
  }

  return (
    <div className="filters__list--row">
      {filterItems}
      <div className="filters__item-wrapper">
        <Dropdown
          title={
            <>
              Ownership
              <span className="filters__item__dot" />
            </>
          }
          noIcon
          className={`filters__item ${filters.ownership ? 'filters__item--active' : ''}`}
          items={OWNERSHIP.map(el => ({
            active: filters.ownership && (el !== 'any' && filters.ownership === el),
            click: () => {
              setFilters(p => ({
                ...p,
                ownership: el !== 'any' ? el : undefined
              }));
            },
            title: t(`filters.ownership.${el}`)
          }))}
          dropTitle="Owned by:"
          positionX="right" />
        {filters.ownership && (
          <button 
            className="filters__item__btn filters__btn-close tooltip" 
            onClick={() => 
              setFilters(prev => ({
                ...prev,
                ownership: undefined
            }))}>
            <IoIosClose className="icon icon--grey" />
            <span className="tooltip__text tooltip__text--top tooltip__text--center">
              Clear
            </span>
          </button>
        )}
      </div>
      <div className="filters__item-wrapper">
        <div 
          tabIndex="0" 
          onClick={() => setFilters(defaultFilters)} 
          className="filters__item filters__item--red">
            Clear filters
        </div>
      </div>
    </div>
  );
}

export default React.memo(MainFilters);
