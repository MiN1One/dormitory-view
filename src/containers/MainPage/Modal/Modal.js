import React from 'react';
import { MdClose } from 'react-icons/md';

import './Modal.scss';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';

const Modal = ({ head, close, items, children }) => {
  return (
    <div className="modalh">
      <div className="modalh__head">
        <div className="flex aic f-mid-w">{head}</div>
        <button className="modalh__btn" onClick={close}>
          <MdClose className="icon--xs icon--dark" />
        </button>
      </div>
      <div className="modalh__body">
        <Scrollbar style={{ width: '100%', height: '100%' }} className="modalh__list">
          <ul>
            {items}
          </ul>
        </Scrollbar>
        {children}
      </div>
    </div>
  );
}

export default Modal;
