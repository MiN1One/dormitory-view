import React, { useEffect, useRef, useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import Rating from 'react-rating';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Modal from '../../../components/UI/Modal/Modal';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { useTranslation } from 'react-i18next';
import useFetchData from '../../../hooks/useFetchData';

const ReviewInput = ({ close, userId }) => {
  const [rating, setRating] = useState(1.0);
  const [text, setText] = useState('');
  const [type, setType] = useState('month');
  const [formError, setFormError] = useState(null);

  const { user } = useSelector(s => s.user);
  const { t } = useTranslation();
  const { data, loading, error, makeRequest } = useFetchData();

  const history = useHistory();
  const inpRef = useRef();
   
  const onPostReview = () => {
    setFormError(null);
    if (text === '' || inpRef.current.value === '') {
      return setFormError('Please fill out all the fields');
    }

    makeRequest({
      url: `api/users/${userId}/reviews`,
      method: 'post',
      body: {
        review: text,
        rating,
        livedFor: `${inpRef.current.value} ${type}`
      },
      callback: () => { console.log(data) }
    });
  };

  useEffect(() => {
    if (rating < 1) {
      setRating(parseFloat(1).toFixed(1));
    }
  }, [rating]);

  if (error) 
    return (
      <Modal
        close={close}
        title=""
        footer="Post">
          {error && error.response
            ? t(`error.${error.response.data.message}`)
            : 'Something went wrong'
          }
      </Modal>
    );

  return (
    <Modal 
      close={close} 
      title="Write your review"
      footer={!user ? 'Login' : 'Post'}
      action={!user ? () => history.push('/auth/login') : onPostReview}>
        {!user
          ? (
            <>
              <h3 className="f-xl mb-15 c-black f-normal">
                You need to login to leave reviews
              </h3>
              <Link to="/auth/login" className="f-mid">Login</Link>
            </>
          )
          : (
            <>
              {formError && (
                <p className="f-mid c-red mb-15">{formError}</p>
              )}
              <div className="mb-15">
                <div className="mb-5">
                  <label className="modal__title">Stay duration</label>
                  <input 
                    type="number" 
                    className="modal__input" 
                    placeholder="e.g. 1 month"
                    ref={inpRef} />
                </div>
                <Dropdown
                  title={t(`types.${type}`)}
                  items={[
                    {
                      title: 'Month',
                      active: type === 'month',
                      click: () => setType('month')
                    },
                    {
                      title: 'Week',
                      active: type === 'week',
                      click: () => setType('week')
                    },
                    {
                      title: 'Day',
                      active: type === 'day',
                      click: () => setType('day')
                    },
                    {
                      title: 'Year',
                      active: type === 'year',
                      click: () => setType('year')
                    }
                  ]}
                  className="modal__input" />
              </div>
              <div className="mb-15">
                <div className="modal__title">Rating</div>
                <div className="flex aic">
                  <Rating 
                    onChange={(r) => setRating(parseFloat(r).toFixed(1))}
                    emptySymbol={<BsStarFill className="icon--sm icon--star-e mx-25" />}
                    fullSymbol={<BsStarFill className="icon--sm icon--yellow mx-25" />}
                    initialRating={parseFloat(rating).toFixed(1)}
                    fractions={2} />
                  <span className="flex ml-1 f-thin f-xl c-grey">
                    {rating}
                  </span>
                </div>
              </div>
              <div>
                <textarea 
                  placeholder="Review"
                  className="modal__input modal__input--text"
                  minLength="25"
                  maxLength="1000"
                  onChange={e => setText(e.target.value)} />
                {text.length > 0 && (
                  <span className="f-sm c-grace mt-1 inline">
                    {1000 - text.length} characters left
                  </span>
                )}
              </div>
            </>
          )
        }
    </Modal>
  );
};

export default ReviewInput;
