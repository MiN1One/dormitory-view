import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import './Adview.scss';
import image from '../../assets/images/avery-klein-JaXs8Tk5Iww-unsplash.jpg';
import Ratings from './Ratings/Ratings';
import img from '../../assets/images/dan-gold-4HG3Ca3EzWw-unsplash.jpg';
import SimilarAds from './SimilarAds/SimilarAds';
import PopScroll from '../../components/UI/PopScroll/PopScroll';
import Contact from './Contact/Contact';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import Features from './Features/Features';
import Loader from '../../components/UI/Loader/Loader';
import useFetchData from '../../hooks/useFetchData';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorView from '../../components/ErrorView/ErrorView';
import ReviewInp from './ReviewInput/ReviewInput';
import useEditFavorites from '../../hooks/useEditFavorites';
import Fullscreen from './Fullscreen/Fullscreen';
import MainImagery from './MainImagery/MainImagery';
import Details from './Details/Details';
import Panel from './Panel/Panel';

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

  const { facilities } = useSelector(state => state.main);

  const [newData, setNewData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const { editFavorites, favorites } = useEditFavorites();

  const [showContact, setShowContact] = useState(false);
  const [reviewInp, setReviewInp] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [showWisher, setShowWisher] = useState(false);

  console.log(params);

  useEffect(() => {
    if (!data) {
      makeRequest({ 
        url: `api/apartments/${params.apt}?count=true`,
        method: 'get',
        dataAt: ['data', 'doc']
      });
    }
  }, [makeRequest, data, params.apt]);

  useEffect(() => {
    if (data) {
      const propertyData = {
        ...data,
        roomOptions: []
      };

      for (let i = 0; i < data.price.length; i++) {
        propertyData.roomOptions.push({});
      }

      facilities.forEach(f => {
        for (const [key, val] of Object.entries(data)) {
          if (key === f || key === 'offers') {
            for (let i = 0; i < val.length; i++) {
              propertyData.roomOptions[i][key] = val[i];
            }
            delete propertyData[key];
          }
        }
      });

      setNewData(propertyData);
    }
  }, [data, facilities]);

  console.log(newData);

  useEffect(() => {
    if (newData && params.apt !== newData._id) {
      history.push(`/${newData.city}/${newData.region}/${newData._id}`);
    }
  }, [newData, params.city, params.region, history, params.apt]);

  useEffect(() => {
    if (reviewInp) setShowContact(false);
  }, [reviewInp]);

  const onSelectImage = (index) => {
    history.push('#main');
    setActiveImageIndex(index);
  };

  if (loading)
    return <Loader />;

  if (error)
    return <ErrorView error={error} />

  const 
    discount = +newData?.roomOptions[selectedOption].offers?.find(el => el.type === 'discount')?.value,
    price = +newData?.roomOptions[selectedOption].price,
    priceAfterDiscount = (discount && !isNaN(discount) && discount > 0)
      ? price - (price * (discount / 100))
      : null;

  const breadcrumbs = [
    {
      title: t(`regions:${newData?.city}.title`),
      path: `/${newData?.city}/all`,
      active: false
    },
    {
      title: t(`regions:${newData?.city}.regions.${newData?.region}`),
      path: `/${newData?.city}/${newData?.region}`,
      active: false
    },
    {
      title: newData?.title,
      active: true
    }
  ];

  const spyNavItems = ['main', 'options', 'details', 'features', 'similar'];
  if (newData && newData.roomOptions.length === 1) {
    delete spyNavItems[1];
  }

  return (
    <>
      {showContact && (
        <Contact 
          data={newData?.landlord}
          close={() => setShowContact(false)} 
          open={() => setReviewInp(true)} />
      )}
      {reviewInp && (
        <ReviewInp 
          userId={newData?.landlord._id}
          close={() => setReviewInp(false)} />
      )}
      <PopScroll />
      {fullScreen && (
        <Fullscreen 
          activeImageIndex={activeImageIndex}
          onImageChange={(i) => {}}
          close={() => setFullScreen(false)}
          img={img}
          img2={image} />
      )}
      <SpyNavigation
        offset={SCROLL_Y_OFFSET}
        items={spyNavItems}
        onUpdate={(el) => {
          if (el && el.id !== 'main') setShowWisher(true);
          else setShowWisher(false);
        }}>
          {showWisher && 
            <button className="adview__btn" onClick={() => editFavorites(newData?._id)}>
              {favorites.includes(newData?._id) 
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
              <span className="f-lg c-grace mr-1">Go to previous or next property</span>
              <div className="flex">
                <button 
                  className="btn--slider adview__btn-slider" 
                  onClick={() => makeRequest({
                    url: `api/apartments/${params.apt}?prev=true&count=true`,
                    dataAt: ['data', 'doc']
                  })}>
                    <IoChevronBackOutline className="icon--xs icon--dark" />
                </button>
                <button 
                  className="btn--slider adview__btn-slider" 
                  onClick={() => makeRequest({
                    url: `api/apartments/${params.apt}?next=true&count=true`,
                    dataAt: ['data', 'doc']
                  })}>
                    <IoChevronForwardOutline className="icon--xs icon--dark" />
                </button>
              </div>
            </div>
          </Breadcrumbs>
          <div className="adview__body mt-2">
            <div className="adview__left">
              <MainImagery 
                data={newData && { ...newData, price }}
                discount={{ discount, priceAfterDiscount }}
                setFullScreen={setFullScreen} />
              {newData?.roomOptions.length > 1 && (
                <AsyncRooms 
                  data={newData?.roomOptions}
                  selectedIndex={selectedOption}
                  setSelectedIndex={setSelectedOption} />
              )}
              <div className="adview__specs">
                <Details
                  data={newData && { ...newData, price }}
                  discount={{ discount, priceAfterDiscount }}
                  selectedOption={selectedOption} />
                <Features data={newData} activeOption={selectedOption} />
              </div>
            </div>
            <div className="adview__right">
              <Panel
                data={newData}
                setShowContact={setShowContact} />
              <Ratings 
                hide 
                numberOfReviews={newData?.landlord.numberOfReviews}
                open={() => setReviewInp(true)} 
                userId={newData?.landlord._id} />
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