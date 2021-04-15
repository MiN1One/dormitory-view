import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectFade } from 'swiper';
import { Link } from 'react-router-dom';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

import './Header.scss';
import Searchbar from '../../components/Searchbar/Searchbar';
import Cities from './Cities';
import Popular from '../Popular/Popular';

SwiperCore.use([Navigation, Pagination, EffectFade]);

const Header = () => {
  const { t } = useTranslation();
  const [focus, setFocus] = useState(false);

  return (
    <header className="header">
      <Swiper 
        className={`header__hero ${focus ? 'header__hero--active' : ''}`}
        // effect="fade"
        // fadeEffect={{ crossFade: true }}
        pagination={{ el: '.swiper-pagination' }}
        simulateTouch={false}
        navigation={{
          prevEl: '.header__btn--prev',
          nextEl: '.header__btn--next',
          disabledClass: 'header__btn--disabled'
        }}
        slidesPerView={1}>
          <SwiperSlide className="header__showcase-wrapper">
            <div className="header__showcase">
              <div className="mb-2">
                <h1 className="heading heading--1 mb-1">
                  Guide: University offers 2021
                </h1>
                <h2 className="text text--sub">
                  Understanding conditional and unconditional offers
                </h2>
              </div>
              <Link to="/" className="btn btn--outline btn--b-white">
                Discover
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide className="header__showcase-wrapper header__showcase-wrapper--2">
            <div className="header__showcase">
              <div className="mb-2">
                <h1 className="heading heading--1 mb-1">
                  Guide: University offers 2021
                </h1>
                <h2 className="text text--sub">
                  Understanding conditional and unconditional offers
                </h2>
              </div>
              <Link to="/" className="btn btn--outline btn--b-white">
                Hehe boay
              </Link>
            </div>
          </SwiperSlide>
          <div class="swiper-pagination"></div>
          <button className="header__btn header__btn--prev">
            <BsChevronLeft className="icon--xl" />
          </button>
          <button className="header__btn header__btn--next">
            <BsChevronRight className="icon--xl" />
          </button>
          <main className="header__main">
            <nav>
              <div className="container">
                <div className="header__nav">
                  <Link to="/" className="">
                    <h1 className="c-grey-l">LOGO</h1>
                  </Link>
                  <div className="flex">
                    <Link to="/auth/login" className="header__hero-link">{t('nav.login')}</Link> 
                    <Link to="/help" className="header__hero-link">{t('nav.help')}</Link>
                  </div>
                </div>
              </div>
            </nav>
            <div className="header__searchbar">
              <Searchbar 
                onFocus={() => setFocus(true)} 
                onBlur={() => setFocus(false)} 
                focus={focus} />
            </div>
          </main>
      </Swiper>
      <Popular />
      {/* <Cities /> */}
    </header>
  );
};

export default React.memo(Header);