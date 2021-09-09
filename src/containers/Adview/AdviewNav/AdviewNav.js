import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';

import SpyNavigation from '../../../components/SpyNavigation/SpyNavigation';
import useEditFavorites from '../../../hooks/useEditFavorites';
import config from '../config.js';

const AdviewNav = ({ data, isPreview }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [showFavoriteBtn, setShowFavoriteBtn] = useState(false);
  const { editFavorites, favorites } = useEditFavorites();

  let section = 'regular';
  if (data && data.roomOptions.length === 1) {
    section = 'noRooms';
  } else if (isPreview) {
    section = 'preview';
  }

  return (
    <SpyNavigation
      offset={config.SCROLL_Y_OFFSET}
      items={config.SECTIONS[section]}
      onUpdate={(el) => setShowFavoriteBtn(el && el.id !== 'main')}>
        {isPreview
          ? (
            <div className="flex aic">
              <button className="snav__btn mr-lg" onClick={() => history.push('/post/new')}>
                {t('translation:nav.go-back-post')}
              </button>
              <Link to="/">
                LOGO
              </Link>
            </div>
          )
          : (showFavoriteBtn && (
            <button className="snav__btn" onClick={() => editFavorites(data?._id)}>
              {favorites?.includes(data?._id) 
                ? (
                  <>
                    <BsStarFill className="icon--xs icon--yellow mr-5" />
                    Remove from favorites
                  </>
                )
                : (
                  <>
                    <BsStar className="icon--xs icon--yellow mr-5" />
                    Add to favorites
                  </>
                )
              }
            </button>
          ))
        }
      </SpyNavigation>
  );
}

export default memo(AdviewNav);
