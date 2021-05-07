import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { IoMdCheckmark } from 'react-icons/io';
import { RiImageAddLine } from 'react-icons/ri';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import './Post.scss';
import Scrollbar from '../../components/UI/Scrollbar/Scrollbar';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';

SwiperCore.use([Navigation]);

const Post = () => {
  const imageUploadRef = useRef();

  const onUploadImage = (e) => {
    
  };

  return (
    <main className="post">
      <div className="post__float">
        <div className="container">
          <div className="flex jce">
            <button className="btn--rounded">
              <IoMdCheckmark className="icon icon--white mr-1" />
              Post
            </button>
          </div>
        </div>
      </div>
      <SpyNavigation 
        items={['images', 'details', 'facilites', 'offers']} />
      <div className="post__head">
        <div className="container">
          <Breadcrumbs 
            white
            items={[{ title: 'Post', path: '/post/new', active: true }]}/>
          <div className="post__images" id="images">
            <div className="flex jcsb aic mb-2">
              <div className="flex aic">
                <div className="flex mr-15">
                  <button className="btn--slider post__btn-slider--prev">
                    <IoChevronBackOutline className="icon--sm icon--dark" />
                  </button>
                  <button className="btn--slider post__btn-slider--next">
                    <IoChevronForwardOutline className="icon--sm icon--dark" />
                  </button> 
                </div>
                <span className="f-mid c-grey-l">Slide to view more images</span>
              </div>
              <button 
                className="post__btn-upload" 
                onClick={() => imageUploadRef.current.click()}>
                  <RiImageAddLine className="icon icon--white mr-5" />
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
                className="post__images__list"
                slidesPerView={5}
                spaceBetween={15}
                navigation={{
                  prevEl: '.post__btn-slider--prev',
                  nextEl: '.post__btn-slider--next',
                  disabledClass: 'btn--slider-disabled'
                }}>
                  <SwiperSlide className="post__images__item">

                  </SwiperSlide>
                  <SwiperSlide className="post__images__item">

                  </SwiperSlide>
                  <SwiperSlide className="post__images__item">

                  </SwiperSlide>
                  <SwiperSlide className="post__images__item">

                  </SwiperSlide>
                  <SwiperSlide className="post__images__item">

                  </SwiperSlide>
                  <SwiperSlide className="post__images__item">

                  </SwiperSlide>
              </Swiper>
              <div className="c-grey-l f-sm">
                You can upload up 12 images with size of 1MB each
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="post__body">
        <div className="container">
          <div className="post__group">
            <label className="input__label post__input-group">
              <span className="post__title">Title</span>
              <input 
                className="post__input input input--main" 
                placeholder="Property Title"
                minLength="5"
                type="text" />
              <span className="input__label-text">25 Characters left</span>
            </label>
            <label className="input__label post__input-group">
              <span className="post__title">Description (Optional)</span>
              <textarea 
                className="post__input input input--main" 
                placeholder="Brief description"
                minLength="5"
                type="text" />
              <span className="input__label-text">25 Characters left</span>
            </label>
          </div>
          <div className="post__group">
            <div className="post__list">
              <input className="post__input input input--main" />
              <Scrollbar style={{ width: '100%', height: '' }}>
                
              </Scrollbar>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(Post);
