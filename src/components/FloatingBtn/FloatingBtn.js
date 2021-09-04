import { useTranslation } from 'react-i18next';

const FloatingBtn = ({ label, action, icon }) => {
  const { t } = useTranslation();

  return (
    <div className="btn-float-right">
      <div className="container">
        <button type="button" onClick={action} className="btn--pill">
          {icon}
          {label}
        </button>
      </div>
    </div>
  );
};

export default FloatingBtn;
