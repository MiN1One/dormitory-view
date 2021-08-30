import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { AiOutlineTag } from 'react-icons/ai';
import { BsArrowsFullscreen, BsStar, BsStarFill } from 'react-icons/bs';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import Fullscreen from '../Fullscreen/Fullscreen';
import useEditFavorites from '../../../hooks/useEditFavorites';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { preloadImages } from '../../../utilities/utils';

SwiperCore.use([Navigation]);

const IMAGES_PATH = '/images/apartments';

const MainImagery = ({ data, discount, isPreview }) => {
  const [swiper, setSwiper] = useState(null);
  const { favorites, editFavorites } = useEditFavorites();
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => swiper && swiper.update());

  let mainImage = !isPreview 
    ? `${IMAGES_PATH}/${data?._id}/${data?.images[selectedImage]}`
    : data?.images[selectedImage]?.dataUrl;

  useEffect(() => {
    preloadImages(
      mainImage,
      () => setLoading(true),
      () => setLoading(false)
    )
  }, [mainImage]);

  const imageThumbs = data?.images.map((el, i) => {
    let imageSrc = !isPreview
      ? `${IMAGES_PATH}/${data?._id}/${el}`
      : el.file.dataUrl;

    return (
      <SwiperSlide 
        key={i}
        className={`adview__image-item ${selectedImage === i ? 'adview__image-item--active' : ''}`} 
        onClick={() => setSelectedImage(i)}
        tabIndex="0">
          <img 
            className="img img--cover" 
            src={imageSrc} 
            alt="images" />
      </SwiperSlide>
    );
  });

  const roomType = (!isPreview && data.images.length) 
    ? data?.images[selectedImage]?.split('-')[0]
    : data?.images[selectedImage]?.file.name.split('-')[0];

  return (
    <>
      {fullScreen && (
        <Fullscreen 
          id={data?._id}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          close={() => setFullScreen(false)}
          images={data?.images} />
      )}
      <figure className="adview__figure" id="main">
        {loading
          ? <Spinner className="loader--lg" />
          : (
            <img 
              className="img img--cover" 
              src={mainImage} 
              alt="apt" />
          )
        }
        {(!isNaN(discount.discount) && discount.discount) && (
          <span className="adview__tag">
            <AiOutlineTag className="icon--sm icon--yellow mr-5" />
            {discount.discount}% off
          </span>
        )}
        <div className="adview__cover">
          <div className="flex fdc w-100">
            <h1 className="adview__heading mb-5">{data?.title}</h1>
            <div className="f-lg c-light f-thin">{roomType}</div>
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
        spaceBetween={10}
        navigation={{
          prevEl: '.btn--prev',
          nextEl: '.btn--next',
          disabledClass: 'none'
        }}>
          {imageThumbs}
          <button className="btn--imgslider btn--prev">
            <IoChevronBackOutline className="icon--sm icon--white" />
          </button>
          <button className="btn--imgslider btn--next">
            <IoChevronForwardOutline className="icon--sm icon--white" />
          </button>
      </Swiper>
    </>
  );
}

export default React.memo(MainImagery);
