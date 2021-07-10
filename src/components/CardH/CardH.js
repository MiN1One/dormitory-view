import { memo } from 'react';
import { BiCheckDouble, BiDoorOpen } from "react-icons/bi";
import { AiFillTag } from "react-icons/ai";
import { ImImage } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { IoSchoolOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { useTranslation } from "react-i18next";

import 'swiper/swiper.scss';

import './CardH.scss';

SwiperCore.use([Autoplay]);

const CardH = ({ data }) => {
  const { t } = useTranslation(['regions', 'translation']);

  let offers = [];
  data.offers?.forEach(el => {
    offers = [...offers, ...el];
  });

  const offerSlides = offers.map((el, i) => (
    <SwiperSlide className="flex aic" key={i}>
      <AiFillTag className="icon--xs icon--yellow" />&nbsp;{t(`translation:offer.${el.type}`)} {el.value}
    </SwiperSlide>
  ));

  return (
    <Link to={`/list/${data.city}/${data.region}/${data._id}`} className="cardh" key={data._id}>
      <figure className="cardh__figure">
        <LazyLoadImage
          className="img img--cover"
          src={`/images/apartments/${data._id}/${data.imageCover}`}
          alt="image"
          width="100%"
          height="100%"
          effect="opacity"
          placeholder={
            <div className="wh-100 flex aic jcc">
              <ImImage className="icon--lg icon--grey" />
            </div>
          } />
        {offers.length > 0 && (
          <div className="cardh__panel">
            <Swiper 
              loopFillGroupWithBlank={true}
              autoplay={{ delay: 3000 }}
              direction="vertical"
              slidesPerView={1}>
                {offerSlides}
            </Swiper>
          </div>
        )}
      </figure>
      <div className="cardh__body">
        <div className="text--title mb-1 flex aic">
          {data.title}
          <BiCheckDouble className="ml-5 icon--xs icon--dark" />
        </div>
        <div className="cardh__specs">
          <div className="cardh__specs__item">
            <IoSchoolOutline className="icon--xs icon--green mr-1" />
            Again Some University | <span className="c-grey-l">&nbsp;15min walk</span>
          </div>
          <div className="cardh__specs__item">
            <IoSchoolOutline className="icon--xs icon--green mr-1" />
            Some University | <span className="c-grey-l">&nbsp;30min walk</span>
          </div>
          <div className="cardh__specs__item">
            <GoLocation className="icon--xs icon--green mr-1" />
            {t(`regions:${data.city}.title`)}, {t(`regions:${data.city}.regions.${data.region}`)}
          </div>
          <button className="tooltip btn--sub">
            More
            <div className="tooltip__text tooltip__text--top cardh__tooltip">
              <div className="cardh__specs__item">
                <BiDoorOpen className="icon--xs icon--green mr-1" />
                Room options: {data.price.length}
              </div>
              <div className="cardh__specs__item">
                <IoSchoolOutline className="icon--xs icon--green mr-1" />
                Again Some University | <span className="c-grey-l">&nbsp;15min walk</span>
              </div>
              <div className="cardh__specs__item">
                <IoSchoolOutline className="icon--xs icon--green mr-1" />
                Some University | <span className="c-grey-l">&nbsp;30min walk</span>
              </div>
            </div>
            </button>
        </div>
      </div>
      <div className="cardh__footer">
        <button className="cardh__price">
          from&nbsp;<span className="price-tag"> ${data.price[0]}</span>&nbsp;/&nbsp;Month
        </button>
      </div>
    </Link>
  );
};

export default memo(CardH);