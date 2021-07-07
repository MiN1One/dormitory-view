import React from 'react';
import { IoHammer } from 'react-icons/io5';
import { FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosSchool } from 'react-icons/io';
import { GiBathtub, GiDoor, GiKnifeFork } from 'react-icons/gi';

import { convertISOString } from '../../../utilities/utils';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

const DISTANCES = [
  {
    name: 'Webster University',
    walk: '20 minutes',
    car: '5-7 minutes'
  },
  {
    name: 'National Institute of Architecture',
    walk: '20 minutes',
    car: '5-7 minutes'
  },
];

const Details = ({ data, selectedOption, discount }) => {
  const { months } = useSelector(s => s.main);
  const { t } = useTranslation();
  const history = useHistory();

  const createdDate = convertISOString(data?.createdAt);
  const distances = DISTANCES.map((el, i) => 
    <li className="adview__specs-separate" key={i}>
      to {el.name} &mdash; <span className="c-grace">{el.walk} walking | {el.car} by car</span>
    </li>
  );

  return (
    <div className="w-100" id="details">
      <div className="adview__outline">
        <h3 className="heading heading--3">Details</h3>
        <span className="f-thin c-grey-l f-sm w-max">
          Updated at: {createdDate.date} {months[createdDate.month]} {createdDate.hours}:{createdDate.minutes}&nbsp;&nbsp;|&nbsp;&nbsp;Number of views: {data?.numberOfViews}&nbsp;&nbsp;|&nbsp;&nbsp;In favorites: {data?.inFavorites}
        </span>
      </div>
      <div className="mb-lg">
        <div className="flex mb-2 aic">
          <span className="adview__details">
            <FaMapMarkerAlt className="icon--grey icon--sm mr-1" />
            Address:
          </span>
          {data?.city}, {data?.region} district, {data?.address}
        </div>
        <div className="flex mb-2 aic">
          <span className="adview__details">
            <FaBuilding className="icon--grey icon--sm mr-1" />
            Type:
          </span>
          {data?.ownership}
        </div>
        <div className="flex mb-2 ais">
          <span className="adview__details">
            <IoIosSchool className="icon--grey icon--sm mr-1" />
            Distance
          </span>
          <ul className="flex fdc">{distances}</ul>
        </div>
        <div className="flex mb-2 aic">
          <span className="adview__details">
            <GiDoor className="icon--grey icon--sm mr-1" />
            Number of rooms:
          </span>
          {data?.roomOptions[selectedOption].numberOfRooms}
        </div>
        <div className="flex mb-2 aic">
          <span className="adview__details">
            <IoHammer className="icon--grey icon--sm mr-1" />
            Condition:
          </span>
          {data?.roomOptions[selectedOption].condition}
        </div>
        <div className="flex mb-2 aic">
          <span className="adview__details">
            Price:
          </span>
          ${data?.price} / month
          {discount.priceAfterDiscount && (
            <span>
             &nbsp;,&nbsp;with dicount ${discount.priceAfterDiscount}
            </span>
          )}
        </div>
        <div className="flex ais mb-2">
          <div className="adview__details">
            Facilities:
          </div>
          <div className="">
            <div className="adview__specs-separate">
              <GiKnifeFork className="icon--sm icon--grey mr-1" />
              Kitchen:&nbsp;
              {data?.roomOptions[selectedOption].kitchen 
                ? t('facilities.private')
                : t('facilities.public')
              }
            </div>
            <div className="flex aic">
              <div className="adview__specs-separate m-0">
                <GiBathtub className="icon--sm icon--grey mr-1" />
                Bathroom:&nbsp;
                {data?.roomOptions[selectedOption].bath 
                  ? t('facilities.private')
                  : t('facilities.public')
                }
              </div>
              <button 
                className="btn--sub ml-5" 
                onClick={() => history.push('#features')}>
                  More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Details);
