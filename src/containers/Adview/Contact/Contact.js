import React, { useEffect } from 'react';
import { BsStarFill } from 'react-icons/bs';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { FcPhone } from 'react-icons/fc';

import Modal from '../../../components/UI/Modal/Modal';
import Ratings from '../Ratings/Ratings';
import useFetchData from '../../../hooks/useFetchData';
import ModalLoading from '../../../components/UI/ModalLoading/ModalLoading';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';

const onCopy = (num) => {
  const el = document.createElement('textarea');
  el.value =  `+${num}`;
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.body.removeChild(el);
};

const Contact = ({ close, open, data }) => {

  // adverts: (2) [{…}, {…}]
  // createdAt: "2021-05-19T01:24:03.286Z"
  // email: "test@mail.com"
  // id: "60a4691a8b05fd11f4add60e"
  // last_name: "admin"
  // name: "admin"
  // phone_number: 9998995865
  // reviews: [{…}]
  // role: "admin"

  return (
    <Modal 
      close={close} 
      title="Contact"
      footer="Call"
      action={() => window.open(data?.phone_number)}>
        <div className="c-grace f-thin f-lg mb-1">Landlord: </div>
        <div className="flex aic jcsb mb-2">
          <span className="f-sl f-light c-black">{data?.last_name} {data?.name}</span>
          <Link to="/" className="btn--sub">Profile</Link>
        </div>
        <Ratings hide open={open} />
        <div className="flex aic mb-2">
          <Rating 
            readonly
            emptySymbol={<BsStarFill className="icon--sm icon--star-e mx-25" />}
            fullSymbol={<BsStarFill className="icon--sm icon--yellow mx-25" />}
            initialRating={data?.averageRating}
            fractions={2} />
            <span className="flex ml-1 f-thin f-xl c-grey">
              {data?.numberOfReviews > 0 
                ? data?.averageRating
                : (
                  <span className="f-mid">
                    No reviews
                  </span>
                )
              }
            </span>
        </div>
        <div className="flex aic mb-1">
          <FcPhone className="icon--mid mr-5" />
          <span className="c-grace f-thin f-lg mr-1">Mobile: </span>
        </div>
        <div className="f-sl f-thin c-grey flex aic jcsb">
          +{data?.phone_number}
          <button className="btn--sub" onClick={() => onCopy(data?.phone_number)}>Copy</button>
        </div>
    </Modal>
  );
}

export default Contact;
