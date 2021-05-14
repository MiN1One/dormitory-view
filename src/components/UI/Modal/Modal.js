import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.scss';

const Modal = (props) => {

  return (
    <>
      <Backdrop close={props.close} z={9998} />
      <div className="modal">
        <div className="modal__head">
          <h6 className="modal__heading">{props.title}</h6>
          <button className="modal__btn" onClick={props.close}>
            <MdClose className="icon--xs icon--grey" />
          </button>
        </div>
        <div className="modal__body">
          {props.children}
        </div>
        <div className="modal__footer">
          <button className="btn btn--cta mr-5" onClick={props.close}>
            Close
          </button>
          <button className="btn btn--primary" onClick={props.action}>
            {props.footer}
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Modal);
