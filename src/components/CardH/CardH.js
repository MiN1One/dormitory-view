import { BiCheckDouble } from "react-icons/bi";
import { AiFillTag } from "react-icons/ai";
import { IoIosSchool } from "react-icons/io";
import { ImImage } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

import 'swiper/swiper.scss';

import image from '../../assets/images/minh-pham-OtXADkUh3-I-unsplash.jpg';
import './CardH.scss';

SwiperCore.use([Autoplay]);

const CardH = ({ data }) => {
  return (
    <Link to="/" className="cardh">
      <figure className="cardh__figure">
        <LazyLoadImage
          className="img img--cover"
          src={image}
          alt="image"
          width="100%"
          height="100%"
          effect="opacity"
          placeholder={
            <div className="wh-100 flex aic jcc">
              <ImImage className="icon--lg" />
            </div>
          } />
        <div className="cardh__panel">
          <Swiper 
            loopFillGroupWithBlank={true}
            autoplay={{ delay: 3000 }}
            direction="vertical"
            slidesPerView={1}>
              <SwiperSlide className="flex aic">
                <AiFillTag className="icon--xs icon--yellow" />&nbsp;Discount $200
              </SwiperSlide>
              <SwiperSlide className="flex aic">
                <AiFillTag className="icon--xs icon--yellow" />&nbsp;Hehe boay
              </SwiperSlide>
          </Swiper>
        </div>
      </figure>
      <div className="cardh__body">
        <span className="text--title mb-1 flex aic">
          Tashkent city Apt
          <div className="ml-5 flex aic">
            <BiCheckDouble className="icon--xs icon--dark" />
          </div>
        </span>
        <div className="text--xs mb-1">
          From <span className="price-tag">$255</span> / Week
        </div>
        <div className="text--xs">
          <div className="flex aic mb-5">
            <IoIosSchool className="icon--xs icon--grey mr-1" />
            Again Some University | <span className="c-grace">&nbsp;Walking 15mins</span>
          </div>
          <div className="flex aic">
            <IoIosSchool className="icon--xs icon--grey mr-1" />
            Some University | <span className="c-grace">&nbsp;Walking 30mins</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardH;