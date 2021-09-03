import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FcGraduationCap, FcSerialTasks } from 'react-icons/fc';

import SpyNavigation from '../../components/SpyNavigation/SpyNavigation';
import './index.scss';
import ImageUploadForm from './ImageUploadForm/ImageUploadForm';
import Universities from './Universities/Universities';
import SecurityRules from './SecurityRules';
import PlacesBills from './PlacesBills';
import Rooms from './Rooms';
import MainDetailsRegion from './MainDetailsRegion';
import useFetchData from '../../hooks/useFetchData';
import CtaArea from './CtaArea/CtaArea';
import PopScroll from '../../components/UI/PopScroll/PopScroll';
import { scrollToElement } from '../../utilities/utils';
import Success from './Success/Success';
import { messageCreator } from '../../components/MessagePopper';
import Spinner from '../../components/UI/Spinner/Spinner';
import useTitle from '../../hooks/useTitle';
import ErrorView from '../../components/ErrorView/ErrorView';

const AsyncAdview = React.lazy(() => import('../Adview'));

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

const Post = (props) => {
  const params = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const { user: { user } } = useSelector(s => s);

  useTitle(t(`post.${params.type}`));

  // TO PREVENT UPDATES, REF IS USED FOR IMAGE CACHING
  const images = useRef([]);
  const [validationMessage, setValidationMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // DATA UPLOAD
  const { 
    data: responseData, 
    loading, 
    error, 
    makeRequest
  } = useFetchData();

  // IMAGE UPLOAD
  const {
    data: imagesData,
    loading: imagesLoading,
    error: imagesError,
    makeRequest: patchImages
  } = useFetchData();

  useEffect(() => {

  }, [validationMessage]);

  const [data, setData] = useState({
    "region": "olmazor",
    "city": "toshkent",
    "ownership": "university-owned",
    "security": [
        "additional_keys",
        "cctv",
        "health",
        "card_access",
        "controlled_access"
    ],
    "bills": [
        "heating_bill",
        "water_bill",
        "gas_bill",
        "internet_bill",
        "electricity_bill"
    ],
    "rules": [
        "no_late_access",
        "no_smoking"
    ],
    "places": {
        "hospital": [
            "sdfd"
        ]
    },
    "title": "Test 6",
    "address": "Bogkocha, 8-11",
    "roomOptions": [
        {
            "air_conditioner": false,
            "bath": true,
            "gaming": false,
            "washing_machine": false,
            "condition": "good",
            "numberOfRooms": 3,
            "rooms": {
                "kitchen": 1,
                "bedroom": 1,
                "dining_room": 1,
                "living_room": 1
            },
            "computer": false,
            "parking": true,
            "internet": true,
            "furnitured": false,
            "price": "250",
            "kitchen": true,
            "organization": null
        }
    ],
    "organization": "Test"
});

  const setUserInputError = useCallback((message, section) => {
    setValidationMessage(message);
    scrollToElement(section, 0);
    messageCreator({
      message,
      type: 'error',
      duration: 10000,
      id: 'invalid-field-error'
    });

    return false;
  }, []);

  const uploadImages = useCallback((responseData) => {
    const form = new FormData();
    
    images.current.forEach(el => form.append('images', el.file));

    patchImages({
      url: `api/apartments/${responseData._id}`,
      method: 'PATCH',
      body: form,
      callback: () => setSuccess(true),
      onError: () => setSuccess(false)
    });
  }, [patchImages]);

  const isValidData = useCallback(() => {
    setValidationMessage(null);

    if (data.title.length < 5 || data.title === '')
      return setUserInputError(t('error.input.title'), 'main');

    if (data.address.length < 5 || data.address === '')
      return setUserInputError(t('error.input.address'), 'main');

    if (data.roomOptions.length === 0)
      return setUserInputError(t('error.input.roomOptions'), 'rooms');

    if (!images.current.length)
      return setUserInputError(t('error.input.images'), 'images');

    return true;
  }, [data.address, data.roomOptions.length, data.title, setUserInputError, t]);

  const onPostApartment = useCallback(() => {
    if (!isValidData()) return;

    makeRequest({
      url: `api/apartments${params.type === 'edit' ? `/${data.id}` : ''}`,
      method: params.type === 'edit' ? 'patch' : 'post',
      body: data,
      dataAt: ['data', 'doc'],
      callback: uploadImages
    });
  }, [makeRequest, data, uploadImages, params.type, isValidData]);

  const onRemoveImage = (index) => 
    images.current = images.current.filter((_, i) => index !== i);

  const onAddImage = (img) => 
    images.current = [ ...images.current, img ];

  const onGoToPreview = () => {
    if (!isValidData()) return;

    setPreviewData({
      ...data, 
      landlord: user, 
      images: images.current
    });
    history.push('/post/preview');
  };

  if (params.type === 'preview') {
    return previewData
      ? <AsyncAdview data={previewData} />
      : <ErrorView />;
  }

  if (loading || imagesLoading) {
    return <Spinner 
      message={loading ? 'Uploading apartment data...' : 'Uploading images...'} 
      warnMessage="This may take a while, please wait."
      className="loader--fullscreen"
      warnIcon={<FcSerialTasks className="mr-5 icon--lg" />} />;
  }
 
  if (success && !error) {
    return <Success />;
  }

  return (
    <main className="post">
      <PopScroll />
      <CtaArea 
        onGoToPreview={onGoToPreview}
        onPostApartment={onPostApartment} />
      <SpyNavigation items={SECTIONS} offset={-1}>
        <Link to="/">LOGO</Link>
      </SpyNavigation>
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
          images={images.current}
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
