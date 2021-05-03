import React from 'react';

const Backdrop = ({ close, z, className }) => (
  <div 
    className={`backdrop ${className ? className : ''}`} 
    onClick={close} 
    style={{ zIndex: z }} />
);

export default Backdrop;
