import React, { useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { RiImageAddLine } from 'react-icons/ri';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

SwiperCore.use([Navigation]);

const ImageUploadForm = () => {
  const imageUploadRef = useRef();
  const [images, setImages] = useState([]);

  const onUploadImage = useCallback((e) => {
    
  }, []);

  return (
    <div className="post__section" id="images">
      <div className="container">
        <div className="post__title post__title--lg">Images</div>
        <div className="flex jcsb aic mb-2">
          <div className="flex aic">
            <div className="flex mr-15">
              <button className="btn--slider post__image--prev">
                <IoChevronBackOutline className="icon--sm icon--dark" />
              </button>
              <button className="btn--slider post__image-next">
                <IoChevronForwardOutline className="icon--sm icon--dark" />
              </button> 
            </div>
            <span className="f-mid c-grey-l">Slide to view more images</span>
          </div>
          <button 
            className="post__btn-main" 
            onClick={() => imageUploadRef.current.click()}>
              <RiImageAddLine className="icon--xs icon--white mr-5" />
              Upload Photos
          </button>
          <input 
            className="none"
            type="file" 
            accept="image/*" 
            multiple
            ref={imageUploadRef}
            onChange={onUploadImage} />
        </div>
        <div>
          <div className="c-grace f-mid mb-15">Images: 3</div>
          <Swiper
            className="post__images-list"
            slidesPerView={5}
            spaceBetween={15}
            navigation={{
              prevEl: '.post__image--prev',
              nextEl: '.post__image-next',
              disabledClass: 'btn--slider-disabled'
            }}>
              <SwiperSlide className="post__images-item">
                <div className="post__images-title">
                  Room option 1
                </div>
              </SwiperSlide>
              <SwiperSlide className="post__images-item">

              </SwiperSlide>
              <SwiperSlide className="post__images-item">

              </SwiperSlide>
              <SwiperSlide className="post__images-item">

              </SwiperSlide>
              <SwiperSlide className="post__images-item">

              </SwiperSlide>
              <SwiperSlide className="post__images-item">

              </SwiperSlide>
          </Swiper>
          <div className="c-grey-l f-sm">
            You can upload up to 12 images with the max size of 1MB each
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadForm;
