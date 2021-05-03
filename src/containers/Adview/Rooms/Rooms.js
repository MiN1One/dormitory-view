import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import './Rooms.scss';
import img from '../../../assets/images/dan-gold-4HG3Ca3EzWw-unsplash.jpg';
import { BiDoorOpen } from 'react-icons/bi';
import { GiBathtub, GiKnifeFork } from 'react-icons/gi';

SwiperCore.use([Navigation]);

const Rooms = () => {
  const [swiper, setSwiper] = useState(null);

  useEffect(() => swiper && swiper.update());

  const options = Array.from(Array(5).keys()).map((el, i) => (
    <SwiperSlide className={`rooms__item ${i === 2 ? 'rooms__item--active' : ''}`} key={i} tabIndex="0">
      <figure className="rooms__item__figure">
        <img className="img img--contain" alt="standard" src={img} />
        {i === 2 && <div className="rooms__item__badge">Selected</div>}
      </figure>
      <div className="rooms__item__body">
        <span className="rooms__item__title">Apartment Basic</span>
        <div className="rooms__item__features">
          <div className="flex aic mb-1">
            <BiDoorOpen className="icon--sm icon--grey mr-1" />
            Rooms: 4
          </div>
          <div className="flex aic mb-1">
            <GiKnifeFork className="icon--sm icon--grey mr-1" />
            Kitchen: public
          </div>
          <div className="flex aic">
            <GiBathtub className="icon--sm icon--grey mr-1" />
            Bath: public
          </div>
        </div>
      </div>
      <div className="rooms__item__footer">
        <span className="rooms__item__price">
          $350
          <span className="f-sm">&nbsp;/&nbsp;week</span>
        </span>
      </div>
    </SwiperSlide>
  ));

  return (
    <div className="rooms" id="options">
      <h3 className="heading heading--3 mb-15">Room options</h3>
      <div className="flex w-100 mb-2 aic">
        <button className="btn--slider rooms__btn--prev">
          <IoChevronBackOutline className="icon--sm icon--dark" />
        </button>
        <button className="btn--slider rooms__btn--next">
          <IoChevronForwardOutline className="icon--sm icon--dark" />
        </button>
        <span className="f-lg c-grace ml-1">Slide to see other options</span>
      </div>
      <div>
      <Swiper 
        className="rooms__list"
        simulateTouch={false}
        slidesPerView={3}
        spaceBetween={20}
        onInit={(sw) => setSwiper(sw)}
        navigation={{
          nextEl: '.rooms__btn--next',
          prevEl: '.rooms__btn--prev',
          disabledClass: 'btn--slider-disabled'
        }}>
        {options}
      </Swiper>
      </div>
    </div>
  );
};

export default Rooms;
