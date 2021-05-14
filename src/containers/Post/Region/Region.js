import React, { useState } from 'react';
import { GoLocation } from 'react-icons/go';
import { IoIosSearch, IoMdCheckmark } from 'react-icons/io';
import { IoChevronForward } from 'react-icons/io5';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';

const Region = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="post__section__item">
      <div className="post__list-wrapper">
        <div className="post__title post__title--lg">
          <GoLocation className="icon--mid mr-1 icon--green" />
          Region &mdash;&nbsp;<span className="c-grey-l f-thin">Tashket, Shaykhantakhur district</span>
        </div>
        <div className="post__list">
          <div className="pos-rel">
            <IoIosSearch className="icon icon--grey post__input-icon" />
            <input 
              type="text"
              placeholder="City or district name"
              className="post__input input input--main" />
          </div>
          <Scrollbar 
            style={{ width: '100%', height: 'calc(100% - 5rem)' }}>
            <div className="post__input" tabIndex="0" onClick={() => setSelectedCity('tashkent')}>
              Tashkent
              <IoChevronForward className="icon--xs icon--green" />
            </div>
            <div className="post__input" tabIndex="0">
              Samarkand
              <IoChevronForward className="icon--xs icon--green" />
            </div>
            <div className="post__input" tabIndex="0">
              Sirdarya
              <IoChevronForward className="icon--xs icon--green" />
            </div>
            <div className="post__input" tabIndex="0">
              Jizzakh
              <IoChevronForward className="icon--xs icon--green" />
            </div>
            <div className="post__input" tabIndex="0">
              Bukhara
              <IoChevronForward className="icon--xs icon--green" />
            </div>
            <div className="post__input" tabIndex="0">
              Namangan
              <IoChevronForward className="icon--xs icon--green" />
            </div>
            <div className="post__input" tabIndex="0">
              Andijan
              <IoChevronForward className="icon--xs icon--green" />
            </div>
          </Scrollbar>
        </div>
      </div>
      <div className="post__list-wrapper">
        <div className="post__list">
          {selectedCity && (
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <div className="post__input" tabIndex="0">
                Mirzo-Ulugbek
                <IoMdCheckmark className="icon--xs icon--green" />
              </div>
              <div className="post__input" tabIndex="0">
                Shaykhantakhur
                <IoMdCheckmark className="icon--xs icon--green" />
              </div>
              <div className="post__input" tabIndex="0">
                Almazar
                <IoMdCheckmark className="icon--xs icon--green" />
              </div>
              <div className="post__input" tabIndex="0">
                Yakkasaroy
                <IoMdCheckmark className="icon--xs icon--green" />
              </div>
              <div className="post__input" tabIndex="0">
                Yunusabad
                <IoMdCheckmark className="icon--xs icon--green" />
              </div>
              <div className="post__input" tabIndex="0">
                Mirzo-Ulugbek
                <IoMdCheckmark className="icon--xs icon--green" />
              </div>
            </Scrollbar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Region;
