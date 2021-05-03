import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items, white }) => {
  const breadItems = items.map((el, i) => {
    return !el.active
      ? <Link to={el.path} className="breadcrumbs__item" key={i}>{el.title}</Link>
      : <span className="breadcrumbs__item breadcrumbs__item--active" key={i}>{el.title}</span>
  });

  return (
    <div className={`breadcrumbs ${white ? 'breadcrumbs--white' : ''}`}>
      <Link to="/" className="breadcrumbs__item">Home</Link>
      {breadItems}
    </div>
  );
};

export default React.memo(Breadcrumbs);
