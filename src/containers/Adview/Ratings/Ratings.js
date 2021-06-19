import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { BsStarFill } from 'react-icons/bs';
import Rating from 'react-rating';
import { useSelector } from 'react-redux';
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
    if (showReviews && !data && userId && numberOfReviews > 0) {
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

  console.log(data);
  
  const reviews = data?.map((el, i) => {
    // if (el.text.length > 15) {
    //   if (!expandText[i]) {
    //     const charArr = [];
    //     el.text.split('').forEach((char) => {
    //       if (charArr.length < 20)
    //         charArr.push(char);
    //     });
    //     el.text = `${charArr.join('')}...`;
    //   }
    // }
    const { month, date, year } = convertISOString(el.createdAt);

    return (
      <div className="ratings__item" key={i}>
        <div className="flex ais jcsb mb-1">
          <div className="flex fdc w-100">
            <span className="ratings__user mb-5">{el?.poster.name}</span>
            <span className="ratings__subtext ratings__subtext--s">Days lived: {el.livedFor}</span>
          </div>
          <span className="ratings__subtext w-50">{year} {date} {months[month]}</span>
        </div>
        <div className="flex aic f-thin f-sm mb-1">
          <Rating 
            readonly
            emptySymbol={<BsStarFill className="icon--xs icon--star-e mx-25" />}
            fullSymbol={<BsStarFill className="icon--xs icon--yellow mx-25" />}
            initialRating={el.rating}
            fractions={2} />
          <span className="ml-5">{el.rating}</span>
        </div>
        <p className={`ratings__text ${(expandText[i] && el.text.length > 50) ? 'ratings__text--show' : ''}`}>
          {el.review}
        </p>
        <button 
          className="btn--sub" 
          onClick={() => 
            setExpandText(prev => 
              prev.map((option, index) => {
                if (index === i) option = !option;
                return option;
              })
            )
          }>
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
