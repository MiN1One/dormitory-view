import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { BsPen } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { BiMinus } from 'react-icons/bi';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import RoomAddModal from './RoomAddModal';
import './Rooms.scss';

SwiperCore.use([Navigation]);

const Rooms = ({ data, setData }) => {
  const [modal, setModal] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const { t } = useTranslation();
  const [forEdit, setForEdit] = useState(null);

  useEffect(() => swiper && swiper.update());

  const onRemoveRoom = (index) => {
    const newList = data.roomOptions.filter((_, i) => i !== index);
    setData(p => ({
      ...p,
      roomOptions: newList
    }));
  };

  const setValue = (field) => field ? 'Yes' : 'No';

  console.log(data);

  const rooms = data.roomOptions.map((el, i) => (
    <SwiperSlide className="rooms__item" key={i+Date.now()} tabIndex="0">
      <div className="rooms__head">
        <div className="rooms__title">Room option {i+1}</div>
        <div className="flex">
          <button 
            className="rooms__btn" 
            onClick={() => {
              setForEdit(i);
              setModal(true);
            }}
          >
            <BsPen className="icon--xs icon--dark" />
          </button>
          <button className="rooms__btn" onClick={() => onRemoveRoom(i)}>
            <BiMinus className="icon--xs icon--dark" />
          </button>
        </div>
      </div>
      <div className="rooms__body">
        <div className="rooms__feature">
          <span className="f-mid-w">Condition:</span>
          {el.condition}
        </div>
        <span className="rooms__feature">
          <span className="f-mid-w">Rooms:</span>
          {el.numberOfRooms}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Kitchen:</span>
          {el.kitchen}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Bath:</span>
          {el.bath}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Air conditioner:</span>
          {setValue(el.air_condition)}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Computer:</span>
          {setValue(el.computer)}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Parking:</span>
          {setValue(el.parking)}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Furnitured:</span>
          {setValue(el.furnitured)}
        </span>
        <span className="rooms__feature">
          <span className="f-mid-w">Washing machine:</span>
          {setValue(el.washing_machine)}
        </span>
      </div>
      <div className="rooms__footer">
        <span className="rooms__feature rooms__feature--price">
          ${el.price} / month
        </span>
      </div>
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
