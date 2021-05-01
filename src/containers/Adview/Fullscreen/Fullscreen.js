import React, { useCallback, useEffect, useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { Swiper, SwiperSlide } from "swiper/react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import 'swiper/swiper.scss';

import img from '../../../assets/images/dan-gold-4HG3Ca3EzWw-unsplash.jpg';
import { preloadImages } from '../../../utilities/utils';
import './Fullscreen.scss';

const Fullscreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(props.activeImageIndex);
  const [swiper, setSwiper] = useState(null);

  const onEscape = useCallback((e) => e.key === 'Escape' && props.close(), []);

  useEffect(() => swiper && swiper.update());
  useEffect(() => swiper && swiper.slideTo(props.activeImageIndex, 250, false), []);

  useEffect(() => {
    preloadImages(
      props.img, 
      () => setLoading(true),
      () => setLoading(false)
    );
  }, [props.img]);

  useEffect(() => {
    document.addEventListener('keydown', onEscape);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.removeAttribute('style');
      document.removeEventListener('keydown', onEscape);
    }
  }, [onEscape]);

  return (
    <div className="fulls">
      <div className="container">
        <div className="fulls__content">
          <div className="flex aic jcsb mb-3">
            <div>
              <h5 className="heading heading--3 f-thin c-white mb-1">Apartment Interior</h5>
              <p className="f-mid c-light f-thin">Press Escape to exit the screen</p>
            </div>
            <button onClick={props.close}>
              <VscClose className="icon--mid icon--white" />
            </button>
          </div>
          <div className="fulls__body">
            <figure className="fulls__figure">
              {!loading
                ? <>
                  <img className="img img--contain" alt="img" src={props.img} />
                  <button className="fulls__btn fulls__btn--prev">
                    <IoChevronBackOutline className="icon--mid" />
                  </button>
                  <button className="fulls__btn fulls__btn--next">
                    <IoChevronForwardOutline className="icon--mid" />
                  </button>
                </>
                : <div className="full__loading">
                  <h1 className="c-light">Loading</h1>
                </div>
              }
            </figure>
            <Swiper 
              className="fulls__list"
              slidesPerView={4}
              id="property"
              onInit={(sw) => setSwiper(sw)}
              simulateTouch={false}
              spaceBetween={10}>
                <SwiperSlide 
                  className={`fulls__item ${(swiper && swiper.activeIndex === 0) ? 'fulls__item--active' : ''}`}
                  tabIndex="0"
                  onClick={() => props.onImageChange(0)}>
                    <img className="img img--contain" src={props.img} alt="imageer" />
                </SwiperSlide>
                <SwiperSlide 
                  className={`fulls__item ${(swiper && swiper.activeIndex === 1) ? 'fulls__item--active' : ''}`}
                  tabIndex="0"
                  onClick={() => props.onImageChange(0)}>
                    <img className="img img--contain" src={props.img2} alt="imageer" />
                </SwiperSlide>
                <SwiperSlide className="fulls__item">
                </SwiperSlide>
                <SwiperSlide className="fulls__item">
                </SwiperSlide>
                <SwiperSlide className="fulls__item">
                </SwiperSlide>
                <SwiperSlide className="fulls__item">
                </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Fullscreen);