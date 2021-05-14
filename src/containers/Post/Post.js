import React, { useCallback, useRef, useState } from 'react';
import { IoIosSearch, IoMdCheckmark } from 'react-icons/io';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import Dropdown from '../../components/UI/Dropdown/Dropdown';
import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import './Post.scss';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import FacilitiesBills from './FacilitiesBills/FacilitiesBills';
import Region from './Region/Region';
import ImageUploadForm from './ImageUploadForm/ImageUploadForm';
import Universities from './Universities/Universities';
import SecurityRules from './SecurityRules/SecurityRules';
import Places from './Places/Places';
import Rooms from './Rooms/Rooms';

const Post = () => {

  return (
    <>
      <main className="post">
        <div className="post__float">
          <div className="container">
            <div className="flex jce">
              <button className="btn--pill">
                <IoMdCheckmark className="icon icon--white mr-1" />
                Post
              </button>
            </div>
          </div>
        </div>
        <SpyNavigation 
          offset={-115}
          items={['main', 'facilitiesandbills', 'securityandrules', 'places', 'rooms', 'images', 'offers']} />
        <div className="post__head">
          <div className="container">
            <Breadcrumbs 
              items={[
                {
                  title: 'Post', 
                  path: '/post/new', 
                  active: true 
                }
              ]}/>
            <h2 className="heading heading--2 mt-15">Post</h2>
          </div>
        </div>
        <div className="post__body">
          <div className="w-100" id="main">
            <div className="container">
              <div className="post__form">
                <label className="post__input-group input__label">
                  <span className="post__title">Title</span>
                  <input 
                    className="input input--main post__input"
                    placeholder="Main Title"
                    minLength="5"
                    type="text" />
                  <span className="input__label-text">25 Characters left</span>
                </label>
                <label className="post__input-group input__label">
                  <span className="post__title">Area</span>
                  <input 
                    className="input input--main post__input"
                    placeholder="Area in square meters"
                    type="number" />
                </label>
                <label className="post__input-group input__label">
                  <span className="post__title">Address</span>
                  <input 
                    className="input input--main post__input"
                    placeholder="Address"
                    type="text" />
                </label>
                <div className="post__input-group input__label">
                  <span className="post__title">Property type</span>
                  <Dropdown
                    title="Private"
                    positionX="left"
                    className="input input--main post__input"
                    items={[
                      { title: 'Private', click: () => {}, active: true },
                      { title: 'University property', click: () => {}, active: false }
                    ]} />
                </div>
                {/* <div className="post__input-group input__label">
                  <span className="post__title">Property condition</span>
                  <Dropdown
                    title="N/A"
                    positionX="left"
                    className="input input--main post__input"
                    items={[
                      { title: 'Poor', click: () => {}, active: false },
                      { title: 'Medium', click: () => {}, active: true },
                      { title: 'Euro', click: () => {}, active: false }
                    ]} />
                </div> */}
              </div>
            </div>
            <div className="post__section">
              <div className="container">
                <Region />
                <Universities />
              </div>
            </div>
          </div>
          <FacilitiesBills />
          <SecurityRules />
          <Places />
          <Rooms />
          <ImageUploadForm />
        </div>
      </main>
    </>
  );
};

export default React.memo(Post);
