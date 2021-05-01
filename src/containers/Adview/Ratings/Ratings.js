import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { BsStarFill } from 'react-icons/bs';
import Rating from 'react-rating';

import './Ratings.scss';

const reviewsList = [
  {
    name: 'Student',
    days: '1.5 months',
    rating: 4.5,
    date: '2021/04/17',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit nec justo nec rutrum. Class.'
  },
  {
    name: 'Student 3',
    days: '15 days',
    rating: 4.0,
    date: '2021/04/17',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit nec justo nec rutrum. Class.'
  },
  {
    name: 'Student 4',
    days: '1 months',
    rating: 4.7,
    date: '2021/04/17',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit nec justo nec rutrum. Class.'
  },
  {
    name: 'Student 2',
    days: '1 year',
    rating: 4.2,
    date: '2021/04/19',
    text: 'Lorem sit amet, consectetur adipiscing elit. Vivamus hendrerit nec justo nec rutrum. Class.'
  }
];

const Ratings = () => {
  const [expandText, setExpandText] = useState([]);
  const [showReviews, setShowReviews] = useState(true);

  useEffect(() => {
    reviewsList.forEach(() => 
      setExpandText(prev => [...prev, false])
    );
  }, []);
  
  const reviews = reviewsList.map((el, i) => {
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
    return (
      <div className="ratings__item" key={i}>
        <div className="flex aic jcsb mb-1">
          <div className="flex fdc">
            <span className="ratings__user mb-5">{el.name}</span>
            <span className="ratings__date">Days lived: {el.days}</span>
          </div>
          <span className="ratings__date">{el.date}</span>
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
          {el.text}
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

  return (
    <div className="ratings">
      <div className="flex aic mb-1">
        <div className={`f-lg mr-5 f-thin ${showReviews ? 'c-black' : 'c-grace'}`}>Reviews for property</div>
        <button className="btn--sub" onClick={() => setShowReviews(prev => !prev)}>
          {showReviews ? 'Hide' : 'Show'}
        </button>
      </div>
      {showReviews &&
        <Scrollbars className="ratings__content">
          {reviews}
          <button className="btn btn--cta w-100">Write review</button>
        </Scrollbars>
      }
    </div>
  );
};

export default Ratings;
