import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillTag } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { IoChevronForward, IoSchoolOutline } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Scrollbar from '../../../components/UI/Scrollbar/Scrollbar';
import './Modalh.scss';

const Modalh = ({ close, list, section }) => {
  const { t } = useTranslation('regions');
  const [activeItem, setActiveItem] = useState(null);

  const head = {
    regions: () => 
      <>
        <GoLocation className="icon mr-1" />
        {section}
      </>,
    universities: () => 
      <>
        <IoSchoolOutline className="icon mr-1" />
        {section}
      </>,
    offers: () => 
      <>
        <AiFillTag className="icon mr-1" />
        {section}
      </>
  };

  const items = [];
  for (let key in list) {
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
  
  const subItems = activeItem && list[activeItem].map((el, i) => (
    <li className="modalh__item" key={i}>
      <Link to={`/${activeItem}/${el}`} className="flex aic jcsb wh-100">
        {t(`regions:${activeItem}.regions.${el}`)}
        <IoChevronForward className="icon--xs icon--grey-l" />
      </Link>
    </li>
  ));

  return (
    <div className="modalh">
      <div className="modalh__head">
        <div className="flex aic">{head[section]()}</div>
        <button className="modalh__btn" onClick={close}>
          <MdClose className="icon--xs" />
        </button>
      </div>
      <div className="modalh__body">
        <Scrollbar style={{ width: '100%', height: '100%' }} className="modalh__list">
          <ul>
            {items}
          </ul>
        </Scrollbar>
        {activeItem && list[activeItem] && (
          <div className="modalh__pop">
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <ul>
                <li tabIndex="0" className="modalh__item" onClick={() => setActiveItem(null)}>
                  <div className="flex aic">
                    <BsArrowLeft className="icon--sm mr-1" />
                    Go back
                  </div>
                </li>
                <li className="modalh__item" onClick={() => setActiveItem(null)}>
                  <Link to={`/${activeItem}/all`} className="flex aic jcsb wh-100">
                    All in {t(`regions:${activeItem}.title`)}
                    <IoChevronForward className="icon--xs icon--grey-l" />
                  </Link>
                </li>
                {subItems}
              </ul>
            </Scrollbar>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modalh;