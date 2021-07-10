import React from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { useHistory } from 'react-router';

import './Pagination.scss';

const Pagination = ({ itemsPerView, itemsCount, interval, onChange, currentPage }) => {
  const history = useHistory();

  const pageCount = Math.ceil(itemsCount / itemsPerView);
  
  const scrollToTop = () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  const pages = Array.from(Array(pageCount).keys()).map((_, i) => (
    <li 
      className={`pagination__item ${currentPage === i + 1} ${currentPage === i + 1 ? 'pagination__item--active' : ''}`} 
      key={i}
      tabIndex="0"
      onClick={() => {
        onChange(i + 1);
        history.push(`?page=${i + 1}`);
        scrollToTop();
      }}>
        {i + 1}
      </li>
  ));

  return (
    <div className="pagination">
      <button 
        disabled={currentPage === 1}
        className="pagination__btn" 
        onClick={() => {
          if (currentPage > 1) {
            onChange(currentPage - 1);
            history.push(`?page=${currentPage - 1}`);
            scrollToTop();
          }
        }}>
          <BsArrowLeftShort className="icon icon--grey" />
      </button>
      <ul className="pagination__list">
        {pages}
      </ul>
      <button 
        disabled={currentPage === pageCount}
        className="pagination__btn"
        onClick={() => {
          if (currentPage < pageCount) {
            onChange(currentPage + 1);
            history.push(`?page=${currentPage + 1}`);
            scrollToTop();
          }
        }}>
          <BsArrowRightShort className="icon icon--grey" />
      </button>
    </div>
  );
};

export default Pagination;
