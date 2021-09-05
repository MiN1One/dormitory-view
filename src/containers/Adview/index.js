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
import { Link } from 'react-router-dom';
import LazyLoad from '../../hoc/LazyLoad';

const AsyncRooms = React.lazy(() => import('./Rooms/Rooms'));

const SCROLL_Y_OFFSET = 10;

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
  const { editFavorites, favorites } = useEditFavorites();

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

  const spyNavItems = ['main', 'options', 'details', 'features', 'similar'];
  (data && data.roomOptions.length === 1) && delete spyNavItems[1];
  isPreview && delete spyNavItems[4];

  const additionalNavButton = () => {
    if (isPreview) {
      return (
        <div className="flex aic">
          <button className="adview__btn mr-lg" onClick={() => history.push('/post/new')}>
            {t('translation:nav.go-back-post')}
          </button>
          <Link to="/">
            LOGO
          </Link>
        </div>
      );
    }

    if (showWisher) {
      return (
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
      );
    }
  };

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
        onUpdate={(el) => setShowWisher(el && el.id !== 'main')}>
          {additionalNavButton()}
      </SpyNavigation>
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
          {!isPreview && (
            <LazyLoad sectionId="similar">
              <SimilarAds data={data} />
            </LazyLoad>
          )}
        </div>
      </main>
    </>
  );
};

export default React.memo(Adview);