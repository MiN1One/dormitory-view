import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { BsStarFill } from 'react-icons/bs';
import { GrPhone } from 'react-icons/gr';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { FcPhone } from 'react-icons/fc';

import Modal from '../../../components/UI/Modal/Modal';
import Ratings from '../Ratings/Ratings';

const Contact = ({ close, data, open }) => {
  const onCopy = () => {
    const el = document.createElement('textarea');
    el.value = '+998 65 575 54 87';
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <Modal 
      close={close} 
      title="Contact"
      footer={
        <>
          <button className="btn btn--cta mr-5" onClick={close}>Close</button>
          <a href="tel:+998 65 575 54 87" className="btn btn--primary">Call</a>
        </>
      }>
      <div className="c-grace f-thin f-lg mb-1">Landlord: </div>
      <div className="flex aic jcsb mb-2">
        <span className="f-sl f-light c-black">Lastname Firstname</span>
        <Link to="/" className="btn--sub">Profile</Link>
      </div>
      <Ratings hide open={open} />
      <div className="flex aic mb-2">
        <Rating 
          readonly
          emptySymbol={<BsStarFill className="icon--sm icon--star-e mx-25" />}
          fullSymbol={<BsStarFill className="icon--sm icon--yellow mx-25" />}
          initialRating={4.5}
          fractions={2} />
        <span className="flex ml-1 f-thin f-xl c-grey">4.5</span>
      </div>
      <div className="flex aic mb-1">
        <FcPhone className="icon--mid mr-5" />
        <span className="c-grace f-thin f-lg mr-1">Mobile: </span>
      </div>
      <div className="f-sl f-thin c-grey flex aic jcsb">
        +998 65 575 54 87
        <button className="btn--sub" onClick={onCopy}>Copy</button>
      </div>
    </Modal>
  );
}

export default Contact;
