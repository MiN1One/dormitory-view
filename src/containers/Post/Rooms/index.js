import React, { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import RoomAddModal from './Modal';
import './index.scss';
import RoomOptionCard from './RoomOptionCard';

SwiperCore.use([Navigation]);

const Rooms = ({ data, setData }) => {
  const [modal, setModal] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const { t } = useTranslation();
  const [forEdit, setForEdit] = useState(null);

  useEffect(() => swiper && swiper.update());

  const onRemoveRoom = useCallback((index) => {
    const newList = data.roomOptions.filter((_, i) => i !== index);
    setData(p => ({
      ...p,
      roomOptions: newList
    }));
  }, [data, setData]);

  const rooms = data.roomOptions.map((el, i) => (
    <SwiperSlide className="rooms__item" key={i+Date.now()} tabIndex="0">
      <RoomOptionCard
        data={el}
        index={i}
        setData={setData}
        onRemoveRoom={() => onRemoveRoom(i)}
        onEdit={() => {
          setForEdit(i);
          setModal(true);
        }} />
    </SwiperSlide>
  ));

  return (
    <>
      {modal && (
        <RoomAddModal 
          setData={setData}
          data={data}
          close={() => setModal(false)}
          editIndex={forEdit}
          resetEditIndex={() => setForEdit(null)} />
      )}
      <div className="post__section" id="rooms">
        <div className="container">
          <div className="post__title post__title--lg">Room options</div>
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
            <button 
              className="post__btn-main" 
              onClick={() => setModal(true)}>
                Add option
            </button>
          </div>
          <Swiper
            navigation={{
              prevEl: '.post__room--prev',
              nextEl: '.post__room--next',
              disabledClass: 'btn--slider-disabled'
            }}
            className="rooms"
            slidesPerView={3}
            spaceBetween={25}
            simulateTouch={false}
            onInit={(sw) => setSwiper(sw)}>
              {rooms}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default React.memo(Rooms);
