import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import { IoChevronBackOutline, IoChevronForwardOutline, IoSchoolOutline } from 'react-icons/io5';
import { TiLocationOutline } from 'react-icons/ti';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import './SimilarAds.scss';
import img from '../../../assets/images/naomi-hebert-MP0bgaS_d1c-unsplash.jpg';
import { BiDoorOpen } from 'react-icons/bi';

SwiperCore.use([Navigation]);

const SimilarAds = () => {
  const properties = Array.from(Array(7).keys()).map((el, i) => (
    <SwiperSlide className="sads__item" key={i}>
      <Link className="wh-100 inline" to="/">
        <figure className="sads__item__figure">
          <img className="img img--contain" alt="asfd" src={img} />
        </figure>
        <div className="sads__item__body">
          <span className="sads__item__title">Apartment 2</span>
          <span className="flex aic mb-1">
            <TiLocationOutline className="icon--sm icon--green mr-1" />
            Tashkent, Mirza-Ulugbek district
          </span>
          <span className="flex aic mb-1">
            <BiDoorOpen className="icon--sm icon--green mr-1" />
            3 Rooms
          </span>
          <span className="flex aic">
            <IoSchoolOutline className="icon--sm icon--green mr-1" />
            Universities: Webster, INHA, Westminster
          </span>
        </div>
        <div className="sads__item__footer">
          <span className="sads__item__price">
            <span className="f-sm">from&nbsp;</span>
            $420
            <span className="f-sm">&nbsp;/&nbsp;week</span>
          </span>
        </div>
      </Link>
    </SwiperSlide>
  ));

  return (
    <div className="sads">
      <h3 className="heading heading--3 mb-15">Similar properties</h3>
      <div className="flex w-100 mb-2 aic">
        <button className="btn--slider sads__btn--prev">
          <IoChevronBackOutline className="icon--sm icon--dark" />
        </button>
        <button className="btn--slider sads__btn--next">
          <IoChevronForwardOutline className="icon--sm icon--dark" />
        </button>
        <span className="ml-1 f-lg c-grace ml-1">Slide to see more properties</span>
      </div>
      <Swiper 
        navigation={{
          nextEl: '.sads__btn--next',
          prevEl: '.sads__btn--prev',
          disabledClass: 'btn--slider-disabled'
        }}
        className="sads__list"
        slidesPerView={4}
        spaceBetween={30}>
          {properties}
      </Swiper>
    </div>
  );
}

export default SimilarAds;
