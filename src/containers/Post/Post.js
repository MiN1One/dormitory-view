import React, { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import './Post.scss';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Region from './Region/Region';
import ImageUploadForm from './ImageUploadForm/ImageUploadForm';
import Universities from './Universities/Universities';
import SecurityRules from './SecurityRules';
import PlacesBills from './PlacesBills';
import Rooms from './Rooms/Rooms';
import Main from './Main/Main';
import useTitle from '../../hooks/useTitle';

// {
//   "region": "mirzo-ulug'bek",
//   "city": "toshkent",
//   "ownership": "university-owned",
//   "security": [
//     "cctv",
//     "health",
//     "controlled_access",
//     "card_access",
//     "additional_keys"
//   ],
//   "rules": [
//     "no_smoking",
//     "no_late_access"
//   ],
//   "bills": [
//     "water_bill",
//     "gas_bill",
//     "heating_bill",
//     "internet_bill"
//   ],
//   "places": [
//     "market",
//     "libriary",
//     "restaurant",
//     "hospital",
//     "bus_station"
//   ],
//   "images": [
//     "image.jpg"
//   ],
//   "title": "Test apartment 2",
//   "address": "20, Kocha 100550",
//   "imageCover": "image-1.jpg",
//   "landlord": "id",
//   "roomOptions": [
//     {
//         "air_conditioner": true,
//         "bath": "private",
//         "gaming": false,
//         "washing_machine": true,
//         "condition": "good",
//         "numberOfRooms": 3,
//         "computer": false,
//         "parking": true,
//         "internet": true,
//         "furnitured": true,
//         "price": 130,
//         "kitchen": "private",
//         "offers": []
//     },
//     {
//         "air_conditioner": true,
//         "bath": "private",
//         "gaming": false,
//         "washing_machine": true,
//         "condition": "good",
//         "numberOfRooms": 2,
//         "computer": false,
//         "parking": true,
//         "internet": true,
//         "furnitured": true,
//         "price": 140,
//         "kitchen": "private",
//         "offers": [
//             {
//                 "type": "discount",
//                 "value": 20
//             }
//         ]
//     }
//   ]
// }

const SECTIONS = ['main', 'securityandrules', 'places', 'rooms', 'offers'];

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
                <Universities setData={setData} data={data} />
              </div>
            </div>
          </div>
          {/* <RoomOptions /> */}
          <Rooms setData={setData} data={data} />
          <ImageUploadForm />
          {/* <FacilitiesBills setData={setData} data={data} /> */}
          <SecurityRules setData={setData} data={data} />
          <PlacesBills setData={setData} data={data} />
        </div>
      </main>
    </>
  );
};

export default React.memo(Post);
