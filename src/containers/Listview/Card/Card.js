import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiDoorOpen } from 'react-icons/bi';
import { BsBuilding, BsLayers, BsStar, BsStarFill } from 'react-icons/bs';
import { IoSchoolOutline } from 'react-icons/io5';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useEditFavorites from '../../../hooks/useEditFavorites';
import { convertISOString, formatPrice } from '../../../utilities/utils';

import './Card.scss';

const Card = ({ slide, data, symbol }) => {
  const { t } = useTranslation('regions');
  const { favorites, editFavorites } = useEditFavorites();
  const { months } = useSelector(s => s.main);

  const { date, month, hours, minutes } = convertISOString(data.createdAt);

  console.log(data.offers);
  const offersCount = data.offers && data.offers.find(el => el.length > 0)?.length;

  return (
    <li className={`cardl ${slide ? 'cardl--3' : 'cardl--2'}`} tabIndex="0">
      <Link to={`/list/${data.city}/${data.region}/${data._id}`} className="cardl__content">
        <div className="cardl__main">
          <div className="cardl__top">
            <figure className="cardl__figure">
              <LazyLoadImage
                src={`/images/apartments/${data._id}/${data.imageCover}`}
                width="100%"
                height="100%"
                alt={data.title}
                className="img img--cover" />
              {offersCount && (
                <div className="cardl__tag">
                  {offersCount} offer/s
                </div>
              )}
            </figure>
            <div className="cardl__right">
              <span className="cardl__title">
                {data.title}
              </span>
              <span className="flex mb-5 c-grace">{t(`regions:${data.city}.title`)}</span>
              <span className="flex mb-5 c-grace">{t(`regions:${data.city}.regions.${data.region}`)}</span>
              <span className="flex aic mb-5">
                <BsBuilding className="icon--xs icon--grey mr-5" />
                <span className="cardl__label">Type:</span>&nbsp;<span className="f-sm f-thin c-grace">{data.ownership}</span>
              </span>
              <span className="flex aic mb-5">
                <BiDoorOpen className="icon--xs icon--grey mr-5" />
                <span className="cardl__label">Room</span>&nbsp;
                <span className="f-mid-w c-grey f-sm">Options:</span>&nbsp;
                <span className="f-sm f-thin c-grace">{data.price.length}</span>
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
        </div>
        <div className="cardl__footer">
          <span className="c-grey-l f-xs">{date} {months[month]} {hours}:{minutes}</span>
          <span className="cardl__price">
            <span className="f-sm f-normal c-grace">from </span>
            {formatPrice(data.price[0])} {symbol}
            <span className="f-sm f-normal c-grace"> / month</span>
          </span>
        </div>
      </Link>
      <div className="cardl__btn-group">
        <button className="cardl__btn tooltip" onClick={() => editFavorites(data._id)}>
          {favorites?.includes(data._id) 
            ? (
              <>
                <BsStarFill className="icon--sm icon--yellow" />
                <div className="tooltip__text tooltip__text--top cardl__tooltip">
                  Remove from favorites
                </div>
              </>
            )
            : (
              <>
                <BsStar className="icon--sm icon--grey" />
                <div className="tooltip__text tooltip__text--top cardl__tooltip">
                  Add to wish list
                </div>
              </>
            )
          }
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

export default React.memo(Card);
