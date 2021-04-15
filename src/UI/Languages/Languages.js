import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { VscGlobe } from 'react-icons/vsc';

import './Languages.scss';

const Languages = ({ className }) => {
  const { i18n } = useTranslation();

  const languageList = [
    {
      title: 'English',
      val: 'en'
    }, 
    {
      title: 'Russian',
      val: 'ru'
    }, 
    {
      title: 'O\'zbek',
      val: 'uz'
    }, 
  ];

  const languages = languageList.map((el, i) => (
    <div 
      className="language__item" 
      key={i}
      onMouseDown={() => {
        i18n.changeLanguage(el.val);
        document.documentElement.lang = el.val;
      }}
      tabIndex="0">
        {el.title}
    </div>
  ));

  const curLanguage = i18n.language && languageList.find(el => el.val === i18n.language).title;

  return (
    <div className={`language ${className}`}>
      <button className="language__lang">
        <VscGlobe className="icon--mid mr-1 icon--grey" />
        {curLanguage}
      </button>
      <div className="language__dropdown">
        <div className="language__head">
          Languages
        </div>
        <Scrollbars style={{ width: '100%', height: '10rem' }}>
          <div className="language__list">
            {languages}
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Languages;