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
  selectedImageIndex,
  setSelectedImageIndex,
  images,
  id,
  isPreview
}) => {
  const [loading, setLoading] = useState(false);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const html = document.documentElement;

    if (html.requestFullscreen) {
      html.requestFullscreen();
    } else if (html.webkitRequestFullscreen) {
      html.webkitRequestFullscreen();
    } else if (html.msRequestFullscreen) {
      html.msRequestFullscreen();
    }

    const onFullscreenChange = () => {
      !document.fullscreenElement && 
        close();
    };

    html.style.overflow = 'hidden';

    document.onfullscreenchange = onFullscreenChange;

    return () => {
      html.style.removeProperty('overflow');

      if (!document.fullscreenElement) return;

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }, []);

  useEffect(() => swiper && swiper.update());

  const [roomType, roomOptionNumber] = isPreview
    ? images[selectedImageIndex].file.name.split('-')
    : images[selectedImageIndex].split('-');

  const mainImage = isPreview 
    ? images[selectedImageIndex].dataUrl
    : `${IMAGES_PATH}/${id}/${images[selectedImageIndex]}`;

  useEffect(() => {
    preloadImages(
      mainImage, 
      () => setLoading(true),
      () => setLoading(false)
    );
  }, [mainImage]);

  const imagesEl = images?.map((el, i) => {
    const [roomType] = isPreview
      ? el.file.name.split('-')
      : el.split('-');

    const imageSrc = isPreview
      ? el.dataUrl
      : `${IMAGES_PATH}/${id}/${el}`;

    return (
      <SwiperSlide 
        key={i}
        className={`fulls__item ${selectedImageIndex === i ? 'fulls__item--active' : ''}`}
        tabIndex="0"
        onClick={() => setSelectedImageIndex(i)}>
          <img className="img img--cover" src={imageSrc} alt={roomType} />
      </SwiperSlide>
    )
  });

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
                          onClick={() => setSelectedImageIndex(p => {
                            if (p > 0) return p - 1;
                            else return 0;
                          })}>
                            <IoChevronBackOutline className="icon--sm icon--dark" />
                        </button>
                        <button 
                          className="btn--slider fulls__btn-slider--next"
                          onClick={() => setSelectedImageIndex(p => {
                            if (p < images?.length - 1) return p + 1;
                            else return 0;
                          })}>
                            <IoChevronForwardOutline className="icon--sm icon--dark" />
                        </button>
                      </div>
                      <div className="te">
                        <h5 className="heading heading--3 f-thin c-white">{roomType}</h5>
                        <span className="f-lg c-white mb-5 inline">Room option {roomOptionNumber}</span>
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