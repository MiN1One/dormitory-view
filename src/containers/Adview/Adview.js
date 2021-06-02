import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IoChevronBackOutline, IoChevronForwardOutline, IoHammer } from 'react-icons/io5';
import Rating from 'react-rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { BsArrowsFullscreen, BsStar, BsStarFill } from 'react-icons/bs';
import { FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosSchool } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { GiBathtub, GiDoor, GiKnifeFork } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { AiOutlineTag } from 'react-icons/ai';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import './Adview.scss';
import img from '../../assets/images/dan-gold-4HG3Ca3EzWw-unsplash.jpg';
import image from '../../assets/images/avery-klein-JaXs8Tk5Iww-unsplash.jpg';
import Ratings from './Ratings/Ratings';
import Rooms from './Rooms/Rooms';
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
import { convertISOString } from '../../utilities/utils';

SwiperCore.use([Navigation]);

const AsyncFullscreen = React.lazy(() => import('./Fullscreen/Fullscreen'));

const APARTMENT = {
  title: 'Apartment',
  address: '14 Street',
  region: 'Region',
  type: 'university-owned',
  city: 'Tashkent',
  bath: ['private', 'private', 'private'],
  kitchen: ['public', 'private', 'public'],
  price: [150, 120, 130],
  numberOfRooms: [1, 2, 1],
  furnitured: [true, false, true],
  condition: ['medium', 'good', 'poor'],
  internet: [false, true, false],
  gaming: [false, true, false],
  distances: [
    {
      name: 'Webster University',
      walk: '20 minutes',
      car: '5-7 minutes'
    },
    {
      name: 'National Institute of Architecture',
      walk: '20 minutes',
      car: '5-7 minutes'
    },
  ],
  features: {
    facilities: ['internet', 'private_kitchen', 'parking', 'private_bath', 'furnitured', 'air_conditioner', 'gaming_area', 'washing_machine', 'personal_computer', 'public_libriary'],
    others: ['Single bed', 'Parking area'],
    security: ['cctv', 'health', 'controlled_access', 'card_access', 'additional_keys'],
    rules: ['no_smoking', 'no_late_access'],
    bills: ['water_bill', 'internet_bill', 'electricity_bill', 'gas_bill', 'heating_bill'],
    places: ['market', 'school', 'libriary', 'restaurant', 'hospital', 'bus_station', 'mosque']
  },
  images: [],
  description: '',
  inFavorites: 0
};

const SCROLL_Y_OFFSET = -120;

const Adview = () => {
  const { t } = useTranslation();
  const params = useParams();
  const history = useHistory();
  
  const { data, loading, error, makeRequest } = useFetchData();

  const { facilities, months } = useSelector(state => state.main);

  const [newData, setNewData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const { editFavorites, favorites } = useEditFavorites();

  const [showContact, setShowContact] = useState(false);
  const [reviewInp, setReviewInp] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [showWisher, setShowWisher] = useState(false);

  console.log(params);

  useEffect(() => {
    if (!data) {
      makeRequest({ 
        url: `/apartments/${params.apt}?count=true`,
        method: 'get',
        dataAt: ['data', 'doc']
      });
    }
  }, [makeRequest, data, params.apt]);

  useEffect(() => {
    console.log(data);
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
          if (key === f) {
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

  useEffect(() => swiper && swiper.update());

  console.log(newData);

  useEffect(() => {
    if (newData && params.apt !== newData._id) {
      history.push(`/${params.city}/${params.region}/${newData._id}`);
    }
  }, [newData, params.city, params.region, history, params.apt]);

  useEffect(() => {
    if (reviewInp) setShowContact(false);
  }, [reviewInp]);

  const onSelectImage = (index) => {
    history.push('#main');
    setActiveImageIndex(index);
  };

  

  const distances = APARTMENT.distances.map((el, i) => 
    <li className="adview__specs-separate" key={i}>
      to {el.name} &mdash; <span className="c-grace">{el.walk} walking | {el.car} by car</span>
    </li>
  );

  if (loading)
    return <Loader />;

  if (error)
    return <ErrorView error={error} />

  const 
    createdDate = convertISOString(newData?.createdAt),
    userDateArr = newData?.landlord.createdAt.split('-'),
    year = userDateArr && userDateArr[0],
    month = userDateArr && +userDateArr[1],
    discount = +newData?.roomOptions[selectedOption].discount,
    price = +newData?.roomOptions[selectedOption].price,
    priceAfterDiscount = (discount && discount > 0) 
      ? price - (price * (discount / 100))
      : null;

  return (
    <>
      {showContact && 
        <Contact 
          data={newData?.landlord}
          close={() => setShowContact(false)} 
          open={() => setReviewInp(true)} />
      }
      {reviewInp && 
        <ReviewInp 
          userId={newData?.landlord._id}
          close={() => setReviewInp(false)} />
      }
      <PopScroll />
      {fullScreen &&
        <AsyncFullscreen 
          activeImageIndex={activeImageIndex}
          onImageChange={(i) => swiper.slideTo(i, 250, false)}
          close={() => setFullScreen(false)}
          img={img}
          img2={image} />
      }
      <SpyNavigation
        offset={SCROLL_Y_OFFSET}
        items={['main', 'options', 'details', 'features', 'similar']}
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
          <Breadcrumbs items={[
            {
              title: t(`regions:${params.city}.title`),
              path: `/${params.city}`,
              active: false
            },
            {
              title: t(`regions:${params.city}.regions.${params.region}`),
              path: `/${params.city}/${params.region}`,
              active: false
            },
            {
              title: newData?.title,
              active: true
            }
          ]}>
            <div className="flex aic">
              <span className="f-lg c-grace mr-1">Go to previous or next property</span>
              <div className="flex">
                <button 
                  className="btn--slider adview__btn-slider" 
                  onClick={() => makeRequest({
                    url: `/apartments/${params.apt}?prev=true&count=true`,
                    dataAt: ['data', 'doc']
                  })}>
                    <IoChevronBackOutline className="icon--xs icon--dark" />
                </button>
                <button 
                  className="btn--slider adview__btn-slider" 
                  onClick={() => makeRequest({
                    url: `/apartments/${params.apt}?next=true&count=true`,
                    dataAt: ['data', 'doc']
                  })}>
                    <IoChevronForwardOutline className="icon--xs icon--dark" />
                </button>
              </div>
            </div>
          </Breadcrumbs>
          <div className="adview__body mt-2">
            <div className="adview__left">
              <figure className="adview__figure" id="main">
                {/* <Spinner className="wh-100 loader--lg" /> */}
                <img className="img img--cover" src={img} alt="apt" />
                {discount && (
                  <span className="adview__tag">
                    <AiOutlineTag className="icon--sm icon--yellow mr-5" />
                    {discount}% off
                  </span>
                )}
                <div className="adview__cover">
                  <div className="flex fdc w-100">
                    <h1 className="adview__heading mb-5">{newData?.title}</h1>
                    <div className="f-lg c-light f-thin">Main hall</div>
                  </div>
                  <div className="flex aic">
                    <button className="tooltip mr-2" onClick={() => editFavorites(newData?._id)}>
                      {favorites.includes(newData?._id) 
                        ? (
                          <>
                            <BsStarFill className="icon icon--yellow" />
                            <div className="tooltip__text tooltip__text--top tooltip__text--center">
                              Remove from favorites
                            </div>
                          </>
                        )
                        : (
                          <>
                            <BsStar className="icon" />
                            <div className="tooltip__text tooltip__text--top tooltip__text--center">
                              Add to wish list
                            </div>
                          </>
                        )
                      }
                    </button>
                    <button className="tooltip mr-2" onClick={() => setFullScreen(true)}>
                      <BsArrowsFullscreen className="icon" />
                      <div className="tooltip__text tooltip__text--top tooltip__text--center">
                        Full screen
                      </div>
                    </button>
                    <div className="adview__price-tag">
                      <div 
                        className={`adview__price-tag__price ${discount ? 'adview__price-tag__price--ds' : ''}`}>
                          ${price}
                          {priceAfterDiscount && (
                            <span className="adview__price-tag__discount">
                              ${priceAfterDiscount}
                            </span>
                          )}
                      </div>
                      <span className="f-light f-sm">&nbsp;/&nbsp;month</span>
                    </div>
                  </div>
                </div>
              </figure>
              <Swiper 
                className="adview__images"
                onInit={(sw) => setSwiper(sw)}
                slidesPerView={4}
                simulateTouch={false}
                spaceBetween={10}
                navigation={{
                  prevEl: '.adview__btn-imgslider--prev',
                  nextEl: '.adview__btn-imgslider--next',
                  disabledClass: 'adview__btn-imgslider--disabled'
                }}>
                <SwiperSlide 
                  className={`adview__image-item ${(swiper && swiper.activeIndex === 0) ? 'adview__image-item--active' : ''}`} 
                  onClick={() => onSelectImage(0)}
                  tabIndex="0">
                    <img className="img img--contain" src={img} alt="imageer" />
                </SwiperSlide>
                <SwiperSlide className="adview__image-item" onClick={() => onSelectImage(0)}>
                  <img className="img img--contain" src={image} alt="imageer" />
                </SwiperSlide>
                <button className="adview__btn-imgslider adview__btn-imgslider--prev">
                  <IoChevronBackOutline className="icon--sm icon--white" />
                </button>
                <button className="adview__btn-imgslider adview__btn-imgslider--next">
                  <IoChevronForwardOutline className="icon--sm icon--white" />
                </button>
              </Swiper>
              <Rooms 
                data={newData?.roomOptions}
                selectedIndex={selectedOption}
                setSelectedIndex={setSelectedOption} />
              <div className="adview__specs">
                <div className="w-100" id="details">
                  <div className="adview__outline">
                    <h3 className="heading heading--3">Details</h3>
                    <span className="f-thin c-grey-l f-sm w-max">
                      Updated at: {createdDate.date} {months[createdDate.month]} {createdDate.hours}:{createdDate.minutes}&nbsp;&nbsp;|&nbsp;&nbsp;Number of views: {newData?.numberOfViews}&nbsp;&nbsp;|&nbsp;&nbsp;In favorites: {newData?.inFavorites}
                    </span>
                  </div>
                  <div className="mb-lg">
                    <div className="flex mb-2">
                      <span className="mr-1 flex aic f-bold f-lg">
                        <FaMapMarkerAlt className="icon--grey icon--sm mr-1" />
                        Address:
                      </span>
                      {newData?.city}, {newData?.region} district, {newData?.address}
                    </div>
                    <div className="flex mb-2">
                      <span className="mr-1 flex aic f-bold f-lg">
                        <FaBuilding className="icon--grey icon--sm mr-1" />
                        Type:
                      </span>
                      {newData?.ownership}
                    </div>
                    <div className="flex mb-2 ais">
                      <span className="mr-1 flex aic f-bold f-lg">
                        <IoIosSchool className="icon--grey icon--sm mr-1" />
                        Distance
                      </span>
                      <ul className="flex fdc">{distances}</ul>
                    </div>
                    <div className="flex mb-2">
                      <span className="mr-1 flex aic f-bold f-lg">
                        <GiDoor className="icon--grey icon--sm mr-1" />
                        Number of rooms:
                      </span>
                      {newData?.roomOptions[selectedOption].numberOfRooms}
                    </div>
                    <div className="flex mb-2">
                      <span className="mr-1 flex aic f-bold f-lg">
                        <IoHammer className="icon--grey icon--sm mr-1" />
                        Condition:
                      </span>
                      {newData?.roomOptions[selectedOption].condition}
                    </div>
                    <div className="flex mb-2">
                      <span className="mr-1 flex aic f-bold f-lg">
                        Price:
                      </span>
                      ${price} / month
                      {discount > 0 && (
                        <span className="ml-5">
                          With dicount ${priceAfterDiscount}
                        </span>
                      )}
                    </div>
                    <div className="flex ais mb-2">
                      <div className="mr-1 flex aic f-bold f-lg">
                        Facilities:
                      </div>
                      <div className="">
                        <div className="adview__specs-separate">
                          <GiKnifeFork className="icon--sm icon--grey mr-1" />
                          Kitchen: {newData?.roomOptions[selectedOption].kitchen}
                        </div>
                        <div className="flex aic">
                          <div className="adview__specs-separate m-0">
                            <GiBathtub className="icon--sm icon--grey mr-1" />
                            Bathroom: {newData?.roomOptions[selectedOption].bath}
                          </div>
                          <button 
                            className="btn--sub ml-5" 
                            onClick={() => history.push('#features')}>
                              More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Features data={newData} activeOption={selectedOption} />
              </div>
            </div>
            <div className="adview__right">
              <div className="adview__panel">
                <div className="flex fdc mb-15 c-grey-l tc f-mid">
                  <Link to="/" className="adview__user">
                    {newData?.landlord.last_name} {newData?.landlord.name}
                  </Link>
                  <span className="mb-5">Landlord</span>
                  <span className="f-thin">Since {months[+month - 1]} {year}</span>
                </div>
                <div className="adview__panel-rating-group">
                  <div className="flex aic mb-5">
                    <Rating 
                      readonly
                      emptySymbol={<BsStarFill className="icon--sm icon--star-e mx-25" />}
                      fullSymbol={<BsStarFill className="icon--sm icon--yellow mx-25" />}
                      initialRating={newData?.landlord.averageRating}
                      fractions={2} />
                    {newData?.landlord.numberOfReviews > 0 && (
                      <span className="adview__panel-rating mr-5 ml-5">
                        {newData?.landlord.averageRating}
                      </span>
                    )}
                  </div>
                  <Link to="/" className="c-grace undl--h undl">
                    {newData?.landlord.numberOfReviews > 0
                      ? `${newData?.landlord.numberOfReviews} ${newData?.landlord.numberOfReviews.length > 1 ? 'Reviews' : 'Review'}`
                      : 'No reviews'
                    }
                  </Link>
                </div>
                <button 
                  className="btn btn--primary w-100 mb-1" 
                  onClick={() => setShowContact(true)}>
                    Contact
                </button>
              </div>
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
                <SimilarAds data={data} apt={newData} />
            </LazyLoadComponent>
          </div>
        </div>
      </main>
    </>
  );
};

export default React.memo(Adview);