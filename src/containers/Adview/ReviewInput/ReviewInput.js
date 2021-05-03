import React, { useEffect, useState } from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import Calendar, { MonthView } from 'react-calendar';

import './Calendar.css';

const ReviewInput = ({ close }) => {

  return (
    <Modal close={close} title="Write your review">
      
      <input className="input input--main input--sm" placeholder="some date" />
    </Modal>
  );
};

export default ReviewInput;
