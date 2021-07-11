import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FcGraduationCap } from 'react-icons/fc';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import './index.scss';
import Region from './MainDetailsRegion/Region';
import ImageUploadForm from './ImageUploadForm/ImageUploadForm-class';
import Universities from './Universities/Universities';
import SecurityRules from './SecurityRules';
import PlacesBills from './PlacesBills';
import Rooms from './Rooms';
import MainDetailsRegion from './MainDetailsRegion';
import useTitle from '../../hooks/useTitle';
import useFetchData from '../../hooks/useFetchData';
import CtaArea from './CtaArea/CtaArea';
import PopScroll from '../../components/UI/PopScroll/PopScroll';

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
  const [invalidationMessage, setInvalidationMessage] = useState(null);

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
    places: {},
    title: '',
    address: '',
    roomOptions: []

    // images, imageCover are saved with patch request
  });

  const setUserInputError = useCallback((mes) => {
    setInvalidationMessage(mes);
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const uploadImages = useCallback((responseData) => {
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
    setInvalidationMessage(null);

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

  return (
    <main className="post">
      <PopScroll />
      <CtaArea 
        onPostApartment={onPostApartment} 
        data={data} />
      <SpyNavigation 
        offset={-50}
        items={SECTIONS} />
      <div className="post__header post__header--lg">
        <FcGraduationCap className="post__header__icon" />
        Post your property!
        <span className="f-mid c-grey-l mt-1">
          Help students find best living suite
        </span>
      </div>
      <div className="post__body">
        <MainDetailsRegion 
          data={data} 
          setData={setData} 
          error={invalidationMessage} />
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
