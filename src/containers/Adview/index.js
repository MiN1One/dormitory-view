import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

import './index.scss';
import Ratings from './Ratings/Ratings';
import SimilarAds from './SimilarAds/SimilarAds';
import PopScroll from '../../components/UI/PopScroll/PopScroll';
import Contact from './Contact/Contact';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Features from './Features/Features';
import useFetchData from '../../hooks/useFetchData';
import ErrorView from '../../components/ErrorView/ErrorView';
import ReviewInp from './ReviewInput/ReviewInput';
import MainImagery from './MainImagery/MainImagery';
import Details from './Details/Details';
import Panel from './Panel/Panel';
import usePrevious from '../../hooks/usePrevious';
import useTitle from '../../hooks/useTitle';
import LazyLoad, { Loader } from '../../hoc/LazyLoad';
import AdviewNav from './AdviewNav/AdviewNav';
import Reviews from '../../components/Reviews/Reviews';
import LoaderPrimary from '../../components/UI/Loader/Loader';

const AsyncRooms = React.lazy(() => import('./Rooms/Rooms'));

const Adview = ({ data: previewData }) => {
  const { t } = useTranslation();
  const params = useParams();
  const history = useHistory();
  
  const { 
    data, 
    loading, 
    error, 
    makeRequest 
  } = useFetchData({
    loading: false,
    data: previewData
  });

  const [selectedOption, setSelectedOption] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [reviewInp, setReviewInp] = useState(false);
  const [showWisher, setShowWisher] = useState(false);

  useTitle(data?.title || document.title);

  const previousApt = usePrevious(data && data._id);

  useEffect(() => {
    if (!data) {
      makeRequest({ 
        url: `api/apartments/${params.apt}?count=true`,
        method: 'get',
        dataAt: ['data', 'doc']
      });
    }
  }, [makeRequest, params.apt, data]);

  useEffect(() => {
    if (data && previousApt !== data?._id) {
      history.push(`/list/${data.city}/${data.region}/${data._id}`);
    }
  }, [data, history, params.apt, previousApt]);

  useEffect(() => 
    reviewInp && setShowContact(false),
  [reviewInp]);

  if (error) {
    return <ErrorView error={error} />;
  }

  const onGoTo = (direction) => {
    makeRequest({
      url: `api/apartments/${params.apt}?${direction}=true&count=true&city=${data?.city}`,
      dataAt: ['data', 'doc']
    })
  };

  const isPreview = !!previewData;

  const 
    discount = +data?.roomOptions[selectedOption].offers?.find(el => el.type === 'discount')?.value,
    price = +data?.roomOptions[selectedOption].price,
    priceAfterDiscount = (discount && !isNaN(discount) && discount > 0)
      ? price - (price * (discount / 100))
      : null;

  const breadcrumbs = [
    {
      title: t(`regions:${data?.city}.title`),
      path: !isPreview && `/list/${data?.city}/all`,
      active: false
    },
    {
      title: t(`regions:${data?.city}.regions.${data?.region}`),
      path: !isPreview && `/list/${data?.city}/${data?.region}`,
      active: false
    },
    {
      title: data?.title,
      active: true
    }
  ];

  if (!data && !error) {
    return <LoaderPrimary />;
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
      <AdviewNav data={data} isPreview={isPreview} />
      <main className="adview">
        <div className="container">
          <Breadcrumbs items={breadcrumbs}>
            {!isPreview && (
              <div className="flex aic">
                <span className="f-lg c-grace mr-1">
                  See properties in this region
                </span>
                <div className="flex">
                  <button 
                    className="btn--slider adview__btn-slider" 
                    onClick={() => onGoTo('prev')}>
                      <IoChevronBackOutline className="icon--xs icon--dark" />
                  </button>
                  <button 
                    className="btn--slider adview__btn-slider" 
                    onClick={() => onGoTo('next')}>
                      <IoChevronForwardOutline className="icon--xs icon--dark" />
                  </button>
                </div>
              </div>
            )}
          </Breadcrumbs>
          <div className="adview__body">
            <div className="adview__left">
              <MainImagery 
                isPreview={isPreview}
                data={data && { ...data, price }}
                discount={{ discount, priceAfterDiscount }} />
              {data && data.roomOptions.length > 1 && (
                <AsyncRooms 
                  isPreview={isPreview}
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
        </div>
        <LazyLoad sectionId="reviews">
          <Reviews userId={data?.landlord?.id} />
        </LazyLoad>
        {!isPreview && (
          <LazyLoad sectionId="similar">
            <SimilarAds data={data} />
          </LazyLoad>
        )}
      </main>
    </>
  );
};

export default React.memo(Adview);