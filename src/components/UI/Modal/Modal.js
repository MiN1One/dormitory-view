import React from 'react';
import { MdClose } from 'react-icons/md';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.scss';

const Modal = ({
  close,
  size,
  title,
  actionTitle,
  action,
  children
}) => (
  <>
    <Backdrop close={close} z={9998} />
    <div className={`modal ${size ? `modal--${size}` : ''}`}>
      <div>
        <div className="modal__head">
          <h6 className="modal__heading">{title}</h6>
          <button className="modal__btn" onClick={close}>
            <MdClose className="icon--xs icon--grey" />
          </button>
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
      <div className="modal__footer">
        <button className="btn btn--cta mr-5" onClick={close}>
          Close
        </button>
        <button className="btn btn--primary" onClick={action}>
          {actionTitle}
        </button>
      </div>
    </div>
  </>
);
 
export default React.memo(Modal);
