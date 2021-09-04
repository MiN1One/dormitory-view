import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Link, useHistory } from 'react-router-dom';
import { IoChevronBackOutline, IoChevronDownOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import config from '../../../config';
import './Header.scss';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import useFetchData from '../../../hooks/useFetchData';
import Searchbar from '../Searchbar/Searchbar';
import Regions from '../Regions/Regions';

SwiperCore.use([ Navigation, Pagination ]);

const Header = ({ data: popularItems }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { user } = useSelector((s) => s.user);
  const { data, loading, makeRequest } = useFetchData();
  const [swiper, setSwiper] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [showRegions, setShowRegions] = useState(false); 

  useEffect(() => swiper && swiper.update(), [data, swiper]);

  useEffect(() => {
    makeRequest({
      url: 'data/home.json'
    });
  }, [makeRequest]);

  const heroItems = data?.map((el, i) => {
    const classes = ['header__hero__item'];
    if (animate) 
      classes.push('header__hero__item--animate');

    return (
      <SwiperSlide 
        className={classes.join(' ')}
        key={i} 
        style={{ 
          backgroundImage: 
            `linear-gradient(rgba(0,0,0, .35), rgba(255,255,255, .15)),url("/images/home/${el.image}")`
        }}>
          <div className="flex fdc aic">
            <div className="mb-15 tc">
              <h1 className="heading heading--1">
                {el.main}
              </h1>
              <h2 className="text text--sub">
                {el.sub}
              </h2>
            </div>
            <div className="flex">
              <Link to={el.to} className="btn btn--outline mr-1">
                {t(`main.${el.action}`)}
              </Link>
            </div>
          </div>
      </SwiperSlide>
    );
  });

  if (loading) {
    return (
      <div className="wh-100 flex aic jcc">
        <h1 className="heading heading--1">
          Loading 
        </h1>
      </div>
    );
  }

  return (
    <header className="header">
      {showRegions && <Regions close={() => setShowRegions(false)} />}
      <nav className="header__nav">
        <div className="container">
          <div className="header__nav__content">
            <div className="flex aic">
              <h1 className="f-lg f-mid-w c-white mr-lg">LOGO</h1>
              <div 
                tabIndex="0"
                onClick={() => setShowRegions(true)}
                className={`header__nav__item tab-item ${showRegions ? 'header__nav__item--active tab-item--active' : ''}`}>
                  Regions
              </div>
            </div>
            <div className="flex aic">
              <Dropdown 
                className="header__btn--nobg"
                title={(
                  <>
                    Help
                    <IoChevronDownOutline className="icon--xs ml-5" />
                  </>
                )}
                noIcon
                items={config.HELP_SECTIONS.map(el => ({
                  title: t(`nav.${el}`),
                  click: () => history.push(`/help#${el}`)
                }))} />
              {!user
                ? (
                  <Link to="/auth/" className="btn btn--primary header__btn">
                    Sign up
                  </Link>
                )
                : (
                  <Link to="/user/myprofile" className="btn btn--primary header__btn">
                    My profile
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </nav>
      <div className="header__btn-group">
        <div className="container">
          <div className="flex">
            <button className="btn--slider header__btn-slider--prev">
              <IoChevronBackOutline className="icon--sm icon--dark" />
            </button>
            <button className="btn--slider header__btn-slider--next">
              <IoChevronForwardOutline className="icon--sm icon--dark" />
            </button>
          </div>
        </div>
      </div>
      <Searchbar
        data={popularItems}
        setAnimate={setAnimate}
        animate={animate} />
      <Swiper 
        onInit={(s) => setSwiper(s)}
        className="header__hero"
        slidesPerView={1}
        navigation={{
          prevEl: '.header__btn-slider--prev',
          nextEl: '.header__btn-slider--next',
          disabledClass: 'btn--slider-disabled'
        }}
        simulateTouch={false}>
          {heroItems}
      </Swiper>
    </header>
  );
};

export default React.memo(Header);