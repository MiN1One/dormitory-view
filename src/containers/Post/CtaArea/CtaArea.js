import { useEffect, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { IoChevronUpOutline, IoEyeOutline } from 'react-icons/io5';
import { useHistory } from 'react-router';

const CtaArea = ({ data, onPostApartment }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [display, setDisplay] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const onScroll = () => {  
      const
        body = document.body,
        html = document.documentElement;

      const documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight, 
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      setTimeout(() => {
        if (html.scrollTop > documentHeight * .15) {
          setDisplay(true);
        } else {
          setDisplay(false);
        }
      }, 50);
    };
    
    document.addEventListener('scroll', onScroll);

    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  const onGoToPreview = () => {
    sessionStorage.setItem('postData', data);
    history.replace('/post/preview');
  };

  const iconClass = ['post__cta-area__icon'];
  if (showDetails) {
    iconClass.push('post__cta-area__icon--rotate');
  }

  const numRoomOptions = data.roomOptions.length;
  const avgPrice = numRoomOptions > 0 && data.roomOptions.reduce((acc, el) => acc + el.price, 0) / numRoomOptions;

  if (!display) return null;

  return (
    <div className="post__cta-area">
      {showDetails && (
        <div className="post__cta-area__popup">
          <div>
            <div className="f-xl mb-15">{data.title}</div>
            <div className="mb-1">
              <span className="f-mid-w">Address: </span>
              {data.address}
            </div>
            <div className="mb-1">
              <span className="f-mid-w">Region: </span>
              {data.region}, {data.city}
            </div>
            <div className="mb-1">
              <span className="f-mid-w">Room options: </span>
              {numRoomOptions}
            </div>
            <div>
              <span className="f-mid-w">Average price: </span>
              {avgPrice}
            </div>
          </div>
        </div>
      )}
      <div className="post__cta-area__footer">
        <div className="flex aic">
          <button onClick={onGoToPreview} className="flex aic mr-1">
            <IoEyeOutline className="icon--sm icon--dark mr-5" />
            Preview
          </button>
          <button className="flex aic" onClick={() => setShowDetails(!showDetails)}>
            <IoChevronUpOutline className={iconClass.join(' ')} />
            {!showDetails
              ? 'Details'
              : 'Hide'
            }
          </button>
        </div>
        <button className="post__cta-area__btn" onClick={onPostApartment}>
          Post
          <IoMdCheckmark className="icon icon--yellow ml-1" />
        </button>
      </div>
    </div>
  );
};

export default CtaArea;
