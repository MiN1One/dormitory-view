import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Rating from 'react-rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import ScrollSpy from 'react-scrollspy';
import { BsArrowsFullscreen, BsStar, BsStarFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosSchool } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { GiSpoon } from 'react-icons/gi';
import { BiDoorOpen } from 'react-icons/bi';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import './Adview.scss';
import img from '../../assets/images/dan-gold-4HG3Ca3EzWw-unsplash.jpg';
import image from '../../assets/images/avery-klein-JaXs8Tk5Iww-unsplash.jpg';
import Ratings from './Ratings/Ratings';
import Specifications from '../../components/Specs/Specifications';
import Rooms from './Rooms/Rooms';
import SimilarAds from './SimilarAds/SimilarAds';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { AiOutlineTag } from 'react-icons/ai';

SwiperCore.use([Navigation]);

const AsyncFullscreen = React.lazy(() => import('./Fullscreen/Fullscreen'));

const APARTMENT = {
  title: 'Apartment',
  address: '14 Street',
  region: 'Region',
  city: 'Tashkent',
  numberOfRooms: 4,
  features: {
    facilities: ['internet', 'private_kitchen', 'private_bath', 'furnitured', 'air_conditioner', 'gaming_area', 'washing_machine', 'personal_computer', 'public_libriary'],
    others: ['Single bed', 'Parking area'],
    security: ['cctv', 'health', 'controlled_access', 'card_access', 'additional_keys'],
    rules: ['no_smoking', 'no_late_access'],
    bills: ['water_bill', 'internet_bill', 'electricity_bill', 'gas_bill', 'heating_bill'],
    places: ['market', 'school', 'libriary', 'restaurant', 'hospital', 'bus_station']
  },
  images: [],
  description: '',
  numberOfViews: 1,
  inFavorites: 0
};

const Adview = () => {
  const { t } = useTranslation();

  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => swiper && swiper.update());

  useEffect(() => {
    if (location.hash !== '#') {
      const el = document.getElementById(location.hash.substr(1));
      el && el.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [location.hash]);

  const onSelectImage = (index) => {
    // document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
    window.scroll({
      top: 125,
      behavior: 'smooth'
    });
    setActiveImageIndex(index);
  };

  const facilities = APARTMENT.features.facilities.map((el, i) => {
    const Facility = Specifications().facilities[el];
    return Facility && <Facility key={i} />;
  });

  const security = APARTMENT.features.security.map((el, i) => {
    const Security = Specifications().security[el];
    return Security && <Security key={i} />;
  });

  const others = Specifications().facilities.others(APARTMENT.features.others);

  const bills = APARTMENT.features.bills.map((el, i) => {
    const Bill = Specifications().bills[el];
    return Bill && <Bill key={i} />;
  });
  
  const places = APARTMENT.features.places.map((el, i) => {
    const Place = Specifications().places[el];
    return Place && <Place key={i} />;
  });

  const rules = APARTMENT.features.rules.map((el, i) => {
    const Rule = Specifications().rules[el];
    return Rule && <Rule key={i} />;
  });

  return (
    <>
      {fullScreen && 
        <AsyncFullscreen 
          activeImageIndex={activeImageIndex}
          onImageChange={(i) => swiper.slideTo(i, 250, false)}
          close={() => setFullScreen(false)}
          img={img}
          img2={image} />
      }
      <div className="adview__nav">
        <div className="container">
          <ScrollSpy 
            className="adview__nav-content" 
            items={['main', 'property', 'details', 'description', 'features']}
            currentClassName="tab-item--active">
              <li className="adview__nav-item tab-item">
                <Link to="/city/region/apartment#main">
                  Main
                </Link>
              </li>
              <li className="adview__nav-item tab-item">
                <Link to="/city/region/apartment#property">
                  Property
                </Link>
              </li>
              <li className="adview__nav-item tab-item">
                <Link to="/city/region/apartment#details">
                  Details
                </Link>
              </li>
              <li className="adview__nav-item tab-item">
                <Link to="/city/region/apartment#description">
                  Description
                </Link>
              </li>
              <li className="adview__nav-item tab-item">
                <Link to="/city/region/apartment#features">
                  Features
                </Link>
              </li>
          </ScrollSpy>
        </div>
      </div>
      <main className="adview">
        <div className="container">
          <div className="breadcrumbs mb-2">
            <Link to="/" className="breadcrumbs__item">Home</Link>
            <span className="breadcrumbs__separator"></span>
            <Link to="/" className="breadcrumbs__item">City</Link>
            <span className="breadcrumbs__separator"></span>
            <Link to="/" className="breadcrumbs__item">Region</Link>
            <span className="breadcrumbs__separator"></span>
            <span className="breadcrumbs__item breadcrumbs__item--active">Apartment</span>
          </div>
          <div className="adview__body">
            <div className="adview__left">
              <figure className="adview__figure" id="main">
                <img className="img img--cover" src={img} alt="apt" />
                <span className="adview__tag">
                  <AiOutlineTag className="icon--sm icon--yellow mr-5" />
                  20% off
                </span>
                <div className="adview__cover">
                  <div className="flex fdc w-100">
                    <h1 className="adview__heading mb-5">Apartment</h1>
                    <div className="f-lg c-light f-thin">Main hall</div>
                  </div>
                  <div className="flex aic">
                    <button className="tooltip tooltip--noop mr-2">
                      <BsStar className="icon" />
                      <div className="tooltip__text tooltip__text--top-right">
                        Add to wish list
                      </div>
                    </button>
                    <button className="tooltip tooltip--noop mr-2" onClick={() => setFullScreen(true)}>
                      <BsArrowsFullscreen className="icon" />
                      <div className="tooltip__text tooltip__text--top-right">
                        Full screen
                      </div>
                    </button>
                    <div className="adview__price-tag">
                      <span className="adview__price-tag__price" data-discount="$284">
                        $350
                      </span>
                      <span className="f-thin f-sm">&nbsp;/&nbsp;week</span>
                    </div>
                  </div>
                </div>
              </figure>
              <Swiper 
                className="adview__images"
                onInit={(sw) => setSwiper(sw)}
                slidesPerView={4}
                id="property"
                simulateTouch={false}
                spaceBetween={10}
                navigation={{
                  prevEl: '.adview__btn-imgslider--prev',
                  nextEl: '.adview__btn-imgslider--next',
                  disabledClass: 'adview__btn-imgslider--disabled'
                }}>
                <SwiperSlide 
                  className={`adview__image-item ${(swiper && swiper.activeIndex === 0) ? 'adview__image-item--active' : ''}`} onClick={() => onSelectImage(0)}
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
              <Rooms />
              <div className="adview__specs">
                <div className="adview__outline">
                  <h3 className="heading heading--3">Details</h3>
                  <span className="f-thin c-grey-l f-sm w-max">
                    Number of views: {APARTMENT.numberOfViews}&nbsp;&nbsp;|&nbsp;&nbsp;In favorites: {APARTMENT.inFavorites}
                  </span>
                </div>
                <div className="mb-lg">
                  <div className="flex mb-2">
                    <span className="mr-1 flex aic f-bold f-lg">
                      <FaMapMarkerAlt className="icon--grey icon--sm mr-1" />
                      Address:
                    </span>
                    {APARTMENT.city}, {APARTMENT.region} district, {APARTMENT.address}
                  </div>
                  <div className="flex mb-2">
                    <span className="mr-1 flex aic f-bold f-lg">
                      <IoIosSchool className="icon--grey icon--sm mr-1" />
                      Distance
                    </span>
                    to Webster University &mdash; 2 years walking
                  </div>
                  <div className="flex mb-2">
                    <span className="mr-1 flex aic f-bold f-lg">
                      <BiDoorOpen className="icon--grey icon--sm mr-1" />
                      Number of rooms:
                    </span>
                    {APARTMENT.numberOfRooms}
                  </div>
                  <div className="flex mb-2">
                    <span className="mr-1 flex aic f-bold f-lg">
                      <GiSpoon className="icon--grey icon--sm mr-1" />
                      Facilities:
                    </span>
                    <div className="flex aic">
                      {APARTMENT.features.facilities.slice(0, 3).map(el => t(`features.${el}`)).join(', ')}..
                      <button 
                        className="btn--sub ml-5" 
                        onClick={() => {
                          const el = document.getElementById('features'); 
                          el && el.scrollIntoView({ behavior: 'smooth' })
                        }}>
                          More
                      </button>
                    </div>
                  </div>
                </div>
                <div className="adview__specs-wrapper">
                  <h5 className="heading heading--5 c-black mb-3">Facilites:</h5>
                  <div className="adview__specs-list">
                    {facilities}
                    {others}
                  </div>
                </div>
                <div className="adview__specs-wrapper">
                  <h5 className="heading heading--5 c-black mb-3">Security and safety:</h5>
                  <div className="adview__specs-list">{security}</div>
                </div>
                <div className="adview__specs-wrapper">
                  <h5 className="heading heading--5 c-black mb-3">Rules:</h5>
                  <div className="adview__specs-list">{rules}</div>
                </div>
                <div className="adview__specs-wrapper">
                  <h5 className="heading heading--5 c-black mb-3">Included Bills:</h5>
                  <div className="adview__specs-list">{bills}</div>
                </div>
                <div className="adview__specs-wrapper">
                  <h5 className="heading heading--5 c-black mb-3">Nearby places:</h5>
                  <div className="adview__specs-list">{places}</div>
                </div>
              </div>
            </div>
            <div className="adview__right">
              <div className="adview__panel">
                <div className="flex fdc">
                  <Link to="/" className="adview__user">
                    Someone
                  </Link>
                  <span className="c-grace">&nbsp;landlord</span>
                </div>
                <div className="adview__panel-rating-group">
                  <div className="flex aic mb-5">
                    <Rating 
                      readonly
                      emptySymbol={<BsStarFill className="icon--sm icon--star-e mx-25" />}
                      fullSymbol={<BsStarFill className="icon--sm icon--yellow mx-25" />}
                      initialRating={4.5}
                      fractions={2} />
                    <span className="adview__panel-rating mr-5 ml-5">4.5</span>
                  </div>
                  <Link to="/" className="c-grace undl--h undl">154 Reviews</Link>
                </div>
                <button className="btn btn--primary w-100 mb-1">Contact</button>
              </div>
              <Ratings />
            </div>
          </div>
          <LazyLoadComponent placeholder={<div className="loading">Loading...</div>}>
            <SimilarAds />
          </LazyLoadComponent>
        </div>
      </main>
    </>
  );
};

export default React.memo(Adview);

/* 
  specs: 
    num rooms,
    kitchen
    
  features:
    internet
*/