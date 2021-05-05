import React from 'react';

const Backdrop = ({ close, z, className, opaque }) => (
  <div 
    className={`backdrop ${className ? className : ''}`} 
    onClick={close} 
    style={{ zIndex: z, background: opaque && 'transparent' }} />
);

export default Backdrop;
