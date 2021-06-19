import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import { IoChevronBackOutline, IoChevronForwardOutline, IoSchoolOutline } from 'react-icons/io5';
import { TiLocationOutline } from 'react-icons/ti';
import { useTranslation } from 'react-i18next';
import { FcAbout } from 'react-icons/fc';
import { BiDoorOpen } from 'react-icons/bi';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import './SimilarAds.scss';
import img from '../../../assets/images/naomi-hebert-MP0bgaS_d1c-unsplash.jpg';
import useFetchData from '../../../hooks/useFetchData';
import Spinner from '../../../components/UI/Spinner/Spinner';

SwiperCore.use([Navigation]);

const SimilarAds = ({ data }) => {
  const { data: similarProperties, loading, error, makeRequest } = useFetchData();
  const [swiper, setSwiper] = useState(null);
  const { t } = useTranslation('regions');

  useEffect(() => {
    if (data) {
      const prices = data.roomOptions.map(el => el.price);
      
      const 
        priceMin = Math.min(...prices),
        priceMax = Math.max(...prices);

      makeRequest({
        url: `api/apartments?city=${data.city}&price[from]=${priceMin}&price[to]=${priceMax}&project=city,region,price,_id,offers&limit=8&_id[ne]=${data._id}`,
        dataAt: ['data', 'docs']
      });
    }
  }, [makeRequest, data]);

  useEffect(() => {
    swiper && swiper.update();
  });

  const properties = similarProperties?.map((el, i) => {
    const offers = [];
    el.offers && el.offers.forEach(el => el.forEach(offer => offers.push(offer)));
    return (
      <SwiperSlide className="sads__item" key={i}>
        <Link className="wh-100 inline" to={`/${el.city}/${el.region}/${el._id}`}>
          <figure className="sads__item__figure">
            <img className="img img--contain" alt="asfd" src={img} />
            {offers.length > 0 && (
              <span className="sads__item__tag">
                {offers.length} offer/s
              </span>
            )}
          </figure>
          <div className="sads__item__body">
            <span className="sads__item__title">Apartment {i + 1}</span>
            <span className="sads__item__spec">
              <TiLocationOutline className="icon--sm icon--green mr-1" />
              {t(`regions:${el.city}.title`)}, {t(`regions:${el.city}.regions.${el.region}`)} district
            </span>
            <span className="sads__item__spec">
              <BiDoorOpen className="icon--sm icon--green mr-1" />
              {el.price.length} Rooming options
            </span>
            <span className="sads__item__spec">
              <IoSchoolOutline className="icon--sm icon--green mr-1" />
              Universities: Webster, INHA, Westminster
            </span>
            <span className="btn--sub">More</span>
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
    );
  });

  if (loading) {
    return (
      <div className="container">
        <div className="flex jcc">
          <Spinner className="adview__loader loader--lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="sads"> 
      {similarProperties?.length > 0 && (
        <>
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
        </>
      )}
      {similarProperties?.length > 0
        ? (
          <Swiper 
            onInit={(sw) => setSwiper(sw)}
            navigation={{
              nextEl: '.sads__btn--next',
              prevEl: '.sads__btn--prev',
              disabledClass: 'btn--slider-disabled'
            }}
            className="sads__list"
            slidesPerView={3}
            spaceBetween={65}>
              {properties}
          </Swiper>
        )
        : (
          <span className="sads__empty">
            <FcAbout className="sads__empty__icon mb-2" />
            No similar properties are found
          </span>
        )
      }
    </div>
  );
}

export default React.memo(SimilarAds);
