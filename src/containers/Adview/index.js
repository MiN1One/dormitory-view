import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import './index.scss';
import Ratings from './Ratings/Ratings';
import SimilarAds from './SimilarAds/SimilarAds';
import PopScroll from '../../components/UI/PopScroll/PopScroll';
import Contact from './Contact/Contact';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import Features from './Features/Features';
import useFetchData from '../../hooks/useFetchData';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorView from '../../components/ErrorView/ErrorView';
import ReviewInp from './ReviewInput/ReviewInput';
import useEditFavorites from '../../hooks/useEditFavorites';
import MainImagery from './MainImagery/MainImagery';
import Details from './Details/Details';
import Panel from './Panel/Panel';
import usePrevious from '../../hooks/usePrevious';
import useTitle from '../../hooks/useTitle';

const AsyncRooms = React.lazy(() => import('./Rooms/Rooms'));

// facilities: ['internet', 'private_kitchen', 'parking', 'private_bath', 'furnitured', 'air_conditioner', 'gaming_area', 'washing_machine', 'personal_computer', 'public_libriary'],
// others: ['Single bed', 'Parking area'],
// security: ['cctv', 'health', 'controlled_access', 'card_access', 'additional_keys'],
// rules: ['no_smoking', 'no_late_access'],
// bills: ['water_bill', 'internet_bill', 'electricity_bill', 'gas_bill', 'heating_bill'],
// places: ['market', 'school', 'libriary', 'restaurant', 'hospital', 'bus_station', 'mosque']

const SCROLL_Y_OFFSET = -120;

const Adview = () => {
  const { t } = useTranslation();
  const params = useParams();
  const history = useHistory();
  
  const { data, loading, error, makeRequest } = useFetchData();

  const [selectedOption, setSelectedOption] = useState(0);
  const { editFavorites, favorites } = useEditFavorites();

  const [showContact, setShowContact] = useState(false);
  const [reviewInp, setReviewInp] = useState(false);
  const [showWisher, setShowWisher] = useState(false);

  useTitle(data?.title || document.title);

  const previousApt = usePrevious(data && data._id);

  useEffect(() => {
    makeRequest({ 
      url: `api/apartments/${params.apt}?count=true`,
      method: 'get',
      dataAt: ['data', 'doc']
    });
  }, [makeRequest, params.apt]);

  console.log(data);

  useEffect(() => {
    if (data && previousApt !== data?._id) {
      history.push(`/list/${data.city}/${data.region}/${data._id}`);
    }
  }, [data, history, params.apt, previousApt]);

  useEffect(() => {
    if (reviewInp) setShowContact(false);
  }, [reviewInp]);

  if (error)
    return <ErrorView error={error} />

  const 
    discount = +data?.roomOptions[selectedOption].offers?.find(el => el.type === 'discount')?.value,
    price = +data?.roomOptions[selectedOption].price,
    priceAfterDiscount = (discount && !isNaN(discount) && discount > 0)
      ? price - (price * (discount / 100))
      : null;

  const breadcrumbs = [
    {
      title: t(`regions:${data?.city}.title`),
      path: `/list/${data?.city}/all`,
      active: false
    },
    {
      title: t(`regions:${data?.city}.regions.${data?.region}`),
      path: `/list/${data?.city}/${data?.region}`,
      active: false
    },
    {
      title: data?.title,
      active: true
    }
  ];

  const spyNavItems = ['main', 'options', 'details', 'features', 'similar'];
  if (data && data.roomOptions.length === 1) {
    delete spyNavItems[1];
  }

  return (
    <>
      {showContact && (
        <Contact 
          data={data?.landlord}
          close={() => setShowContact(false)} 
          open={() => setReviewInp(true)} />
      )}
      {reviewInp && (
        <ReviewInp 
          userId={data?.landlord._id}
          close={() => setReviewInp(false)} />
      )}
      <PopScroll />
      <SpyNavigation
        offset={SCROLL_Y_OFFSET}
        items={spyNavItems}
        onUpdate={(el) => {
          if (el && el.id !== 'main') setShowWisher(true);
          else setShowWisher(false);
        }}>
          {showWisher && 
            <button className="adview__btn" onClick={() => editFavorites(data?._id)}>
              {favorites?.includes(data?._id) 
                ? (
                  <>
                    <BsStarFill className="icon--xs icon--yellow mr-5" />
                    Remove from favorites
                  </>
                )
                : (
                  <>
                    <BsStar className="icon--xs icon--yellow mr-5" />
                    Add to favorites
                  </>
                )
              }
            </button>
          }
      </SpyNavigation>
      <main className="adview">
        <div className="container">
          <Breadcrumbs items={breadcrumbs}>
            <div className="flex aic">
              <span className="f-lg c-grace mr-1">See properties in this region</span>
              <div className="flex">
                <button 
                  className="btn--slider adview__btn-slider" 
                  onClick={() => 
                    makeRequest({
                      url: `api/apartments/${params.apt}?prev=true&count=true&city=${data?.city}`,
                      dataAt: ['data', 'doc']
                    })
                  }>
                    <IoChevronBackOutline className="icon--xs icon--dark" />
                </button>
                <button 
                  className="btn--slider adview__btn-slider" 
                  onClick={() => 
                    makeRequest({
                      url: `api/apartments/${params.apt}?next=true&count=true&city=${data?.city}`,
                      dataAt: ['data', 'doc']
                    })
                  }>
                    <IoChevronForwardOutline className="icon--xs icon--dark" />
                </button>
              </div>
            </div>
          </Breadcrumbs>
          <div className="adview__body mt-2">
            <div className="adview__left">
              <MainImagery 
                data={data && { ...data, price }}
                discount={{ discount, priceAfterDiscount }} />
              {data && data.roomOptions.length > 1 && (
                <AsyncRooms 
                  id={data?._id}
                  images={data?.images}
                  data={data?.roomOptions}
                  selectedIndex={selectedOption}
                  setSelectedIndex={setSelectedOption} />
              )}
              <div className="adview__specs">
                <Details
                  data={data && { ...data, price }}
                  discount={{ discount, priceAfterDiscount }}
                  selectedOption={selectedOption} />
                <Features data={data} activeOption={selectedOption} />
              </div>
            </div>
            <div className="adview__right">
              <Panel
                data={data}
                setShowContact={setShowContact} />
              <Ratings 
                hide 
                numberOfReviews={data?.landlord.numberOfReviews}
                open={() => setReviewInp(true)} 
                userId={data?.landlord._id} />
            </div>
          </div>
          <div id="similar">
            <LazyLoadComponent 
              placeholder={
                <div className="container">
                  <div className="flex jcc">
                    <Spinner className="adview__loader loader--lg" />
                  </div>
                </div>
              }>
                <SimilarAds data={data} />
            </LazyLoadComponent>
          </div>
        </div>
      </main>
    </>
  );
};

export default React.memo(Adview);