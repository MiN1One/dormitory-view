import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FcGraduationCap } from 'react-icons/fc';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import './index.scss';
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
import { scrollToElement } from '../../utilities/utils';
import { messageCreator } from '../../components/MessagePopper';

const SECTIONS = [
  'main',
  'universities',
  'rooms',
  'images',
  'securityrules',
  'placesbills'
];

const DEFAULT_APARTMENT = {
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
};

const Post = () => {
  useTitle('Post property');

  const { t } = useTranslation();
  // TO PREVENT UPDATES, REF IS USED FOR IMAGE CACHING
  const images = useRef([]);
  const [validationMessage, setValidationMessage] = useState(null);

  const { 
    data: responseData, 
    loading, 
    error, 
    makeRequest
  } = useFetchData();

  const [data, setData] = useState(DEFAULT_APARTMENT);

  const setUserInputError = useCallback((message, section) => {
    setValidationMessage(message);
    scrollToElement(section, 0);
    messageCreator({
      message,
      type: 'error',
      duration: 10000,
      id: 'invalid-field-error'
    });
  }, []);

  const uploadImages = useCallback((responseData) => {
    const form = new FormData();
    
    images.current.forEach(el => form.append('images', el.file));

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
    setValidationMessage(null);

    if (data.title.length < 5 || data.title === '')
      return setUserInputError(t('error.input.title'), 'main');

    if (data.address.length < 5 || data.address === '')
      return setUserInputError(t('error.input.address'), 'main');

    if (data.roomOptions.length === 0)
      return setUserInputError(t('error.input.roomOptions'), 'rooms');

    if (!images.current.length)
      return setUserInputError(t('error.input.images'), 'images');

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
      <SpyNavigation items={SECTIONS} />
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
          error={validationMessage} />
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
