import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { AiOutlineTag } from 'react-icons/ai';
import { BsArrowsFullscreen, BsStar, BsStarFill } from 'react-icons/bs';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import useEditFavorites from '../../../hooks/useEditFavorites';

SwiperCore.use([Navigation]);

const IMAGES_PATH = '/images/apartments';

const MainImagery = ({ data, discount, setFullScreen }) => {
  const [swiper, setSwiper] = useState(null);
  const { favorites, editFavorites } = useEditFavorites();

  useEffect(() => swiper && swiper.update());

  const imageThumbs = data?.images.map((el, i) => (
    <SwiperSlide 
      key={i}
      className={`adview__image-item ${(swiper && swiper.activeIndex === i) ? 'adview__image-item--active' : ''}`} 
      onClick={() => {}}
      tabIndex="0">
        <img 
          className="img img--contain" 
          src={`${IMAGES_PATH}/${data?._id}/${el}`} 
          alt="images" />
    </SwiperSlide>
  ));

  return (
    <>
      <figure className="adview__figure" id="main">
        {/* <Spinner className="wh-100 loader--lg" /> */}
        <img className="img img--cover" src={`${IMAGES_PATH}/${data?._id}/${data?.images[0]}`} alt="apt" />
        {discount.discount && (
          <span className="adview__tag">
            <AiOutlineTag className="icon--sm icon--yellow mr-5" />
            {discount.discount}% off
          </span>
        )}
        <div className="adview__cover">
          <div className="flex fdc w-100">
            <h1 className="adview__heading mb-5">{data?.title}</h1>
            <div className="f-lg c-light f-thin">Main hall</div>
          </div>
          <div className="flex aic">
            <button className="tooltip mr-2" onClick={() => editFavorites(data?._id)}>
              {favorites && favorites.includes(data?._id) 
                ? (
                  <>
                    <BsStarFill className="icon icon--yellow" />
                    <div className="tooltip__text tooltip__text--top tooltip__text--center">
                      Remove from favorites
                    </div>
                  </>
                )
                : (
                  <>
                    <BsStar className="icon" />
                    <div className="tooltip__text tooltip__text--top tooltip__text--center">
                      Add to wish list
                    </div>
                  </>
                )
              }
            </button>
            <button className="tooltip mr-2" onClick={() => setFullScreen(true)}>
              <BsArrowsFullscreen className="icon" />
              <div className="tooltip__text tooltip__text--top tooltip__text--center">
                Full screen
              </div>
            </button>
            <div className="adview__price-tag">
              <div 
                className={`adview__price-tag__price ${discount.discount ? 'adview__price-tag__price--ds' : ''}`}>
                  ${data?.price && data?.price}
                  {discount.priceAfterDiscount && (
                    <span className="adview__price-tag__discount">
                      ${discount.priceAfterDiscount}
                    </span>
                  )}
              </div>
              <span className="f-light f-sm">&nbsp;/&nbsp;month</span>
            </div>
          </div>
        </div>
      </figure>
      <Swiper 
        className="adview__images"
        onInit={(sw) => setSwiper(sw)}
        slidesPerView={4}
        simulateTouch={false}
        spaceBetween={10}
        navigation={{
          prevEl: '.adview__btn-imgslider--prev',
          nextEl: '.adview__btn-imgslider--next',
          disabledClass: 'adview__btn-imgslider--disabled'
        }}>
          {imageThumbs}
          <button className="adview__btn-imgslider adview__btn-imgslider--prev">
            <IoChevronBackOutline className="icon--sm icon--white" />
          </button>
          <button className="adview__btn-imgslider adview__btn-imgslider--next">
            <IoChevronForwardOutline className="icon--sm icon--white" />
          </button>
      </Swiper>
    </>
  );
}

export default React.memo(MainImagery);
