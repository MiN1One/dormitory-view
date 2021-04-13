import { useTranslation } from "react-i18next";

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
      onClick={() => i18n.changeLanguage(el.val)}>
      {el.title}
    </div>
  ));

  return (
    <div className={`language ${className}`}>
      {languages}
    </div>
  );
};

export default Languages;