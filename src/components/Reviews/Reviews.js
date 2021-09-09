import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useFetchData from '../../hooks/useFetchData';
import { convertISOString } from '../../utilities/utils';
import RatingsStars from '../UI/RatingStars/RatingsStars';
import './Reviews.scss';

const Reviews = ({ userId }) => {
  const { data, loading, error, makeRequest } = useFetchData({ loading: true });
  const { months } = useSelector(s => s.main);

  useEffect(() => {
    makeRequest({
      url: `api/users/${userId}/reviews`,
      dataAt: ['data', 'docs']
    });
  }, [makeRequest, userId]);

  const reviewsEl = data?.map((el, i) => {
    const { month, date, year } = convertISOString(el.createdAt);

    return (
      <li className="reviews__item" key={i}>
        <div className="flex ais jcsb mb-1">
          <div className="flex fdc w-100">
            <span className="reviews__user mb-5">{el?.poster.name}</span>
            <span className="reviews__subtext reviews__subtext--s">Stay duration: {el.livedFor}</span>
          </div>
          <span className="reviews__subtext w-50">{year} {date} {months[month]}</span>
        </div>
        <div className="flex aic f-thin f-sm mb-1">
          <RatingsStars initialRating={el.rating} readonly />
          <span className="ml-5">{el.rating}</span>
        </div>
        <p className="reviews__text">
          {el.review}
        </p>
        <button className="btn--sub" >
          Read
        </button>
      </li>
    );
  });

  return (
    <div className="reviews" id="reviews">
      <div className="container">
        <div className="reviews__head">
          <div className="heading heading--5 c-black mb-2">Reviews</div>
        </div>
        <ul className="reviews__body">
          {reviewsEl}
        </ul>
        <div className="reviews__footer">

        </div>
      </div>
    </div>
  );
};

export default memo(Reviews);
