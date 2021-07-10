import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

const PopScroll = () => {
  const [showPScroll, setShowPScroll] = useState(false);

  const setPScrollOnScroll = useCallback(() => {
    const body = document.body, html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    if (html.scrollTop > (height * 0.35)) setShowPScroll(true);
    else setShowPScroll(false);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', setPScrollOnScroll);
    return () => document.removeEventListener('scroll', setPScrollOnScroll);
  }, [setPScrollOnScroll]);

  return !showPScroll ? null : (
    <div className="pscroll" >
      <div className="container">
        <button 
          className="pscroll__btn"
          onClick={() => 
            window.scroll({
              top: 0,
              behavior: 'smooth'
            })
          }>
            <AiOutlineArrowUp className="icon--mid icon--dark" /> 
        </button>
      </div>
    </div>
  );
}

export default PopScroll;
