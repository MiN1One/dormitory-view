import React from 'react';

const Spinner = ({ className }) =>
  <div className={`loader ${className ? className : ''}`}>
    <div className="loader__spinner"></div>
  </div>

export default Spinner;
