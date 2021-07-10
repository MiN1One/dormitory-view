import React from 'react';

import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Region from './Region/Region';
import ImageUploadForm from './ImageUploadForm/ImageUploadForm-class';
import Universities from './Universities/Universities';
import SecurityRules from './SecurityRules';
import PlacesBills from './PlacesBills';
import Rooms from './Rooms';
import Main from './Main/Main';
import CtaArea from './CtaArea/CtaArea';

const SECTIONS = [
  'main', 
  'universities', 
  'rooms', 
  'images', 
  'securityrules', 
  'placesbills'
];

const Post = ({
  onPostApartment,
  data,
  invalidMessage,
  setData,
  onAddImage,
  onRemoveImage
}) => {

  const breadcrumbItems = [
    {
      title: 'Post', 
      path: '/post/new', 
      active: true 
    }
  ];

  return (
    <main className="post">
      <CtaArea 
        onPostApartment={onPostApartment} 
        data={data} />
      <SpyNavigation 
        offset={-50}
        items={SECTIONS} />
      <div className="post__head">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>
      <div className="post__body">
        <div className="w-100" id="main">
          <div className="container">
            {invalidMessage && (
              <p className="post__error">
                {invalidMessage}
              </p>
            )}
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
        <ImageUploadForm 
          roomOptions={data.roomOptions}
          onRemoveImage={onRemoveImage}
          setImages={onAddImage} 
        />
        <SecurityRules setData={setData} data={data} />
        <PlacesBills setData={setData} data={data} />
      </div>
    </main>
  );
}

export default Post;
