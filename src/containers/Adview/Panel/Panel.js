import React from 'react';
import Rating from 'react-rating';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';

const Panel = ({ data, setShowContact }) => {
  const { months } = useSelector(s => s.main);

  const 
    userDateArr = data?.landlord.createdAt.split('-'),
    year = userDateArr && userDateArr[0],
    month = userDateArr && +userDateArr[1];

  return (
    <div className="adview__panel">
      <div className="flex fdc mb-15 c-grey-l tc f-mid">
        <Link to="/" className="adview__user">
          {data?.landlord.last_name} {data?.landlord.name}
        </Link>
        <span className="mb-5">Landlord</span>
        <span className="f-thin">Since {months[+month - 1]} {year}</span>
      </div>
      <div className="adview__panel-rating-group">
        <div className="flex aic mb-5">
          <Rating 
            readonly
            emptySymbol={<BsStarFill className="icon--sm icon--star-e mx-25" />}
            fullSymbol={<BsStarFill className="icon--sm icon--yellow mx-25" />}
            initialRating={data?.landlord.averageRating}
            fractions={2} />
          {data?.landlord.numberOfReviews > 0 && (
            <span className="adview__panel-rating mr-5 ml-5">
              {data?.landlord.averageRating}
            </span>
          )}
        </div>
        <Link to="/" className="c-grace undl--h undl">
          {data?.landlord.numberOfReviews > 0
            ? `${data?.landlord.numberOfReviews} Review/s`
            : 'No reviews'
          }
        </Link>
      </div>
      <button 
        className="btn btn--primary w-100 mb-1" 
        onClick={() => setShowContact(true)}>
          Contact
      </button>
    </div>
  );
}

export default React.memo(Panel);
