import React, { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import './index.scss';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Region from './Region/Region';
import ImageUploadForm from './ImageUploadForm/ImageUploadForm';
import Universities from './Universities/Universities';
import SecurityRules from './SecurityRules';
import PlacesBills from './PlacesBills';
import Rooms from './Rooms';
import Main from './Main/Main';
import useTitle from '../../hooks/useTitle';

// "offers": [
//     {
//         "type": "discount",
//         "value": 20
//     }
// ]

const SECTIONS = [
  'main', 
  'universities', 
  'rooms', 
  'images', 
  'securityrules', 
  'placesbills'
];

const Post = () => {
  useTitle('Post property');

  const [data, setData] = useState({
    region: 'mirzo-ulug\'bek',
    city: 'toshkent',
    ownership: 'university-owned',
    security: [],
    bills: [],
    rules: [],
    places: [],
    images: [],
    title: '',
    address: '',
    imageCover: '',
    roomOptions: []
  });

  console.log(data);

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
          offset={-50}
          items={SECTIONS} />
        <div className="post__head">
          <div className="container">
            <Breadcrumbs 
              items={[
                {
                  title: 'Post', 
                  path: '/post/new', 
                  active: true 
                }
              ]} />
          </div>
        </div>
        <div className="post__body">
          <div className="w-100" id="main">
            <div className="container">
              <Main setData={setData} data={data} />
            </div>
            <div className="post__section">
              <div className="container">
                <Region setData={setData} data={data} />
              </div>
            </div>
          </div>
          <Universities setData={setData} data={data} />
          <Rooms setData={setData} data={data} />
          <ImageUploadForm />
          <SecurityRules setData={setData} data={data} />
          <PlacesBills setData={setData} data={data} />
        </div>
      </main>
    </>
  );
};

export default React.memo(Post);
