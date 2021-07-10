import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import './index.scss';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import Region from './Region/Region';
import ImageUploadForm from './ImageUploadForm/ImageUploadForm-class';
import Universities from './Universities/Universities';
import SecurityRules from './SecurityRules';
import PlacesBills from './PlacesBills';
import Rooms from './Rooms';
import Main from './Main/Main';
import useTitle from '../../hooks/useTitle';
import useFetchData from '../../hooks/useFetchData';
import CtaArea from './CtaArea/CtaArea';

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

  const { t } = useTranslation();
  const images = useRef([]);
  const [invalidMessage, setInvalidMessage] = useState(null);

  const { 
    data: responseData, 
    loading, 
    error, 
    makeRequest 
  } = useFetchData();

  const [data, setData] = useState({
    region: 'mirzo-ulug\'bek',
    city: 'toshkent',
    ownership: 'university-owned',
    security: [],
    bills: [],
    rules: [],
    places: [],
    title: '',
    address: '',
    roomOptions: []

    // images, imageCover are saved with patch request
  });

  const setUserInputError = useCallback((mes) => {
    setInvalidMessage(mes);
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const uploadImages = useCallback((responseData) => {
    console.log(responseData);

    const form = new FormData();
    
    images.current.forEach(el => form.append('images', el.file));

    console.log(images.current);

    makeRequest({
      url: `api/apartments/${responseData._id}`,
      method: 'PATCH',
      body: form,
      callback: (data, setData) => {
        console.log('images are uploaded');
      }
    });
  }, [makeRequest]);

  const onPostApartment = useCallback(() => {
    setInvalidMessage(null);

    if (data.title.length < 5 || data.title === '')
      return setUserInputError(t('error.input.title'));

    if (data.address.length < 5 || data.address === '')
      return setUserInputError(t('error.input.address'));

    if (data.roomOptions.length === 0)
      return setUserInputError(t('error.input.roomOptions'));

    if (images.current.length < 4)
      return setUserInputError(t('error.input.images'));

    makeRequest({
      url: 'api/apartments',
      method: 'POST',
      body: data,
      dataAt: ['data', 'doc'],
      callback: uploadImages
    });
  }, [makeRequest, data, uploadImages, setUserInputError, t]);

  const onRemoveImage = (index) => 
    images.current = images.current.filter((_, i) => index !== i);

  const onAddImage = (img) => 
    images.current = [ ...images.current, img ];

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
};

export default React.memo(Post);
