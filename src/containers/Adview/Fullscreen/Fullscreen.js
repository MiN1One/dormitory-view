import React, { useEffect, useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { Swiper, SwiperSlide } from "swiper/react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import 'swiper/swiper.scss';

import Spinner from '../../../components/UI/Spinner/Spinner';
import { preloadImages } from '../../../utilities/utils';
import './Fullscreen.scss';

const IMAGES_PATH = '/images/apartments';

const Fullscreen = ({
  close,
  selectedImage,
  setSelectedImage,
  images,
  id
}) => {
  const [loading, setLoading] = useState(false);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => swiper && swiper.update());

  const mainImage = `${IMAGES_PATH}/${id}/${images[selectedImage]}`;

  useEffect(() => {
    preloadImages(
      mainImage, 
      () => setLoading(true),
      () => setLoading(false)
    );
  }, [mainImage]);

  useEffect(() => {
    const onEscape = (e) => e.key === 'Escape' && close();

    document.addEventListener('keydown', onEscape);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.removeAttribute('style');
      document.removeEventListener('keydown', onEscape);
    }
  }, [close]);

  const imagesEl = images?.map((el, i) => (
    <SwiperSlide 
      key={i}
      className={`fulls__item ${(selectedImage === i) ? 'fulls__item--active' : ''}`}
      tabIndex="0"
      onClick={() => setSelectedImage(i)}>
        <img className="img img--contain" src={`${IMAGES_PATH}/${id}/${el}`} alt="images" />
    </SwiperSlide>
  ));

  const roomType = images && images[selectedImage].split('-')[0];

  return (
    <div className="fulls">
      <div className="container">
        <div className="fulls__content">
          <div className="fulls__body">
            <figure className="fulls__figure">
              <button onClick={close} className="fulls__btn-close">
                <VscClose className="icon icon--white" />
              </button>
              {!loading
                ? (
                  <>
                    <img 
                      className="img img--contain" 
                      alt="img" 
                      src={mainImage} />
                    <div className="fulls__btn-group">
                      <div className="flex">
                        <button 
                          className="btn--slider fulls__btn-slider--prev" 
                          onClick={() => setSelectedImage(p => {
                            if (p > 0) return p - 1;
                            else return 0;
                          })}>
                            <IoChevronBackOutline className="icon--sm icon--dark" />
                        </button>
                        <button 
                          className="btn--slider fulls__btn-slider--next"
                          onClick={() => setSelectedImage(p => {
                            if (p < images?.length - 1) return p + 1;
                            else return 0;
                          })}>
                            <IoChevronForwardOutline className="icon--sm icon--dark" />
                        </button>
                      </div>
                      <div className="te">
                        <h5 className="heading heading--3 f-thin c-white">{roomType}</h5>
                        <span className="f-lg c-white mb-5 inline">Room option 1</span>
                        <p className="f-mid c-light f-thin">Press Escape to exit the screen</p>
                      </div>
                    </div>
                  </>
                )
                : (
                  <div className="fulls__loading">
                    <Spinner className="loader--lg" />
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
              navigation={{
                prevEl: '.btn--prev',
                nextEl: '.btn--next',
                disabledClass: 'none'
              }}
              spaceBetween={10}>
                <button className="btn--imgslider btn--prev">
                  <IoChevronBackOutline className="icon--sm icon--white" />
                </button>
                <button className="btn--imgslider btn--next">
                  <IoChevronForwardOutline className="icon--sm icon--white" />
                </button>
                {imagesEl}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Fullscreen);