import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.scss';

const Modal = (props) => {

  // useEffect(() => {
  //   document.documentElement.style.overflow = 'hidden';
  //   return () => document.documentElement.removeAttribute('style');
  // }, []);

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
          {props.footer}
        </div>
      </div>
    </>
  );
};

export default React.memo(Modal);
