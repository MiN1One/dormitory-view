import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { IoChevronBackOutline, IoChevronForwardOutline, IoHammerOutline } from 'react-icons/io5';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import './Rooms.scss';
import img from '../../../assets/images/dan-gold-4HG3Ca3EzWw-unsplash.jpg';
import { BiDoorOpen } from 'react-icons/bi';
import { GiBathtub, GiKnifeFork } from 'react-icons/gi';
import { useHistory, useLocation } from 'react-router';

SwiperCore.use([Navigation]);

const Rooms = ({ data, selectedIndex, setSelectedIndex }) => {
  const [swiper, setSwiper] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => swiper && swiper.update());

  const options = data?.map((el, i) => {
    const classes = ['rooms__item'];
    if (i === selectedIndex) classes.push('rooms__item--active');
    return (
      <SwiperSlide 
        className={classes.join(' ')} 
        key={i} 
        tabIndex="0"
        onClick={() => {
          setSelectedIndex(i);
          history.push(`${location.pathname}#`);
          setTimeout(() => {
            history.push(`${location.pathname}#details`);
          }, 0);
        }}>
        <figure className="rooms__item__figure">
          <img className="img img--contain" alt="standard" src={img} />
          {i === selectedIndex && <div className="rooms__item__badge">Selected</div>}
        </figure>
        <div className="rooms__item__body">
          <span className="rooms__item__title">Room option {i+1}</span>
          <div className="rooms__item__features">
            <div className="flex aic mb-1">
              <BiDoorOpen className="icon--sm icon--grey mr-1" />
              Rooms: {el.numberOfRooms}
            </div>
            <div className="flex aic mb-1">
              <IoHammerOutline className="icon--sm icon--grey mr-1" />
              Condition: {el.condition}
            </div>
            <div className="flex aic mb-1">
              <GiKnifeFork className="icon--sm icon--grey mr-1" />
              Kitchen: {el.kitchen}
            </div>
            <div className="flex aic">
              <GiBathtub className="icon--sm icon--grey mr-1" />
              Bathroom: {el.bath}
            </div>
          </div>
        </div>
        <div className="rooms__item__footer">
          <span className="rooms__item__price">
            ${el.price}
            <span className="f-sm">&nbsp;/&nbsp;week</span>
          </span>
        </div>
      </SwiperSlide>
    )
  });

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
