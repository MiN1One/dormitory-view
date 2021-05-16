import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { RiImageAddLine } from 'react-icons/ri';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import { BiX } from 'react-icons/bi';
import Modal from '../../../components/UI/Modal/Modal';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';

SwiperCore.use([Navigation]);

const initialOptions = {
  room: 0,
  roomType: 'kitchen',
  image: null,
  file: null
};

const roomTypes = ['main_hall', 'corridor', 'kitchen', 'bathroom', 'balcony'];

const ImageUploadForm = () => {
  const [modal, setModal] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const imageUploadRef = useRef();

  useEffect(() => {
    setSelectedOptions(initialOptions);
  }, [modal]);
  
  useEffect(() => {
    swiper && swiper.update();
  }, [images.length, swiper]);
  
  const onUploadImage = useCallback(() => {
    const files = imageUploadRef.current.files
    if (files.length && images.length < 12) {
      
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);

      fileReader.onload = () => {
        const options = { ...selectedOptions, image: fileReader.result };
        setImages(prev => [...prev, options]);
        setModal(false);
      };
    }
  }, [images, selectedOptions]);

  const imagePlaceholders = images.map((el, i) => {
    return (
      <SwiperSlide className="post__images__item" key={i}>
        <div className="flex aic jcsb">
          <div className="post__images__title">
            {images[i].roomType}
            <span className="f-sm f-normal">Room option {images[i].room}</span>
          </div>
          <button 
            className="post__images__btn" 
            onClick={() => 
              setImages(prev => 
                prev.filter((image, index) => index !== i)  
              )
            }>
            <BiX className="icon--sm icon--grey" />
          </button>
        </div>
        <figure className="post__images__figure">
          {el.image && (
            <img className="img img--cover" src={el.image} alt={`images-${i}`} />
          )}
        </figure>
      </SwiperSlide>
    );
  });
 
  return (
    <>
      {modal && (
        <Modal
          title="Upload photo"
          close={() => setModal(false)}
          action={onUploadImage}
          footer="Upload"
        >
          <div className="mb-2">
            <div className="modal__title">Option number</div>
            <Dropdown 
              title="Room 1"
              height="13"
              items={[
                {
                  title: 'Room 1',
                  click: () => {},
                  active: true
                },
                {
                  title: 'Room 2',
                  click: () => {},
                  active: false
                },
                {
                  title: 'Room 3',
                  click: () => {},
                  active: false
                },
              ]}
              className="modal__input" />
          </div>
          <div className="mb-2">
            <div className="modal__title">Image of</div>
            <Dropdown 
              className="modal__input"
              title={selectedOptions.roomType}
              height={(roomTypes.length * 4.5) / 1.5}
              dropTitle="Rooms: "
              items={roomTypes.map(el => 
                ({
                  title: el,
                  click: () =>
                    setSelectedOptions(prev => (
                      { ...prev, roomType: el }
                    )),
                  active: selectedOptions.roomType === el
                })
              )} />
          </div>
          <div className="flex jce">
            <button 
              className="post__btn-main" 
              onClick={() => imageUploadRef.current.click()}>
                <RiImageAddLine className="icon--xs icon--white mr-5" />
                Image 
            </button>
          </div>
          {selectedOptions.file && (
            <div className="w-100 mt-1">
              <span className="inline w-100 text--wrap f-mid c-grace f-thin te">{selectedOptions.file.name}</span>
            </div>
          )}
        </Modal>
      )}
      <div className="post__section" id="images">
        <div className="container">
          <div className="post__title post__title--lg">Images</div>
          <div className="flex jcsb aic mb-2">
            <div className="flex aic">
              <div className="flex mr-15">
                <button className="btn--slider post__image--prev">
                  <IoChevronBackOutline className="icon--sm icon--dark" />
                </button>
                <button className="btn--slider post__image-next">
                  <IoChevronForwardOutline className="icon--sm icon--dark" />
                </button> 
              </div>
              <span className="f-mid c-grey-l">Slide to view more images</span>
            </div>
            <button 
              className="post__btn-main" 
              onClick={() => setModal(true)}>
                Upload Photos
            </button>
            <input 
              className="none"
              type="file" 
              accept="image/*" 
              onChange={(e) => 
                setSelectedOptions(prev => 
                  ({ ...prev, file: e.target.files[0] })
                )
              }
              ref={imageUploadRef} />
          </div>
          <div>
            {images.length > 0 
              ? (
                <>
                  <div className="c-grace f-mid mb-15">Images: {images.length}</div>
                  <Swiper
                    className="post__images"
                    slidesPerView={5}
                    spaceBetween={15}
                    onInit={(sw) => setSwiper(sw)}
                    navigation={{
                      prevEl: '.post__image--prev',
                      nextEl: '.post__image-next',
                      disabledClass: 'btn--slider-disabled'
                    }}>
                      {imagePlaceholders}
                  </Swiper>
                </>
              )
              : (
                <h3 className="heading heading--3 mb-3">
                  Upload images for your property
                </h3>
              )
            }
            <div className="c-grey-l f-sm">
              You can upload up to 12 images with the max size of 1MB each
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageUploadForm;
