import { useEffect, useRef, useState } from 'react';
import { BiX } from 'react-icons/bi';
import { FcSurvey } from 'react-icons/fc';

const Message = ({ message: { message, id, type, duration }, onEndMessage }) => {
  const circleRef = useRef();

  useEffect(() => {
    const element = { ...circleRef };
    circleRef.current = circleRef.current.animate(
      [
        { strokeDashoffset: '0' },
        { strokeDashoffset: '7.76875rem' }
      ], {
        fill: 'forwards',
        easing: 'linear',
        duration: duration || 5000
    });

    const animations = element.current.getAnimations({ subtree: true }).map(el => el.finished);

    Promise.all(animations).then(onEndMessage);
  }, [id, duration, onEndMessage]);

  const onToggleAnimation = (type) =>
    circleRef?.current[type] && circleRef.current[type]();

  return (
    <div 
      className="m-pop__item" 
      onMouseEnter={() => onToggleAnimation('pause')}
      onMouseLeave={() => onToggleAnimation('play')}>
        <FcSurvey className="icon--mid mr-1" />
        {message}
        <button className="m-pop__btn" onClick={() => onToggleAnimation('finish')}>
          <svg className="m-pop__circle">
            <circle ref={circleRef} r="1.15rem" cy="1.375rem" cx="1.375rem"></circle>
          </svg>
          <BiX className="icon--xs icon--dark" />
        </button>
    </div>
  );
};

export default Message;
