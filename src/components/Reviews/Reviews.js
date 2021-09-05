import { memo } from 'react';

import './Reviews.scss';

const Reviews = ({ reviews }) => {

  const reviewsEl = reviews?.length && reviews.map((el, i) => (
    <li key={i} className="reviews__item">
      {el.rating}
    </li>
  ));

  return (
    <div className="reviews" id="reviews">
      <div className="container">
        <div className="reviews__head">

        </div>
        <div className="reviews__body">
          {reviewsEl}
        </div>
        <div className="reviews__footer">

        </div>
      </div>
    </div>
  );
};

export default memo(Reviews);
