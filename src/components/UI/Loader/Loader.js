import React from 'react';

const Loader = ({ className }) => 
  <div className={`loaderm ${className ? className : ''}`}>
    <div className="container">
      <div className="loaderm__content">
        <h1 className="heading heading--1">Loading...</h1>
      </div>
    </div>
  </div>

export default Loader;
