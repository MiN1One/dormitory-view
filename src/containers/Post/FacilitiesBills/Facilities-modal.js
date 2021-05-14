import React from 'react';
import { GoCheck } from 'react-icons/go';

import Specifications from '../../../components/Specs/Specifications';
import Modal from '../../../components/UI/Modal/Modal';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';

const Facilities = ({ close }) => {
  const Facilities = { ...Specifications('flex aic').facilities };
  delete Facilities.others;
  const facilities = [];
  for (const [key, val] of Object.entries(Facilities)) {
    facilities.push((
      <div className="post__input" tabIndex="0" key={key}>
        {val()}
        <div className="input__checkbox-wrapper">
          <span className="input__checkbox filters__checkbox">
            <GoCheck className="icon--xs icon--green" />
          </span>
        </div>
      </div>
    ));
  }

  return (
    <Modal
      close={close}
      title="Facilities"
      footer={
        <>
          <button className="btn btn--cta mr-5" onClick={close}>
            Cancel
          </button>
          <button className="btn btn--primary" onClick={close}>
            Save
          </button>
        </>
      }>
        <div className="post__list">
          <Scrollbar style={{ width: '100%', height: '100%' }}>
            {facilities}
          </Scrollbar>
        </div>
    </Modal>
  );
}

export default Facilities;
