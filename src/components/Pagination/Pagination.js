import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { useHistory } from 'react-router';

import './Pagination.scss';

const Pagination = ({ itemsPerView, itemsCount, interval, onChange, currentPage }) => {
  const history = useHistory();

  const pageCount = itemsCount / itemsPerView;

  const pages = Array.from(Array(pageCount).keys()).map((el, i) => (
    <li 
      className={`pagination__item ${currentPage === i + 1} ${currentPage === i + 1 ? 'pagination__item--active' : ''}`} 
      key={i}
      tabIndex="0"
      onClick={() => {
        onChange(i + 1);
        history.push(`?page=${i + 1}`);
      }}>
        {i + 1}
      </li>
  ));

  return (
    <div className="pagination">
      <button 
        className="pagination__btn" 
        onClick={() => {
          if (currentPage > 1) {
            onChange(currentPage - 1);
            history.push(`?page=${currentPage - 1}`);
          }
        }}>
          <BsArrowLeftShort className="icon icon--grey" />
      </button>
      <ul className="pagination__list">
        {pages}
      </ul>
      <button 
        className="pagination__btn"
        onClick={() => {
          if (currentPage < pageCount) {
            onChange(currentPage + 1);
            history.push(`?page=${currentPage + 1}`);
          }
        }}>
          <BsArrowRightShort className="icon icon--grey" />
      </button>
    </div>
  );
};

export default Pagination;
