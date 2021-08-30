import React, { PureComponent } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { RiImageAddLine } from 'react-icons/ri';
import { BiX } from 'react-icons/bi';
import { FcFolder } from 'react-icons/fc';

import Modal from '../../../components/UI/Modal/Modal';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { messageCreator } from '../../../components/MessagePopper';

SwiperCore.use([Navigation]);

const initialOptions = {
  room: 0,
  roomType: 'kitchen',
  image: null,
  fileName: null
};

const 
  ROOM_TYPES = ['main_hall', 'corridor', 'kitchen', 'bathroom', 'balcony'],
  MAX_IMAGES_COUNT = 12;

class ImageUploadForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      images: [],
      selectedOptions: initialOptions
    }

    this.imageUploadRef = React.createRef();
    this.swiper = null;
  }

  componentDidUpdate(_, prevState) {
    if (prevState.modal !== this.state.modal) {
      this.setState({ selectedOptions: initialOptions });
    }

    this.swiper && this.swiper.update();
  }

  onRemoveImage = (index) => {
    this.setState(prev => ({
      images: prev.images.filter((_, i) => i !== index)
    }));
    this.props.onRemoveImage(index);
  }
  
  onSaveImages = () => {
    const files = Array.from(this.imageUploadRef.current.files).slice(0, 12);
    if (
      !files.length ||
      this.state.images.length === MAX_IMAGES_COUNT
    ) {
      return;
    }
      
    files.forEach((el) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(el);

      fileReader.onload = () => {
        const { size, type } = el;
        const blob = el.slice(0, size, type);

        const renamedImageFile = new File(
          [blob], 
          `${this.state.selectedOptions.roomType}-${+this.state.selectedOptions.room + 1}`, 
          { type: type }
        );

        this.props.setImages({
          file: renamedImageFile,
          dataUrl: fileReader.result
        });

        const options = {
          ...this.state.selectedOptions, 
          image: fileReader.result
        };
  
        this.setState(prev => ({
          images: [ ...prev.images, options ],
          modal: false
        }));
      }
    });
  }

  onImageSelect = (e) => {
    this.setState(prev => ({ 
      selectedOptions: {
        ...prev.selectedOptions,
        fileName: e.target.files.length
          ? e.target.files[0].name 
          : null
      }
    }));
  }

  onClickUpload = () => {
    if (!this.props.roomOptions || !this.props.roomOptions.length) {
      return messageCreator({
        id: 'no-room-options',
        message: 'Please, add room options first and try again',
        type: 'warning'
      });
    }

    this.setState({ modal: true });
  }

  render() {
    console.log(this.state);
    const roomTypesEl = ROOM_TYPES.map(el => 
      ({
        title: el,
        click: () =>
          this.setState(prev => (
            {
              selectedOptions: { ...prev.selectedOptions, roomType: el }
            }
          )),
        active: this.state.selectedOptions.roomType === el
      })
    );

    const roomOptionNumberEl = this.props.roomOptions.map((_, i) => ({
      title: `Room option ${i+1}`,
      click: () => this.setState(p => ({
        selectedOptions: {
          ...p.selectedOptions,
          room: i
        }
      })),
      active: this.state.selectedOptions.room === i
    }));

    const imageThumbnails = this.state.images.map((el, i) => {
      return (
        <SwiperSlide key={i+Date.now()}>
          <figure className="post__images__figure">
            {el.image && (
              <img className="img img--cover" src={el.image} alt={`images-${i}`} />
            )}
            <button 
              className="post__images__btn" 
              onClick={() => this.onRemoveImage(i)}>
                <BiX className="icon--sm icon--grey" />
            </button>
          </figure>
          <div className="post__images__panel">
            <div className="f-lg flex fdc">
              {this.state.images[i].roomType}
              <span className="f-mid">
                Room option {this.state.images[i].room}
              </span>
            </div>
          </div>
        </SwiperSlide>
      );
    });
   
    return (
      <>
        {this.state.modal && (
          <Modal
            title="Upload photo"
            close={() => this.setState({ modal: false })}
            action={this.onSaveImages}
            actionTitle="Upload"
          >
            <div className="mb-2">
              <div className="modal__title">Option number</div>
              <Dropdown 
                title="Room 1"
                height={this.props.roomOptions.length >= 3 ? 13 : this.props.roomOptions.length * 4.5}
                items={roomOptionNumberEl}
                className="modal__input" />
            </div>
            <div className="mb-2">
              <div className="modal__title">Image of</div>
              <Dropdown 
                className="modal__input"
                title={this.state.selectedOptions.roomType}
                height={(ROOM_TYPES.length * 4.5) / 1.5}
                dropTitle="Rooms: "
                items={roomTypesEl} />
            </div>
            <div className="flex w-100 jcsb aic">
              <div className="w-50 inline text--wrap f-mid c-grace f-thin te">
                {this.state.selectedOptions.fileName && this.state.selectedOptions.fileName}
              </div>
              <button 
                className="post__btn-main" 
                onClick={() => this.imageUploadRef.current.click()}>
                  <RiImageAddLine className="icon--xs icon--white mr-5" />
                  Images 
              </button>
            </div>
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
                onClick={this.onClickUpload}>
                  Upload Photos
              </button>
              <input 
                className="none"
                type="file" 
                multiple
                accept="image/*" 
                onChange={this.onImageSelect}
                ref={this.imageUploadRef} />
            </div>
            <div className="c-grey-l f-sm mb-1">
              You can upload up to 12 images with the max size of 5MB each
            </div>
            {this.state.images.length > 0 
              ? (
                <>
                  <div className="c-grace f-mid mb-15">Images: {this.state.images.length}/12</div>
                  <Swiper
                    className="post__images"
                    slidesPerView={4}
                    spaceBetween={5}
                    onInit={(sw) => this.swiper = sw}
                    navigation={{
                      prevEl: '.post__image--prev',
                      nextEl: '.post__image-next',
                      disabledClass: 'btn--slider-disabled'
                    }}>
                      {imageThumbnails}
                  </Swiper>
                </>
              )
              : (
                <div className="post__header">
                  <FcFolder className="post__header__icon" />
                  Upload images for your property...
                </div>
              )
            }
          </div>
        </div>
      </>
    );
  }
}

export default React.memo(ImageUploadForm);