import React from 'react';
import { BiStar } from 'react-icons/bi';
import { IoIosStarOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

import './Card.scss';

const Card = ({ slide }) => {
  return (
    <li className={`cardl ${slide ? 'cardl--3' : 'cardl--2'}`}>
      <Link to="/" className="cardl__content">

      </Link>
      <div className="cardl__btn-group">
        {/* <button className="cardl__btn">
          <IoIosStarOutline className="icon icon--grey" />
        </button> */}
      </div>
    </li>
  );
};

export default Card;
