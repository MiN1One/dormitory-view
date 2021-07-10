import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { IoIosSearch } from 'react-icons/io';
import { IoChevronForward } from 'react-icons/io5';
import Modal from '../../../components/UI/Modal/Modal';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';

const Region = ({ close }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <Modal
      close={close}
      title="Region"
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
          <div className="pos-rel">
            <IoIosSearch className="icon post__input-icon" />
            <input 
              className="post__input input input--main"
              type="text"
              placeholder="City or disctrict name" />
          </div>
          <Scrollbar style={{ width: '100%', height: 'calc(100% - 5rem)' }}>
            <div className="post__input" tabIndex="0" onClick={() => setSelectedCity('tashkent')}>
              Tashkent
              <IoChevronForward className="icon--xs icon--grey" />
            </div>
            <div className="post__input" tabIndex="0">
              Samarkand
              <IoChevronForward className="icon--xs icon--grey" />
            </div>
            <div className="post__input" tabIndex="0">
              Sirdarya
              <IoChevronForward className="icon--xs icon--grey" />
            </div>
            <div className="post__input" tabIndex="0">
              Jizzakh
              <IoChevronForward className="icon--xs icon--grey" />
            </div>
            <div className="post__input" tabIndex="0">
              Bukhara
              <IoChevronForward className="icon--xs icon--grey" />
            </div>
            <div className="post__input" tabIndex="0">
              Namangan
              <IoChevronForward className="icon--xs icon--grey" />
            </div>
          </Scrollbar>
          {selectedCity && 
            <div className="post__list--pop">
              <Scrollbar style={{ width: '100%', height: '100%' }}>
                <div className="post__input" tabIndex="0" onClick={() => setSelectedCity(null)}>
                  <div className="flex aic">
                    <BsArrowLeft className="icon--sm icon--grey mr-1" />
                    Go back
                  </div>
                </div>
                <div className="post__input" tabIndex="0">
                  Mirzo-Ulugbek
                  <IoChevronForward className="icon--xs icon--grey" />
                </div>
                <div className="post__input" tabIndex="0">
                  Shaykhantakhur
                  <IoChevronForward className="icon--xs icon--grey" />
                </div>
                <div className="post__input" tabIndex="0">
                  Almazar
                  <IoChevronForward className="icon--xs icon--grey" />
                </div>
                <div className="post__input" tabIndex="0">
                  Yakkasaroy
                  <IoChevronForward className="icon--xs icon--grey" />
                </div>
                <div className="post__input" tabIndex="0">
                  Yunusabad
                  <IoChevronForward className="icon--xs icon--grey" />
                </div>
                <div className="post__input" tabIndex="0">
                  Mirzo-Ulugbek
                  <IoChevronForward className="icon--xs icon--grey" />
                </div>
              </Scrollbar>
            </div>
          }
        </div>
    </Modal>
  );
}

export default Region;
