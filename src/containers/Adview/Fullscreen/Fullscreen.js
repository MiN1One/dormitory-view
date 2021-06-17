import React, { useCallback, useEffect, useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { Swiper, SwiperSlide } from "swiper/react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import 'swiper/swiper.scss';

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
          <div className="fulls__body">
            <figure className="fulls__figure">
              <button onClick={props.close} className="fulls__btn-close">
                <VscClose className="icon icon--white" />
              </button>
              {!loading
                ? (
                  <>
                    <img className="img img--contain" alt="img" src={props.img} />
                    <div className="fulls__btn-group">
                      <div className="flex">
                        <button className="btn--slider fulls__btn-slider--prev">
                          <IoChevronBackOutline className="icon--sm icon--dark" />
                        </button>
                        <button className="btn--slider fulls__btn-slider--next">
                          <IoChevronForwardOutline className="icon--sm icon--dark" />
                        </button>
                      </div>
                      <div className="te">
                        <h5 className="heading heading--3 f-thin c-white">Apartment Interior</h5>
                        <span className="f-lg c-white mb-5 inline">Room option 1</span>
                        <p className="f-mid c-light f-thin">Press Escape to exit the screen</p>
                      </div>
                    </div>
                  </>
                )
                : (
                  <div className="full__loading">
                    <h1 className="c-light">Loading</h1>
                  </div>
                )
              }
            </figure>
            <Swiper 
              className="fulls__list"
              slidesPerView={5}
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