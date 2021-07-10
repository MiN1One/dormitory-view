import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation, withTranslation } from 'react-i18next';
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
import Spinner from '../../components/UI/Spinner/Spinner';
import { PureComponent } from 'react';
import axios from 'axios';

const 
  NUM_ITEMS_PER_VIEW = 12,
  PAGE_INTERVAL = 5;

class ListView extends PureComponent {
  constructor(props) {
    super(props);

    this.defaultFilters = {
      currency: { val: 'usd', symbol: 'USD' },
      facilities: {},
      ownership: undefined,
      price: {
        from: 0,
        to: 0
      },
      bills: [],
      numberOfRooms: undefined,
      map: {
        city: this.props.match.params.city,
        region: this.props.match.params.region !== 'all' ? [this.props.match.params.region] : []
      }
    }

    this.state = {
      data: null,
      newData: null,
      loading: false,
      page: parseInt(parseQuery('page')) || 1,
      error: null,
      slide: false,
      sort: '-createdAt',
      filter: { ...this.defaultFilters }
    }

    console.log(this.state);
  }

  fetchData = () => {
    const { 
      currency,
      price, 
      bills, 
      ownership, 
      map, 
      numberOfRooms,
      facilities
    } = this.state.filter;

    console.log(currency);

    let region = `?region[regex]=\\b(${map.region.join('|')})\\b`;
    let city = map.city !== 'all' ? `&city=${map.city}` : '';
    
    let facilitiesQuery = '';
    for (const [key, val] of Object.entries(facilities)) {
      facilitiesQuery = `${facilitiesQuery}&${key}[all]=${val[0]}`;
    }

    const 
      currencyQuery = currency.val !== 'usd' ? `&currency=${currency.val}` : '',
      priceFrom = price.from ? `&price[from]=${price.from}` : '',
      priceTo = price.to ? `&price[to]=${price.to}` : '',
      billsQuery = bills.length > 0 ? `&bills[all]=${bills.join(',')}` : '',
      ownershipQuery = ownership ? `&ownership=${ownership}` : '',
      numberOfRoomsQuery = numberOfRooms ? `&numberOfRooms[all]=${numberOfRooms}` : '';

    setTimeout(() => {
      axios(`http://localhost:3005/api/apartments${region}${city}${facilitiesQuery}${billsQuery}${priceFrom}${priceTo}${ownershipQuery}&project=price,_id,imageCover,city,region,ownership,title,createdAt&count=true&limit=${NUM_ITEMS_PER_VIEW}&page=${this.state.page}${numberOfRoomsQuery}${currencyQuery}`)
        .then(({ data }) => {
          console.log(data);
          this.setState({
            data: {
              data: data.data.docs,
              numberOfDocuments: data.numberOfDocuments
            }
          });
        })
        .catch((er) => {

        });
    }, 75);
  }

  onSortData = (list) => {
    const order = this.state.sort.charAt(0);
    const prop = [this.state.sort.substr(1)];

    if (prop[0] === 'price') prop.push(0);
    
    return sort({
      list: list,
      property: prop,
      order,
      isDate: prop[0] === 'createdAt'
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevP, prevS) {
    if (
      this.state.data &&
      prevS.data !== this.state.data
    ) {
      this.setState({
        newData: this.onSortData(this.state.data.data)
      });
    }

    if (this.state.sort !== prevS.sort) {
      this.setState({
        newData: this.onSortData(this.state.data.data)
      })
    }

    if (this.state.filter !== prevS.filter) {
      this.fetchData();
    }
  }

  onSetCurrency = (val, symbol) => {
    this.setState(p => ({
      filter: {
        ...p.filter,
        currency: {
          val,
          symbol
        }
      }
    }), () => console.log(this.state.filter));
  };

  render() {
    const 
      { city: cityParam, region: regionParam } = this.props.match.params,
      { map: { city, region }, currency } = this.state.filter;

    const { t } = this.props;

    const items = this.state.newData?.map(el => {
      return <Card slide={this.state.slide} data={el} key={el._id} symbol={currency.symbol} />
    });

    const diffMap = 
      city !== this.defaultFilters.map.city || 
      !this.defaultFilters.map.region.isEqual(this.state.region);

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
        slide={this.state.slide} 
        onSlide={() => this.setState(p => ({ slide: !p }))}
        setFilters={this.setState}
        filters={this.state.filter}
        defaultFilters={this.defaultFilters}
        currency={this.state.filter.currency} />
      <div className="container">
        <div className="listview__content">
          <div className={`listview__container ${this.state.slide ? 'listview__container--expand' : ''}`}>
            <Breadcrumbs
              items={[
                {
                  title: t(`regions:${cityParam}.title`),
                  path: `/${cityParam}/all`,
                  active: regionParam === 'all'
                },
                {
                  title: t(`regions:${cityParam}.regions.${regionParam}`),
                  path: `/${cityParam}/${regionParam}`,
                  active: regionParam !== 'all'
                }
              ]} 
              white />
            <div className="listview__top">
              <div className="w-50">
                <h6 className="heading heading--3 mb-1 c-black">Results</h6>
                <div className="listview__results">
                  for {t(`regions:${cityParam}.title`)}, {t(`regions:${cityParam}.regions.${regionParam}`)}
                </div>
                {diffMap && (
                  <>
                    {(city !== this.defaultFilters.map.city &&
                      city !== 'all'
                    ) && (
                      <div className="listview__cur-region">
                        City:&nbsp;
                        {t(`regions:${city}.title`)}
                      </div>
                    )}
                    {region.length > 0 && (
                      <div className="listview__cur-region">
                        Selected regions:&nbsp;
                        {region.map(el => t(`regions:${city}.regions.${el}`)).join(', ')}
                      </div>
                    )}
                  </>
                )}
                {this.state.data?.numberOfDocuments > 0 && (
                  <div className="f-lg c-grey-l">
                    found {this.state.data.numberOfDocuments} properties by filter
                  </div>
                )}
              </div>
              {this.state.data?.data.length > 0 && (
                <div className="flex">
                  <div className="mr-1">
                    <Dropdown 
                      title={currency.symbol}
                      dropTitle="Currency:"
                      items={[
                        {
                          title: 'USD',
                          click: () => this.onSetCurrency('usd', 'USD'),
                          active: currency.val === 'usd'
                        },
                        {
                          title: 'UZS',
                          click: () => this.onSetCurrency('uzsom', 'UZSOM'),
                          active: currency.val === 'uzsom'
                        },
                        {
                          title: 'EUR',
                          click: () => this.onSetCurrency('eu', 'EU'),
                          active: currency.val === 'eu'
                        }
                      ]} />
                  </div>
                  <Dropdown 
                    title={t(`translation:utils.sort.${this.state.sort}`)}
                    dropTitle="Sort by:"
                    positionX="right"
                    width="19rem"
                    height={15}
                    items={[
                      {
                        title: t('translation:utils.sort.+createdAt'),
                        click: () => this.setState({ sort: '+createdAt' }),
                        active: this.state.sort === '+createdAt'
                      },
                      {
                        title: t('translation:utils.sort.-createdAt'),
                        click: () => this.setState({ sort: '-createdAt' }),
                        active: this.state.sort === '-createdAt'
                      },
                      {
                        title: t('translation:utils.sort.+price'),
                        click: () => this.setState({ sort: '+price' }),
                        active: this.state.sort === '+price'
                      },
                      {
                        title: t('translation:utils.sort.-price'),
                        click: () => this.setState({ sort: '-price' }),
                        active: this.state.sort === '-price'
                      }
                    ]} />
                </div>
              )}
            </div>
            {!this.state.newData || this.state.newData?.length === 0
              ? (
                <div className="listview__empty">
                  <div className="listview__empty__content">
                    <div className="flex fdc aic mb-2">
                      <FcIdea className="listview__empty__icon" />
                      No properties found within this filter
                    </div>
                    <div className="flex">
                      <button 
                        className="btn--white listview__empty__btn mr-1" 
                        onClick={() => this.setState({ filter: this.defaultFilters })}>
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
                  {this.state.loading 
                    ? (
                      <div className="listview__empty">
                        <div className="listview__empty__content">
                          <Spinner />
                        </div>
                      </div>
                    ) 
                    : items
                  }
                </ul>
              )
            }
            {this.state.data?.numberOfDocuments > NUM_ITEMS_PER_VIEW && (
              <Pagination 
                onChange={(p) => this.setState({ page: p })}
                itemsCount={this.state.data?.numberOfDocuments}
                interval={PAGE_INTERVAL}
                currentPage={this.state.page}
                itemsPerView={NUM_ITEMS_PER_VIEW} />
            )}
          </div>
        </div>
      </div>
    </main>
    );
  }
}

export default withRouter(withTranslation(['regions', 'translation'])(ListView));