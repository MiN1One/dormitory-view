import { useEffect, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const CtaArea = ({ onPostApartment, onGoToPreview }) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const onScroll = () => {  
      const postHeight = document.querySelector('.post')?.getBoundingClientRect()?.height;

      setTimeout(() => 
        setDisplay(document.documentElement.scrollTop > postHeight * .4), 
        50
      );
    };
    
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  if (!display) return null;

  return (
    <div className="post__cta-area">
      <button className="flex aic mr-2" onClick={onGoToPreview}>
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
