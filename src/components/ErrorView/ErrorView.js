import React from 'react';
import { useTranslation } from 'react-i18next';
import { FcMediumPriority } from 'react-icons/fc';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './ErrorView.scss';

const ErrorView = ({ error }) => {
  const { t } = useTranslation(['regions', 'translation']);

  return (
    <div className="e">
      <div className="e__content">
        <FcMediumPriority className="e__icon" />
        <div className="flex aic">
          <div className="flex fdc aic">
            <div className="mb-15">
              <h1 className="e__heading heading heading--1">
                {error 
                  ? t(`translation:error.${error.status}.main`) 
                  : 'Page is not found'
                }
              </h1>
              <div className="f-xl c-grace mb-1">
                {error 
                  ? t(`translation:error.${error.status}.sub`) 
                  : 'Please make sure, you have entered right address'
                }
              </div>
            </div>
            <div className="flex">
              <Link to="/" className="btn btn--primary mr-1">Home</Link>
              <button className="btn btn--cta">Help</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ErrorView);
