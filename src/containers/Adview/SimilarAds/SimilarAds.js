import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import { IoChevronBackOutline, IoChevronForwardOutline, IoSchoolOutline } from 'react-icons/io5';
import { TiLocationOutline } from 'react-icons/ti';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import './SimilarAds.scss';
import img from '../../../assets/images/naomi-hebert-MP0bgaS_d1c-unsplash.jpg';
import { BiDoorOpen } from 'react-icons/bi';
import useFetchData from '../../../hooks/useFetchData';
import { useTranslation } from 'react-i18next';

SwiperCore.use([Navigation]);

const SimilarAds = ({ data: rawData }) => {
  const { data, loading, error, makeRequest } = useFetchData();
  const [swiper, setSwiper] = useState(null);
  const { t } = useTranslation('regions');

  useEffect(() => {
    if (rawData) {
      const 
        priceMin = Math.min(...rawData.price),
        priceMax = Math.max(...rawData.price);

      makeRequest({
        url: `api/apartments?region[regex]=\\b(${rawData.region})\\b&city=${rawData.city}&price[from]=${priceMin}&price[to]=${priceMax}&project=city,region,price,_id&limit=8&_id[ne]=${rawData._id}`,
        dataAt: ['data', 'docs']
      });
    }
  }, [makeRequest, rawData]);

  console.log(data);

  useEffect(() => {
    swiper && swiper.update();
  });

  const properties = data?.map((el, i) => (
    <SwiperSlide className="sads__item" key={i}>
      <Link className="wh-100 inline" to={`/${el.city}/${el.region}/${el._id}`}>
        <figure className="sads__item__figure">
          <img className="img img--contain" alt="asfd" src={img} />
        </figure>
        <div className="sads__item__body">
          <span className="sads__item__title">Apartment {i + 1}</span>
          <span className="flex aic mb-1">
            <TiLocationOutline className="icon--sm icon--green mr-1" />
            {t(`regions:${el.city}.title`)}, {t(`regions:${el.city}.regions.${el.region}`)} district
          </span>
          <span className="flex aic mb-1">
            <BiDoorOpen className="icon--sm icon--green mr-1" />
            {el.price.length} Options
          </span>
          <span className="flex aic">
            <IoSchoolOutline className="icon--sm icon--green mr-1" />
            Universities: Webster, INHA, Westminster
          </span>
        </div>
        <div className="sads__item__footer">
          <span className="sads__item__price">
            <span className="f-sm">from&nbsp;</span>
            ${el.price[0]}
            <span className="f-sm">&nbsp;/&nbsp;month</span>
          </span>
        </div>
      </Link>
    </SwiperSlide>
  ));

  if (loading) 
    return <div className="">Loading...</div>;

  return (
    <div className="sads"> 
      <h3 className="heading heading--3 mb-15">Similar properties</h3>
      <div className="flex w-100 mb-2 aic">
        <button className="btn--slider sads__btn--prev">
          <IoChevronBackOutline className="icon--sm icon--dark" />
        </button>
        <button className="btn--slider sads__btn--next">
          <IoChevronForwardOutline className="icon--sm icon--dark" />
        </button>
        <span className="ml-1 f-lg c-grace ml-1">Slide to see more properties</span>
      </div>
      {data && data.length > 0
        ? (
          <Swiper 
            onInit={(sw) => setSwiper(sw)}
            navigation={{
              nextEl: '.sads__btn--next',
              prevEl: '.sads__btn--prev',
              disabledClass: 'btn--slider-disabled'
            }}
            className="sads__list"
            slidesPerView={4}
            spaceBetween={30}>
              {properties}
          </Swiper>
        )
        : (
          <span className="f-xl f-thin">
            No similar properties found
          </span>
        )
      }
    </div>
  );
}

export default React.memo(SimilarAds);
