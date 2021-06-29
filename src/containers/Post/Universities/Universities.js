import React, { useState } from 'react';
import { BsPlus, BsTrash } from 'react-icons/bs';
import { IoIosSearch } from 'react-icons/io';
import { IoSchoolOutline } from 'react-icons/io5';
import { RiPencilLine } from 'react-icons/ri';

import Modal from '../../../components/UI/Modal/Modal';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';

const Universities = () => {
  const [selectedUniver, setSelectedUniver] = useState(null);

  return (
    <>
      {selectedUniver && 
        <Modal
          title="Distance"
          close={() => setSelectedUniver(null)}
          actionTitle="Add"
          action={() => {}}>
            <h5 className="modal__title">Webster university</h5>
            <div className="flex jce fdc">
              <div className="c-grace f-thin f-lg mb-1">
                How long it takes from the property to react the university?
              </div>
              <input 
                className="modal__input" 
                placeholder="Distance in minutes"
                type="number" />
            </div>
        </Modal>
      }
      <div className="post__section__item">
        <div className="post__list-wrapper">
          <div className="post__title post__title--lg">
            <IoSchoolOutline className="icon--mid icon--green mr-1" />
            Close institutions
          </div>
          <div className="post__list">
            <div className="post__input input input--main">
              <span className="c-grey-l">Name</span>
              <span className="c-grey-l">Time</span>
            </div>
            <Scrollbar style={{ width: '100%', height: 'calc(100% - 5rem)' }}>
              <div className="input input--main post__input">
                Webster university
                <div className="post__input__btn-group">
                  <button className="post__input__btn mr-1">
                    <RiPencilLine className="icon--xs icon--grey" />
                  </button>
                  <button className="post__input__btn">
                    <BsTrash className="icon--xs icon--grey" />
                  </button>
                </div>
                <span className="c-grace">15 min walk</span>
              </div>
              <div className="input input--main post__input">
                INHA university<span className="c-grace">15 min walk</span>
              </div>
              <div className="input input--main post__input">
                AMITY university<span className="c-grace">15 min walk</span>
              </div>
            </Scrollbar>
          </div>
        </div>
        <div className="post__list-wrapper">
          <div className="post__list">
            <div className="pos-rel">
              <IoIosSearch className="icon icon--grey post__input-icon" />
              <input 
                className="input input--main post__input"
                placeholder="University name in the city"
                type="text" />
            </div>
            <Scrollbar style={{ width: '100%', height: 'calc(100% - 5rem)' }}>
                <div className="input input--main post__input" tabIndex="0">
                  INHA university
                </div>
                <div className="input input--main post__input" tabIndex="0">
                  AMITY university
                </div>
              <button className="post__btn" onClick={() => setSelectedUniver('hehe')}>
                <BsPlus className="icon--mid icon--dark" />
              </button>
            </Scrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Universities;
