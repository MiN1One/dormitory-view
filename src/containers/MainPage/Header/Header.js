import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import './Header.scss';
import { Link, useHistory } from 'react-router-dom';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import { IoChevronBackOutline, IoChevronDownOutline, IoChevronForward, IoChevronForwardOutline } from 'react-icons/io5';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { IoIosSearch } from 'react-icons/io';
import Modalh from './Modalh/Modalh';
import { useSelector } from 'react-redux';

SwiperCore.use([ Navigation, Pagination ]);

const Header = () => {
  const { t } = useTranslation(['regions']);
  const history = useHistory();

  const [activeSection, setActiveSection] = useState(null);
  const state = useSelector(state => state.main);

  const 
    items = ['regions', 'universities', 'offers'],
    navItems = items.map((el, i) => {
      const classes = ['header__nav__item tab-item'];
      el === activeSection && classes.push('header__nav__item--active tab-item--active');
      return (
        <div 
          tabIndex="0"
          onClick={() => setActiveSection(el)}
          className={classes.join(' ')}>
            {el}
        </div>
      );
    });

  return (
    <header className="header">
      {activeSection && (
        <Modalh 
          section={activeSection}
          close={() => setActiveSection(null)}
          list={state[activeSection]} />
      )}
      <nav className="header__nav">
        <div className="container">
          <div className="header__nav__content">
            <div className="flex aic">
              <h1 className="f-lg f-mid-w c-white mr-lg">LOGO</h1>
              {navItems}
            </div>
            <div className="flex aic">
              <Dropdown 
                className="header__btn--nobg"
                title={
                  <>
                    Help
                    <IoChevronDownOutline className="icon--xs ml-5" />
                  </>
                }
                noIcon
                items={[
                  {
                    title: 'About',
                    click: () => history.push('/help#about')
                  },
                  {
                    title: 'Book',
                    click: () => history.push('/help#book')
                  },
                  {
                    title: 'Refund',
                    click: () => history.push('/help#refund')
                  }
                ]} />
              <Link to="/all/all" className="btn btn--primary header__btn">Sign up</Link>
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
      <Swiper 
        className="header__hero"
        slidesPerView={1}
        navigation={{
          prevEl: '.header__btn-slider--prev',
          nextEl: '.header__btn-slider--next',
          disabledClass: 'btn--slider-disabled'
        }}
        simulateTouch={false}>
          <SwiperSlide className="header__hero__item">
            <div className="mb-15 tc">
              <h1 className="heading heading--1">
                Housing for students
              </h1>
              <h2 className="text text--sub">
                Understanding conditional and unconditional offers
              </h2>
            </div>
            <div className="flex">
              <Link to="/all/all" className="btn btn--outline mr-1">Discover regions</Link>
            </div>
          </SwiperSlide>
          <SwiperSlide className="header__hero__item header__hero__item--2">
            <div className="mb-15 tc">
              <h1 className="heading heading--1">
                Hehe boay
              </h1>
              <h2 className="text text--sub">
                Understanding hehe
              </h2>
            </div>
            <div className="flex">
              <Link to="/all/all" className="btn btn--outline mr-1">Explore</Link>
            </div>
          </SwiperSlide>
      </Swiper>
    </header>
  );
};

export default Header;