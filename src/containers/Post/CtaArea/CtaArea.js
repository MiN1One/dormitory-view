import { useEffect, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import { useHistory } from 'react-router';

const CtaArea = ({ data, onPostApartment }) => {
  const [display, setDisplay] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const onScroll = () => {  
      const postHeight = document.querySelector('.post').getBoundingClientRect().height;

      setTimeout(() => {
        if (document.documentElement.scrollTop > postHeight * .4) {
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

  if (!display) return null;

  return (
    <div className="post__cta-area">
      <button onClick={onGoToPreview} className="flex aic mr-2">
        <IoEyeOutline className="icon--sm icon--dark mr-5" />
        Preview
      </button>
      <button className="post__cta-area__btn" onClick={onPostApartment}>
        Post
        <IoMdCheckmark className="icon icon--yellow ml-1" />
      </button>
    </div>
  );
};

export default CtaArea;
