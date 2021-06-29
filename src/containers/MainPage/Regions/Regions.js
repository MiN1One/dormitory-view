import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoChevronForward } from 'react-icons/io5';
import { GoLocation } from 'react-icons/go';
import { BsArrowLeft } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import Modal from '../Modal/Modal';

const Regions = ({ close }) => {
  const { regions } = useSelector(s => s.main);
  const [activeItem, setActiveItem] = useState(null);
  const { t } = useTranslation('regions');

  const items = [];
  for (let key in regions) {
    items.push((
      <li 
        className="modalh__item" 
        key={key}
        onClick={() => setActiveItem(key)}
        tabIndex="0">
          {t(`regions:${key}.title`)}
          <IoChevronForward className="icon--xs icon--grey-l" />
      </li>
    ));
  }

  const subItems = activeItem && regions[activeItem].regions.map((el) => (
    <li 
      className="modalh__item" 
      key={el}
      tabIndex="0">
        <Link to={`/list/${activeItem}/${el}`} className="flex aic jcsb w-100">
          {t(`regions:${activeItem}.regions.${el}`)}
          <IoChevronForward className="icon--xs icon--grey-l" />
        </Link>
    </li>
  ));

  return (
    <Modal
      head={
        <>
          <GoLocation className="icon mr-1 icon--yellow" />
          All regions
        </>
      }
      items={items}
      close={close}
    >
      {activeItem && (
        <div className="modalh__pop">
          <Scrollbar style={{ width: '100%', height: '100%' }}>
            <ul>
              <li tabIndex="0" className="modalh__item" onClick={() => setActiveItem(null)}>
                <div className="flex aic">
                  <BsArrowLeft className="icon--sm mr-1 icon--grey" />
                  Go back
                </div>
              </li>
              <li className="modalh__item" onClick={() => setActiveItem(null)}>
                <Link to={`/${activeItem}/all`} className="flex aic jcsb wh-100">
                  {t(`regions:${activeItem}.regions.all`)}
                  <IoChevronForward className="icon--xs icon--grey-l" />
                </Link>
              </li>
              {subItems}
            </ul>
          </Scrollbar>
        </div>
      )}
    </Modal>
  );
}

export default Regions;
