import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { RiPencilLine } from 'react-icons/ri';
import { BsPlus, BsTrash } from 'react-icons/bs';
import { FaHouseDamage } from 'react-icons/fa';
import { GiBathtub, GiDoor, GiKnifeFork } from 'react-icons/gi';
import { BiDollar } from 'react-icons/bi';

SwiperCore.use([Navigation]);

const Rooms = () => {

  const rooms = Array.from(Array(5).keys()).map((el, i) => (
    <SwiperSlide className="post__room" key={i} tabIndex="0">
      <div className="post__room__head">
        <div className="post__room__title">Room {i+1}</div>
      </div>
      <div className="post__room__body">
        <div className="post__room__item">
          <span className="post__room__icon">
            <FaHouseDamage className="icon--xs icon--green" />
          </span>
          <span className="f-mid-w">Condition:</span>&nbsp;&nbsp;Medium
        </div>
        <span className="post__room__item">
          <span className="post__room__icon">
            <GiDoor className="icon--xs icon--green" />
          </span>
          <span className="f-mid-w">Rooms:</span>&nbsp;&nbsp;4
        </span>
        <span className="post__room__item">
          <span className="post__room__icon">
            <GiKnifeFork className="icon--xs icon--green" />
          </span>
          <span className="f-mid-w">Kitchen:</span>&nbsp;&nbsp;Public
        </span>
        <span className="post__room__item">
          <span className="post__room__icon">
            <GiBathtub className="icon--xs icon--green" />
          </span>
          <span className="f-mid-w">Kitchen:</span>&nbsp;&nbsp;Private
        </span>
        <span className="post__room__item">
          <span className="post__room__icon">
            <BiDollar className="icon--xs icon--green" />
          </span>
          <span className="f-mid-w">Price:</span>&nbsp;&nbsp;$350 / month
        </span>
      </div>
      <div className="post__room__btn-group">
        <button className="post__room__btn">Edit</button>
        <button className="post__room__btn">Remove</button>
      </div>
    </SwiperSlide>
  ));

  return (
    <div className="post__section" id="rooms">
      <div className="container">
        <div className="post__title post__title--lg">
          Room options
        </div>
        <div className="flex aic jcsb">
          <div className="flex aic mb-2">
            <div div className="flex mr-15">
              <button className="btn--slider post__room--prev">
                <IoChevronBackOutline className="icon--sm icon--dark" />
              </button>
              <button className="btn--slider post__room--next">
                <IoChevronForwardOutline className="icon--sm icon--dark" />
              </button> 
            </div>
            <span className="f-mid c-grey-l">Slide to view other rooms</span>
          </div>
          <button className="post__btn-main">
            <BsPlus className="icon--sm mr-5" />
            Add option
          </button>
        </div>
        <Swiper
          navigation={{
            prevEl: '.post__room--prev',
            nextEl: '.post__room--next',
            disabledClass: 'btn--slider-disabled'
          }}
          className="post__rooms"
          slidesPerView={4}
          spaceBetween={30}
          simulateTouch={false}>
            {rooms}
        </Swiper>
      </div>
    </div>
  );
}

export default Rooms;
