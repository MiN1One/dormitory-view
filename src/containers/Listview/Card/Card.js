import React from 'react';
import { BiDoorOpen, BiStar } from 'react-icons/bi';
import { BsBuilding, BsLayers, BsStar, BsStarFill } from 'react-icons/bs';
import { IoSchoolOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import './Card.scss';

const Card = ({ slide }) => {
  return (
    <li className={`cardl ${slide ? 'cardl--3' : 'cardl--2'}`} tabIndex="0">
      <Link to="/city/region/apartment" className="cardl__content">
        <div className="cardl__top">
          <figure className="cardl__figure">
            <div className="cardl__tag">
              2 offers
            </div>
          </figure>
          <div className="cardl__right">
            <span className="cardl__title">
              Apartment title
            </span>
            <span className="flex mb-5 c-grace">Tashkent</span>
            <span className="flex mb-5 c-grace">Mirzo-Ulugbek</span>
            <span className="flex aic mb-5">
              <BsBuilding className="icon--xs icon--grey mr-5" />
              <span className="cardl__label">Type:</span>&nbsp;<span className="f-sm f-thin c-grace">university-owned</span>
            </span>
            <span className="flex aic mb-5">
              <BiDoorOpen className="icon--xs icon--grey mr-5" />
              <span className="cardl__label">Room</span>&nbsp;
              <span className="f-mid-w c-grey f-sm">Options:</span>&nbsp;
              <span className="f-sm f-thin c-grace">5</span>
            </span>
          </div>
        </div>
        <div className="cardl__bottom">
          <div className="mb-1">
            <div className="cardl__school">
              <IoSchoolOutline className="icon--xs icon--grey mr-1" />
              Webster University
              <span className="c-grace f-normal">&nbsp;|&nbsp;15 min walking</span>
            </div>
            <div className="cardl__school">
              <IoSchoolOutline className="icon--xs icon--grey mr-1" />
              INHA University
              <span className="c-grace f-normal">&nbsp;|&nbsp;5-7 min by car</span>
              <button className="btn--sub cardl__btn-sub ml-1 tooltip">
                2 More
                <div className="tooltip__text tooltip__text--top cardl__tooltip--main">
                  <div className="f-sm c-white mb-1">
                    Webster University
                    <span className="c-light">&nbsp;|&nbsp;15 min walking</span>
                  </div>
                  <div className="f-sm c-white">
                    INHA University
                    <span className="c-light">&nbsp;|&nbsp;5-7 min by car</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex jce">
          <span className="cardl__price">
            <span className="f-sm f-normal c-grace">from </span>
            $355
            <span className="f-sm f-normal c-grace"> / week</span>
          </span>
        </div>
      </Link>
      <div className="cardl__btn-group">
        <button className="cardl__btn tooltip">
          <BsStar className="icon--sm icon--grey" />
          <div className="tooltip__text tooltip__text--top cardl__tooltip">
            Add to favorites
          </div>
        </button>
        <button className="cardl__btn tooltip">
          <BsLayers className="icon--sm icon--grey" />
          <div className="tooltip__text tooltip__text--bottom cardl__tooltip">
            Compare
          </div>
        </button>
      </div>
    </li>
  );
};

export default Card;
