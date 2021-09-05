import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import RatingsStars from '../../../components/UI/RatingStars/RatingsStars';
import Spinner from '../../../components/UI/Spinner/Spinner';
import useFetchData from '../../../hooks/useFetchData';
import { convertISOString } from '../../../utilities/utils';

import './Ratings.scss';

const Ratings = ({ open, hide, userId, numberOfReviews }) => {
  const [expandText, setExpandText] = useState([]);
  const [showReviews, setShowReviews] = useState(hide ? false : true);
  const { data, loading, makeRequest } = useFetchData();
  const { months } = useSelector(s => s.main);

  useEffect(() => {
    if (
      showReviews && 
      !data && 
      userId && 
      numberOfReviews > 0
    ) {
      makeRequest({
        url: `api/users/${userId}/reviews`,
        dataAt: ['data', 'docs']
      });
    }
  }, [showReviews, data, userId, makeRequest, numberOfReviews]);

  useEffect(() => {
    if (data && data.length > 0) {
      data.forEach(() => 
        setExpandText(prev => [...prev, false])
      );
    }
  }, [data]);

  const onClickReadMore = (reviewIndex) => {
    setExpandText(prev => 
      prev.map((option, index) => {
        if (index === reviewIndex) {
          option = !option;
        }
        return option;
      })
    );
  };
  
  const reviews = data?.map((el, i) => {
    const { month, date, year } = convertISOString(el.createdAt);

    return (
      <div className="ratings__item" key={i}>
        <div className="flex ais jcsb mb-1">
          <div className="flex fdc w-100">
            <span className="ratings__user mb-5">{el?.poster.name}</span>
            <span className="ratings__subtext ratings__subtext--s">Stay duration: {el.livedFor}</span>
          </div>
          <span className="ratings__subtext w-50">{year} {date} {months[month]}</span>
        </div>
        <div className="flex aic f-thin f-sm mb-1">
          <RatingsStars initialRating={el.rating} readonly />
          <span className="ml-5">{el.rating}</span>
        </div>
        <p className={`ratings__text ${(expandText[i] && el.text.length > 50) ? 'ratings__text--show' : ''}`}>
          {el.review}
        </p>
        <button 
          className="btn--sub" 
          onClick={onClickReadMore}>
            {expandText[i] ? 'Hide' : 'Read'}
        </button>
      </div>
    );
  });

  if (loading) {
    return (
      <div className="adview__panel">
        <Spinner className="wh-100" />
      </div>
    );
  }

  return (
    <div className="ratings">
      <div className="flex aic jcsb mb-1">
        <div className={`f-lg f-thin ${showReviews ? 'c-black' : 'c-grace'}`}>
          Reviews
        </div>
        <button className="btn--sub" onClick={() => setShowReviews(prev => !prev)}>
          {showReviews ? 'Hide' : 'Show'}
        </button>
      </div>
      {showReviews &&
        <Scrollbars className="ratings__content">
          {data && data.length > 0 
            ? (
              <>
                {reviews}
                <button className="btn btn--cta w-100" onClick={open}>
                  Write a review
                </button>
              </>
            )
            : (
              <div className="flex jcsb aic">
                <div className="f-lg">No reviews</div>
                <button className="btn btn--cta" onClick={open}>
                  Write a review
                </button>
              </div>
            )
          }
        </Scrollbars>
      }
    </div>
  );
};

export default React.memo(Ratings);
